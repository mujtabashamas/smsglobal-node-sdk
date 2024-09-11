const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const UserService = require('../src/modules/UserService');
const HttpClient = require('../src/core/HttpClient');

describe('UserService', () => {
  let userService;
  let mockHttpClient;

  beforeEach(() => {
    mockHttpClient = sinon.createStubInstance(HttpClient);
    userService = new UserService(mockHttpClient);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should fetch user billing details successfully', async () => {
    const mockResponse = { id: 1, name: 'John Doe', phone: '1234567890', email: 'john@example.com' };

    mockHttpClient.request.resolves(mockResponse);

    const result = await userService.getBillingDetails();

    expect(result).to.deep.equal(mockResponse);
    expect(mockHttpClient.request.calledOnce).to.be.true;
    expect(mockHttpClient.request.calledWith('GET', '/v2/user/billing-details')).to.be.true;
  });

  it('should throw an error if fetching user billing details fails', async () => {
    const mockError = new Error('Failed to fetch user billing details');
    mockHttpClient.request.rejects(mockError);

    try {
      await userService.getBillingDetails();
    } catch (error) {
      expect(error).to.equal(mockError);
    }

    expect(mockHttpClient.request.calledOnce).to.be.true;
    expect(mockHttpClient.request.calledWith('GET', '/v2/user/billing-details')).to.be.true;
  });
});
