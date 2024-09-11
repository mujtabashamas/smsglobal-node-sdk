const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const SmsGlobal = require('../src/index'); // Import the SDK entry point

describe('SmsService', () => {
  let smsService;
  let mockHttpClient;

  beforeEach(() => {
    const config = {
      apiKey: 'mock-api-key',
      apiSecret: 'mock-api-secret',
      baseURL: 'https://api.smsglobal.com',
    };

    const smsglobal = SmsGlobal.init(config);
    smsService = smsglobal.smsService;

    mockHttpClient = sinon.stub(smsService.httpClient, 'request');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should send SMS successfully', async () => {
    const mockResponse = { messages: [{ id: 1, destination: '61447100250', status: 'delivered' }] };
    const smsData = {
      destination: '61447100250',
      message: 'Hello from SMSGlobal!',
      origin: 'Test',
    };

    mockHttpClient.resolves(mockResponse);

    const result = await smsService.sendSms(smsData);

    expect(result).to.deep.equal(mockResponse);
    expect(mockHttpClient.calledOnce).to.be.true;
    expect(mockHttpClient.calledWith('POST', '/v2/sms')).to.be.true;
  });

  it('should throw an error if sending SMS fails', async () => {
    const mockError = new Error('Failed to send SMS');
    mockHttpClient.rejects(mockError);

    try {
      await smsService.sendSms({
        destination: '61447100250',
        message: 'Hello from SMSGlobal!',
        origin: 'Test',
      });
    } catch (error) {
      expect(error).to.equal(mockError);
    }

    expect(mockHttpClient.calledOnce).to.be.true;
    expect(mockHttpClient.calledWith('POST', '/v2/sms')).to.be.true;
  });
});
