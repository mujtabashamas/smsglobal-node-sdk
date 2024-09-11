const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const SmsGlobal = require('../src/index'); // Import the SDK entry point

describe('UserService', () => {
  let userService;
  let mockHttpClient;

  beforeEach(() => {
    const config = {
      apiKey: 'mock-api-key',
      apiSecret: 'mock-api-secret',
      baseURL: 'https://api.smsglobal.com',
    };

    const smsglobal = SmsGlobal.init(config);
    userService = smsglobal.userService;

    mockHttpClient = sinon.stub(userService.httpClient, 'request');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should fetch user billing details successfully', async () => {
    const mockResponse = { id: 1, name: 'John Doe' };
    mockHttpClient.resolves(mockResponse);

    const result = await userService.getBillingDetails();

    expect(result).to.deep.equal(mockResponse);
    expect(mockHttpClient.calledOnce).to.be.true;
    expect(mockHttpClient.calledWith('GET', '/v2/user/billing-details')).to.be.true;
  });

  it('should throw an error if fetching user billing details fails', async () => {
    const mockError = new Error('Failed to fetch billing details');
    mockHttpClient.rejects(mockError);

    try {
      await userService.getBillingDetails();
    } catch (error) {
      expect(error).to.equal(mockError);
    }

    expect(mockHttpClient.calledOnce).to.be.true;
    expect(mockHttpClient.calledWith('GET', '/v2/user/billing-details')).to.be.true;
  });
});
