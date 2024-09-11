const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const DedicatedNumberService = require('../src/modules/DedicatedNumberService');
const HttpClient = require('../src/core/HttpClient');

describe('DedicatedNumberService', () => {
  let dedicatedNumberService;
  let mockHttpClient;

  beforeEach(() => {
    mockHttpClient = sinon.createStubInstance(HttpClient);
    dedicatedNumberService = new DedicatedNumberService(mockHttpClient);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should fetch dedicated numbers successfully', async () => {
    const mockResponse = [
      {
        id: 1,
        userId: 101,
        msisdn: '1234567890',
        type: 'HTTP Callback',
      },
    ];

    mockHttpClient.request.resolves(mockResponse);

    const result = await dedicatedNumberService.getDedicatedNumbers();

    expect(result).to.deep.equal(mockResponse);
    expect(mockHttpClient.request.calledOnce).to.be.true;
    expect(mockHttpClient.request.calledWith('GET', '/v2/dedicated-number')).to.be.true;
  });

  it('should throw an error if fetching dedicated numbers fails', async () => {
    const mockError = new Error('Failed to fetch dedicated numbers');
    mockHttpClient.request.rejects(mockError);

    try {
      await dedicatedNumberService.getDedicatedNumbers();
    } catch (error) {
      expect(error).to.equal(mockError);
    }

    expect(mockHttpClient.request.calledOnce).to.be.true;
    expect(mockHttpClient.request.calledWith('GET', '/v2/dedicated-number')).to.be.true;
  });
});
