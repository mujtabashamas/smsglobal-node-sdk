const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const SmsGlobal = require('../src/index'); // Import the SDK entry point

describe('SmsIncomingService', () => {
  let smsIncomingService;
  let mockHttpClient;

  beforeEach(() => {
    const config = {
      apiKey: 'mock-api-key',
      apiSecret: 'mock-api-secret',
      baseURL: 'https://api.smsglobal.com',
    };

    const smsglobal = SmsGlobal.init(config);
    smsIncomingService = smsglobal.smsIncomingService;

    mockHttpClient = sinon.stub(smsIncomingService.httpClient, 'request');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should fetch incoming SMS messages successfully', async () => {
    const mockResponse = [{ id: 1, origin: '61447100250', message: 'Hello!' }];
    mockHttpClient.resolves(mockResponse);

    const result = await smsIncomingService.getIncomingMessages();

    expect(result).to.deep.equal(mockResponse);
    expect(mockHttpClient.calledOnce).to.be.true;
    expect(mockHttpClient.calledWith('GET', '/v2/sms-incoming')).to.be.true;
  });

  it('should throw an error if fetching incoming SMS messages fails', async () => {
    const mockError = new Error('Failed to fetch incoming SMS messages');
    mockHttpClient.rejects(mockError);

    try {
      await smsIncomingService.getIncomingMessages();
    } catch (error) {
      expect(error).to.equal(mockError);
    }

    expect(mockHttpClient.calledOnce).to.be.true;
    expect(mockHttpClient.calledWith('GET', '/v2/sms-incoming')).to.be.true;
  });
});
