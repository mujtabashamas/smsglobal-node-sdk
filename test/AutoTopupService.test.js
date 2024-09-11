const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const AutoTopupService = require('../src/modules/AutoTopupService');
const HttpClient = require('../src/core/HttpClient');

describe('AutoTopupService', () => {
  let autoTopupService;
  let mockHttpClient;

  beforeEach(() => {
    mockHttpClient = sinon.createStubInstance(HttpClient);
    autoTopupService = new AutoTopupService(mockHttpClient);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should fetch auto-topup information successfully', async () => {
    const mockResponse = {
      disabled: false,
      balanceThreshold: 100,
      balanceAmount: 50,
      card: {
        number: '**** **** **** 1234',
        type: 'Visa',
      },
    };

    mockHttpClient.request.resolves(mockResponse);

    const result = await autoTopupService.getAutoTopupInfo();

    expect(result).to.deep.equal(mockResponse);
    expect(mockHttpClient.request.calledOnce).to.be.true;
    expect(mockHttpClient.request.calledWith('GET', '/v2/auto-topup')).to.be.true;
  });

  it('should throw an error if fetching auto-topup information fails', async () => {
    const mockError = new Error('Failed to fetch auto-topup information');
    mockHttpClient.request.rejects(mockError);

    try {
      await autoTopupService.getAutoTopupInfo();
    } catch (error) {
      expect(error).to.equal(mockError);
    }

    expect(mockHttpClient.request.calledOnce).to.be.true;
    expect(mockHttpClient.request.calledWith('GET', '/v2/auto-topup')).to.be.true;
  });
});
