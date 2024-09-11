const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const SmsGlobal = require('../src/index'); // Import the SDK entry point

describe('ContactGroupService', () => {
  let contactGroupService;
  let mockHttpClient;

  beforeEach(() => {
    const config = {
      apiKey: 'mock-api-key',
      apiSecret: 'mock-api-secret',
      baseURL: 'https://api.smsglobal.com',
    };

    const smsglobal = SmsGlobal.init(config);
    contactGroupService = smsglobal.contactGroupService;

    mockHttpClient = sinon.stub(contactGroupService.httpClient, 'request');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should fetch contact group by ID successfully', async () => {
    const mockResponse = { id: 1, name: 'Test Group' };
    mockHttpClient.resolves(mockResponse);

    const result = await contactGroupService.getContactGroupById(1);

    expect(result).to.deep.equal(mockResponse);
    expect(mockHttpClient.calledOnce).to.be.true;
    expect(mockHttpClient.calledWith('GET', '/v2/group/1')).to.be.true;
  });

  it('should throw an error if fetching contact group by ID fails', async () => {
    const mockError = new Error('Failed to fetch contact group');
    mockHttpClient.rejects(mockError);

    try {
      await contactGroupService.getContactGroupById(1);
    } catch (error) {
      expect(error).to.equal(mockError);
    }

    expect(mockHttpClient.calledOnce).to.be.true;
    expect(mockHttpClient.calledWith('GET', '/v2/group/1')).to.be.true;
  });
});
