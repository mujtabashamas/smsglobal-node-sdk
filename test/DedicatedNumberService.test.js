const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const SmsGlobal = require('../src/index'); // Import the SDK entry point

describe('DedicatedNumberService', () => {
  let dedicatedNumberService;
  let mockHttpClient;

  beforeEach(() => {
    const config = {
      apiKey: 'mock-api-key',
      apiSecret: 'mock-api-secret',
      baseURL: 'https://api.smsglobal.com',
    };

    const smsglobal = SmsGlobal.init(config);
    dedicatedNumberService = smsglobal.dedicatedNumberService;

    mockHttpClient = sinon.stub(dedicatedNumberService.httpClient, 'request');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should fetch dedicated numbers successfully', async () => {
    const mockResponse = [{ id: 1, msisdn: '61447100250', type: 'SMPP' }];
    mockHttpClient.resolves(mockResponse);

    const result = await dedicatedNumberService.getDedicatedNumbers();

    expect(result).to.deep.equal(mockResponse);
    expect(mockHttpClient.calledOnce).to.be.true;
    expect(mockHttpClient.calledWith('GET', '/v2/dedicated-number')).to.be.true;
  });

  it('should throw an error if fetching dedicated numbers fails', async () => {
    const mockError = new Error('Failed to fetch dedicated numbers');
    mockHttpClient.rejects(mockError);

    try {
      await dedicatedNumberService.getDedicatedNumbers();
    } catch (error) {
      expect(error).to.equal(mockError);
    }

    expect(mockHttpClient.calledOnce).to.be.true;
    expect(mockHttpClient.calledWith('GET', '/v2/dedicated-number')).to.be.true;
  });
});
