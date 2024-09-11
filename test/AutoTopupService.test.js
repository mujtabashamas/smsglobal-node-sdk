const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const SmsGlobal = require('../src/index'); // Import the SDK entry point

describe('AutoTopupService', () => {
  let autoTopupService;
  let mockHttpClient;

  beforeEach(() => {
    // Create a mock configuration object
    const config = {
      apiKey: 'mock-api-key',
      apiSecret: 'mock-api-secret',
      baseURL: 'https://api.smsglobal.com', // Use the default baseURL or a mock URL for testing
    };

    // Initialize the SDK with mock configuration
    const smsglobal = SmsGlobal.init(config);
    autoTopupService = smsglobal.autoTopupService;

    // Mock the HttpClient within the service
    mockHttpClient = sinon.stub(autoTopupService.httpClient, 'request');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should fetch auto-topup information successfully', async () => {
    const mockResponse = { disabled: false, balanceThreshold: 100 };

    mockHttpClient.resolves(mockResponse); // Mock the request method to resolve with mockResponse

    const result = await autoTopupService.getAutoTopupInfo();

    expect(result).to.deep.equal(mockResponse);
    expect(mockHttpClient.calledOnce).to.be.true;
    expect(mockHttpClient.calledWith('GET', '/v2/auto-topup')).to.be.true;
  });

  it('should throw an error if fetching auto-topup information fails', async () => {
    const mockError = new Error('Failed to fetch auto-topup information');
    mockHttpClient.rejects(mockError); // Mock the request method to reject with mockError

    try {
      await autoTopupService.getAutoTopupInfo();
    } catch (error) {
      expect(error).to.equal(mockError);
    }

    expect(mockHttpClient.calledOnce).to.be.true;
    expect(mockHttpClient.calledWith('GET', '/v2/auto-topup')).to.be.true;
  });
});
