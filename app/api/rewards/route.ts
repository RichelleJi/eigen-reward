import { type NextRequest, NextResponse } from 'next/server';
import {
  createWalletClient,
  http,
  publicActions,
  createPublicClient,
  type WalletClient,
  type Account,
  type WalletClientConfig,
  type WriteContractReturnType,
  type GetBalanceReturnType,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { localhost } from 'viem/chains';
import eigenABI from '../../contracts/eigenAbi';
import dotenv from 'dotenv';

dotenv.config();

type RewardsRequest = {
  rewardAddress: string;
};

const ONE_ETHER_IN_WEI = BigInt(10 ** 18);
const REWARD_MULTIPLIER = BigInt(4);

/**
 * Handles incoming POST requests for calculating EIGEN rewards.
 *
 * @param {NextRequest} req - The incoming request object containing the reward address.
 * @returns {Promise<NextResponse>} - A promise that resolves to the response object containing the calculated EIGEN rewards or an error message.
 * @throws {Error} - Throws an error if the request body is invalid or if the reward address is missing.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const reqBody: RewardsRequest | null = await parseRequestBody(req);
  if (!reqBody || !reqBody.rewardAddress) {
    const errorMessage = reqBody
      ? 'The wallet address is required. Please provide a valid wallet address in the request.'
      : 'The request body is not valid JSON. Please ensure you are sending a properly formatted JSON object.';
    return createErrorResponse(errorMessage, 400);
  }

  const { rewardAddress } = reqBody;

  try {
    console.info(
      `[INFO] ${new Date().toISOString()} - Fetching balance for reward address: ${rewardAddress}`,
    );
    const balance: bigint = await getRewardAddressBalance(
      rewardAddress as `0x${string}`,
    );
    if (balance < ONE_ETHER_IN_WEI) {
      return createErrorResponse(
        'Not elgiable for rewards: ETH Balance below requirement',
        400,
      );
    }
    const walletClient = await createLocalWalletClient(
      process.env.NEXT_PRIVATE_WAlLLET_PRIVATE_KEY as `0x${string}`,
    );
    const eigenRewards = calculateEigenRewards(balance);
    const _txResponse = await simulateAndSendTransaction(
      walletClient,
      process.env.NEXT_PUBLIC_EIGEN_CONTRACT_ADDRESS as `0x${string}`,
      eigenRewards,
      rewardAddress,
    );

    return NextResponse.json(
      { eigenRewards: eigenRewards.toString() },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred while processing your request. Please try again later.';
    console.error(
      `[ERROR] ${new Date().toISOString()} - Error processing POST request for wallet address ${rewardAddress}: ${errorMessage}`,
      {
        rewardAddress,
        stack:
          error instanceof Error ? error.stack : 'No stack trace available',
      },
    );
    return createErrorResponse(
      `Failed to process the request for wallet address ${rewardAddress}.`,
      500,
    );
  }
}

/**
 * Parses the request body and returns the parsed object.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {Promise<RewardsRequest | null>} - A promise that resolves to the parsed request body or null if parsing fails.
 * @throws {Error} - Throws an error if JSON parsing fails.
 */
async function parseRequestBody(
  req: NextRequest,
): Promise<RewardsRequest | null> {
  try {
    return await req.json();
  } catch {
    throw new Error('Failed to parse request body');
  }
}

/**
 * Retrieves the balance of the specified reward address.
 *
 * @param {`0x${string}`} rewardAddress - The Ethereum address for which to fetch the balance.
 * @returns {Promise<bigint>} - A promise that resolves to the balance in wei.
 * @throws {Error} - Throws an error if the balance cannot be fetched.
 */
async function getRewardAddressBalance(
  rewardAddress: `0x${string}`,
): Promise<GetBalanceReturnType> {
  const publicClient = createPublicClient({
    chain: localhost,
    transport: http(),
  });
  return await publicClient.getBalance({ address: rewardAddress });
}

/**
 * Creates a wallet client using the provided private key.
 *
 * @param {`0x${string}`} privateKey - The private key used to create the wallet client.
 * @returns {Promise<WalletClient>} - A promise that resolves to the wallet client instance.
 * @throws {Error} - Throws an error if wallet client creation fails.
 */
async function createLocalWalletClient(
  privateKey: `0x${string}`,
): Promise<WalletClient> {
  const account = privateKeyToAccount(privateKey) as Account;
  const walletClientConfig: WalletClientConfig = {
    account,
    chain: localhost,
    transport: http(),
  };

  return createWalletClient(walletClientConfig).extend(publicActions);
}

/**
 * Calculates the EIGEN rewards based on the balance.
 *
 * @param {bigint} balance - The balance in wei.
 * @returns {bigint} - The calculated EIGEN rewards.
 */
function calculateEigenRewards(balance: bigint): bigint {
  return balance * REWARD_MULTIPLIER;
}

/**
 * Simulates the contract call to mint rewards and sends the transaction.
 *
 * @param {WalletClient} walletClient - The wallet client instance.
 * @param {`0x${string}`} contractAddress - The address of the contract.
 * @param {bigint} eigenRewards - The amount of EIGEN rewards to claim.
 * @param {string} rewardAddress - The address to receive the rewards.
 * @returns {Promise<WriteContractReturnType>} - A promise that resolves to the result of the transaction.
 * @throws {Error} - Throws an error if the transaction simulation or sending fails.
 */
async function simulateAndSendTransaction(
  walletClient: WalletClient,
  contractAddress: `0x${string}`,
  eigenRewards: bigint,
  rewardAddress: string,
): Promise<WriteContractReturnType> {
  try {
    const { request } = await walletClient.simulateContract({
      address: contractAddress,
      abi: eigenABI,
      functionName: 'claimReward',
      args: [eigenRewards, rewardAddress],
    });

    return await walletClient.writeContract(request); // Ensure a return value
  } catch (_error) {
    throw new Error(
      `Transaction simulation or sending failed for wallet address ${rewardAddress}. Please try again later.`,
    );
  }
}

/**
 * Creates a standardized error response.
 *
 * @param {string} message - The error message.
 * @param {number} status - The HTTP status code.
 * @returns {NextResponse} - The error response object.
 */
function createErrorResponse(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status });
}
