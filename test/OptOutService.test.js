const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const OptOutService = require('../src/modules/OptOutService');
const HttpClient = require('../src/core/HttpClient');

describe('OptOutService', () => {
  let optOutService;
  let mockHttpClient;

  beforeEach(() => {
    mockHttpClient = sinon.createStubInstance(HttpClient);
    optOutService = new OptOutService(mockHttpClient);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should fetch opted-out numbers successfully', async () => {
    const mockResponse = { optouts: [{ number: '1234567890', status: 'valid' }] };

    mockHttpClient.request.resolves(mockResponse);

    const result = await optOutService.getOptOuts();

    expect(result).to.deep.equal(mockResponse);
    expect(mockHttpClient.request.calledOnce).to.be.true;
    expect(mockHttpClient.request.calledWith('GET', '/v2/opt-outs')).to.be.true;
  });

  it('should throw an error if fetching opt-outs fails', async () => {
    const mockError = new Error('Failed to fetch opt-outs');
    mockHttpClient.request.rejects(mockError);

    try {
      await optOutService.getOptOuts();
    } catch (error) {
      expect(error).to.equal(mockError);
    }

    expect(mockHttpClient.request.calledOnce).to.be.true;
    expect(mockHttpClient.request.calledWith('GET', '/v2/opt-outs')).to.be.true;
  });
});
