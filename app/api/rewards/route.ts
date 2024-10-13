import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';

type RewardsRequest = {
  walletAddress: string;
};

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

  const { walletAddress } = reqBody;

  if (!walletAddress) {
    return createErrorResponse('Wallet address is required', 400);
  }

  try {
    // Connect to the Ethereum network (using default provider)
    const provider = new ethers.providers.getDefaultProvider();

    // Get the balance of the wallet in Ether
    const balance = await provider.getBalance(walletAddress);
    const etherBalance = ethers.utils.formatEther(balance);

    // Calculate EIGEN rewards (4 EIGEN for each ETH)
    const eigenRewards = Math.floor(parseFloat(etherBalance) * 4); //todo: call smart contract to mint this for the user

    return NextResponse.json({ eigenRewards }, { status: 200 });
  } catch (error) {
    console.error('Error fetching balance:', error);
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
