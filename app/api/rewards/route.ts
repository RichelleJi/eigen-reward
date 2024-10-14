import { type NextRequest, NextResponse } from 'next/server';
import type { WalletClient, Hex, WriteContractReturnType } from 'viem';
import eigenABI from '../../contracts/eigenAbi';
import createViemClient from '@/walletClient';

type RewardsRequest = {
  rewardAddress: Hex;
  chainId: number;
};

const ONE_ETHER_IN_WEI = BigInt(10 ** 18);
const REWARD_MULTIPLIER = BigInt(4);

/**
 * Handles incoming POST requests for calculating EIGEN rewards.
 *
 * @param {NextRequest} req - The incoming request object containing the reward address and chain ID.
 * @returns {Promise<NextResponse>} - A promise that resolves to the response object containing the calculated EIGEN rewards or an error message.
 * @throws {Error} - Throws an error if the request body is invalid or if the reward address is missing.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const reqBody: RewardsRequest | null = await parseRequestBody(req);
  if (!reqBody || !reqBody.rewardAddress || !reqBody.chainId) {
    const errorMessage = reqBody
      ? 'The wallet address and chain ID are required. Please provide valid values in the request.'
      : 'The request body is not valid JSON. Please ensure you are sending a properly formatted JSON object.';
    console.error(`[ERROR] ${errorMessage}`);
    return createErrorResponse(errorMessage, 400);
  }

  const { rewardAddress, chainId } = reqBody;

  try {
    console.info(
      `[INFO] ${new Date().toISOString()} - Fetching balance for reward address: ${rewardAddress}`,
    );

    const walletClient = createViemClient(chainId); // Use the chainId to create the wallet client
    const balance: bigint = await walletClient.getBalance({
      address: rewardAddress,
    });

    if (balance < ONE_ETHER_IN_WEI) {
      return createErrorResponse(
        'Not elgiable for rewards: ETH Balance below requirement',
        400,
      );
    }
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
