const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const SharedPoolService = require('../src/modules/SharedPoolService');
const HttpClient = require('../src/core/HttpClient');

describe('SharedPoolService', () => {
  let sharedPoolService;
  let mockHttpClient;

  beforeEach(() => {
    mockHttpClient = sinon.createStubInstance(HttpClient);
    sharedPoolService = new SharedPoolService(mockHttpClient);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should fetch shared pools successfully', async () => {
    const mockResponse = [{ id: 1, name: 'Pool1', size: 10 }];

    mockHttpClient.request.resolves(mockResponse);

    const result = await sharedPoolService.getSharedPools();

    expect(result).to.deep.equal(mockResponse);
    expect(mockHttpClient.request.calledOnce).to.be.true;
    expect(mockHttpClient.request.calledWith('GET', '/v2/sharedpool')).to.be.true;
  });

  it('should throw an error if fetching shared pools fails', async () => {
    const mockError = new Error('Failed to fetch shared pools');
    mockHttpClient.request.rejects(mockError);

    try {
      await sharedPoolService.getSharedPools();
    } catch (error) {
      expect(error).to.equal(mockError);
    }

    expect(mockHttpClient.request.calledOnce).to.be.true;
    expect(mockHttpClient.request.calledWith('GET', '/v2/sharedpool')).to.be.true;
  });
});
