const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const SmsService = require('../src/modules/SmsService');
const HttpClient = require('../src/core/HttpClient');

describe('SmsService', () => {
  let smsService;
  let mockHttpClient;

  beforeEach(() => {
    mockHttpClient = sinon.createStubInstance(HttpClient);
    smsService = new SmsService(mockHttpClient);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should fetch outgoing messages successfully', async () => {
    const mockResponse = { messages: [{ id: 1, destination: '1234567890', status: 'delivered' }] };

    mockHttpClient.request.resolves(mockResponse);

    const result = await smsService.getOutgoingMessages();

    expect(result).to.deep.equal(mockResponse);
    expect(mockHttpClient.request.calledOnce).to.be.true;
    expect(mockHttpClient.request.calledWith('GET', '/v2/sms')).to.be.true;
  });

  it('should throw an error if fetching outgoing messages fails', async () => {
    const mockError = new Error('Failed to fetch outgoing messages');
    mockHttpClient.request.rejects(mockError);

    try {
      await smsService.getOutgoingMessages();
    } catch (error) {
      expect(error).to.equal(mockError);
    }

    expect(mockHttpClient.request.calledOnce).to.be.true;
    expect(mockHttpClient.request.calledWith('GET', '/v2/sms')).to.be.true;
  });
});
