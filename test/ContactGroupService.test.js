const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const ContactGroupService = require('../src/modules/ContactGroupService');
const HttpClient = require('../src/core/HttpClient');

describe('ContactGroupService', () => {
  let contactGroupService;
  let mockHttpClient;

  beforeEach(() => {
    mockHttpClient = sinon.createStubInstance(HttpClient);
    contactGroupService = new ContactGroupService(mockHttpClient);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should fetch contact group by ID successfully', async () => {
    const mockResponse = {
      id: 123,
      name: 'Friends',
      keyword: 'FRIENDS',
      contactCount: 10,
    };

    mockHttpClient.request.resolves(mockResponse);

    const result = await contactGroupService.getContactGroupById(123);

    expect(result).to.deep.equal(mockResponse);
    expect(mockHttpClient.request.calledOnce).to.be.true;
    expect(mockHttpClient.request.calledWith('GET', '/v2/group/123')).to.be.true;
  });

  it('should throw an error if fetching contact group fails', async () => {
    const mockError = new Error('Failed to fetch contact group');
    mockHttpClient.request.rejects(mockError);

    try {
      await contactGroupService.getContactGroupById(123);
    } catch (error) {
      expect(error).to.equal(mockError);
    }

    expect(mockHttpClient.request.calledOnce).to.be.true;
    expect(mockHttpClient.request.calledWith('GET', '/v2/group/123')).to.be.true;
  });
});
