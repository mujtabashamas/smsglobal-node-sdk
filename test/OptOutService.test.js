const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const SmsGlobal = require('../src/index'); // Import the SDK entry point

describe('OptOutService', () => {
  let optOutsService;
  let mockHttpClient;

  beforeEach(() => {
    const config = {
      apiKey: 'mock-api-key',
      apiSecret: 'mock-api-secret',
      baseURL: 'https://api.smsglobal.com',
    };

    const smsglobal = SmsGlobal.init(config);
    optOutsService = smsglobal.optOutsService;

    mockHttpClient = sinon.stub(optOutsService.httpClient, 'request');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should fetch opt-out numbers successfully', async () => {
    const mockResponse = [{ number: '61447100250', status: 'valid' }];
    mockHttpClient.resolves(mockResponse);

    const result = await optOutsService.getOptOuts();

    expect(result).to.deep.equal(mockResponse);
    expect(mockHttpClient.calledOnce).to.be.true;
    expect(mockHttpClient.calledWith('GET', '/v2/opt-outs')).to.be.true;
  });

  it('should throw an error if fetching opt-out numbers fails', async () => {
    const mockError = new Error('Failed to fetch opt-out numbers');
    mockHttpClient.rejects(mockError);

    try {
      await optOutsService.getOptOuts();
    } catch (error) {
      expect(error).to.equal(mockError);
    }

    expect(mockHttpClient.calledOnce).to.be.true;
    expect(mockHttpClient.calledWith('GET', '/v2/opt-outs')).to.be.true;
  });
});
