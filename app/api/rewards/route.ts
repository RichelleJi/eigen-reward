import { type NextRequest, NextResponse } from 'next/server';
import { createWalletClient, http, getContract, publicClient,  createPublicClient} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { localhost } from 'viem/chains';
import eigenABI from '../_contracts/eigenAbi';
import dotenv from 'dotenv';

dotenv.config();

type RewardsRequest = {
  address: string;
};

//todo: handle error bettter
//todo: logging 
const ONE_ETHER_IN_WEI = BigInt(10 ** 18);

/**
 * POST function handles incoming POST requests for calculating EIGEN rewards.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {Promise<NextResponse>} - The response object containing the result or an error message.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  let reqBody: RewardsRequest;

  try {
    reqBody = await req.json();
  } catch {
    return createErrorResponse('Invalid JSON format', 400);
  }

  const { address } = reqBody;

  if (!address) {
    return createErrorResponse('Wallet address is required', 400);
  }

    //check if there's more than 1 ether in the wallet
  const oneEtherInWei = BigInt(10 ** 18);

  const publicClient = createPublicClient({
    chain: localhost,
    transport: http()
  })

  const balance = await publicClient.getBalance({
    address: address,
  })

  try {
    const privateKey = process.env.PRIVATE_KEY;
    const contractAddress = process.env.EIGEN_CONTRACT_ADDRESS;

    if (!privateKey) {
      return createErrorResponse('Private key is not defined in the environment', 500);
    }

    const account = privateKeyToAccount(privateKey);
    const walletClient = createWalletClient({
      account,
      chain: localhost,
      transport: http(),
    });


    const contract = getContract({
      address: contractAddress,
      abi: eigenABI,
      client: { wallet: walletClient },
    });

    // Calculate EIGEN rewards (4 EIGEN for each token)
    const eigenRewards = (balance * BigInt(4)); //it returned40002

    // Simulate the contract call to mint rewards
    const { request } = await publicClient.simulateContract({
      address: contractAddress,
      abi: eigenABI,
      functionName: 'claimReward',
      args: [eigenRewards], 
      account,
    });

    const tx = await walletClient.writeContract(request);
    //todo: listen to transaction, to wait or to pull on the frontend

    return NextResponse.json({ eigenRewards: eigenRewards.toString() }, { status: 200 });
  } catch (error) {
    console.error('Error fetching balance or calling contract:', error);
    return createErrorResponse('Internal Server Error', 500);
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
