import { POST } from './route';
import type { NextRequest } from 'next/server';
import { createWalletClient, createPublicClient } from 'viem';

jest.mock('viem', () => ({
  createPublicClient: jest.fn(),
  createWalletClient: jest.fn(),
  publicActions: {},
  privateKeyToAccount: jest.fn(),
  http: jest.fn(),
}));

describe('POST route handler', () => {
  const mockBalance = BigInt(2 * 10 ** 18);
  const rewardAddress = '0x1234567890123456789012345678901234567890';
  const privateKey =
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

  const mockRequest = (body: any) => ({
    json: jest.fn().mockResolvedValue(body),
  });

  const mockWalletClient = {
    simulateContract: jest.fn().mockResolvedValue({ request: {} }),
    writeContract: jest.fn().mockResolvedValue({ txHash: '0x123' }),
  };

  const mockPublicClient = {
    getBalance: jest.fn().mockResolvedValue(mockBalance),
  };

  beforeEach(() => {
    process.env.NEXT_PRIVATE_WAlLLET_PRIVATE_KE = privateKey;
    process.env.NEXT_PUBLIC_EIGEN_CONTRACT_ADDRESS = '0xContractAddress';

    (createWalletClient as jest.Mock).mockReturnValue({
      extend: jest.fn().mockReturnValue(mockWalletClient),
    });
    (createPublicClient as jest.Mock).mockReturnValue(mockPublicClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 if the request body is missing or invalid', async () => {
    const req = mockRequest(null);
    const res = await POST(req as unknown as NextRequest);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBeDefined();
    expect(json.error).toContain('The request body is not valid JSON');
  });

  it('returns 400 if the reward address is missing', async () => {
    const req = mockRequest({});
    const res = await POST(req as unknown as NextRequest);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBeDefined();
    expect(json.error).toContain('The wallet address is required');
  });

  it('returns 400 if balance is less than 1 ETH', async () => {
    mockPublicClient.getBalance.mockResolvedValueOnce(BigInt(0.5 * 10 ** 18));
    const req = mockRequest({ rewardAddress });
    const res = await POST(req as unknown as NextRequest);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBeDefined();
    expect(json.error).toContain(
      'Not elgiable for rewards: ETH Balance below requirement',
    );
  });

  it('returns 200 and sends the transaction if balance is sufficient', async () => {
    const req = mockRequest({ rewardAddress });
    const res = await POST(req as unknown as NextRequest);

    expect(mockPublicClient.getBalance).toHaveBeenCalledWith({
      address: rewardAddress,
    });
    expect(mockWalletClient.simulateContract).toHaveBeenCalled();
    expect(mockWalletClient.writeContract).toHaveBeenCalled();
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.eigenRewards).toBeDefined();
  });

  it('returns 500 if an error occurs during processing', async () => {
    mockPublicClient.getBalance.mockRejectedValueOnce(
      new Error('Balance fetch failed'),
    );
    const req = mockRequest({ rewardAddress });
    const res = await POST(req as unknown as NextRequest);

    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toBeDefined();
    expect(json.error).toContain('Failed to process the request');
  });
});
