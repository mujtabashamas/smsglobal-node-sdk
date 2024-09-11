const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const SmsGlobal = require('../src/index'); // Import the SDK entry point

describe('SharedPoolService', () => {
  let sharedPoolService;
  let mockHttpClient;

  beforeEach(() => {
    const config = {
      apiKey: 'mock-api-key',
      apiSecret: 'mock-api-secret',
      baseURL: 'https://api.smsglobal.com',
    };

    const smsglobal = SmsGlobal.init(config);
    sharedPoolService = smsglobal.sharedPoolService;

    mockHttpClient = sinon.stub(sharedPoolService.httpClient, 'request');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should fetch shared pools successfully', async () => {
    const mockResponse = [{ id: 1, name: 'Default Pool', size: 100 }];
    mockHttpClient.resolves(mockResponse);

    const result = await sharedPoolService.getSharedPools();

    expect(result).to.deep.equal(mockResponse);
    expect(mockHttpClient.calledOnce).to.be.true;
    expect(mockHttpClient.calledWith('GET', '/v2/sharedpool')).to.be.true;
  });

  it('should throw an error if fetching shared pools fails', async () => {
    const mockError = new Error('Failed to fetch shared pools');
    mockHttpClient.rejects(mockError);

    try {
      await sharedPoolService.getSharedPools();
    } catch (error) {
      expect(error).to.equal(mockError);
    }

    expect(mockHttpClient.calledOnce).to.be.true;
    expect(mockHttpClient.calledWith('GET', '/v2/sharedpool')).to.be.true;
  });
});
