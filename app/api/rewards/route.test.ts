import { POST } from './route';
import { NextRequest } from 'next/server';
import { ethers } from "ethers";

jest.mock('ethers', () => ({
  ethers: {
    providers: {
      getDefaultProvider: jest.fn(),
    },
    utils: {
      formatEther: jest.fn(),
    },
  },
}));

describe('POST function', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return 200 and the eigen rewards on success', async () => {
    const mockProvider = {
      getBalance: jest.fn().mockResolvedValue('1000000000000000000'), // 1 ETH in wei
    };
    (ethers.providers.getDefaultProvider as jest.Mock).mockReturnValue(mockProvider);
    (ethers.utils.formatEther as jest.Mock).mockReturnValue('1.0'); // 1 ETH

    const req = {
      json: jest.fn().mockResolvedValue({
        walletAddress: '0xYourWalletAddress',
      }),
    } as unknown as NextRequest;

    const response = await POST(req);
    const json = (await response.json()) as { eigenRewards: number };

    expect(response.status).toBe(200);
    expect(json.eigenRewards).toBe(4); // 4 EIGEN for 1 ETH
  });

  it('should return 400 and error message if wallet address is not provided', async () => {
    const req = {
      json: jest.fn().mockResolvedValue({}),
    } as unknown as NextRequest;

    const response = await POST(req);
    const json = (await response.json()) as { error: string };

    expect(response.status).toBe(400);
    expect(json.error).toBe('Wallet address is required');
  });

  it('should return 500 and error message if there is an error fetching the balance', async () => {
    const mockProvider = {
      getBalance: jest.fn().mockRejectedValue(new Error('Network error')),
    };
    (ethers.providers.getDefaultProvider as jest.Mock).mockReturnValue(mockProvider);

    const req = {
      json: jest.fn().mockResolvedValue({
        walletAddress: '0xYourWalletAddress',
      }),
    } as unknown as NextRequest;

    const response = await POST(req);
    const json = (await response.json()) as { error: string };

    expect(response.status).toBe(500);
    expect(json.error).toBe('Internal Server Error');
  });
});
