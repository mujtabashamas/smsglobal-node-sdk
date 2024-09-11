class OptOutService {
  /**
   * Creates an instance of the OptOutService.
   * @param {HttpClient} httpClient - Instance of HttpClient.
   */
  constructor(httpClient) {
    this.client = httpClient;
  }

  /**
   * Get a list of opted-out numbers.
   * @param {Object} [filters] - Optional filters for pagination.
   * @returns {Promise<Object>} A list of opted-out numbers.
   */
  async getOptOuts(filters = { offset: 1, limit: 20, phoneNumber: '' }) {
    try {
      const response = await this.client.request('GET', '/v2/opt-outs', filters);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Opt-out mobile numbers.
   * @param {Array<string>} optouts - Array of mobile numbers to opt-out.
   * @returns {Promise<Object>} The result of opt-out operations.
   */
  async optOutNumbers(optouts) {
    try {
      const response = await this.client.request('POST', '/v2/opt-outs', { optouts });
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Validate mobile numbers for opt-out.
   * @param {Array<string>} optouts - Array of mobile numbers to validate for opt-out.
   * @returns {Promise<Object>} The result of validation operations.
   */
  async validateOptOutNumbers(optouts) {
    try {
      const response = await this.client.request('POST', '/v2/opt-outs/validate', { optouts });
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Opt-in a mobile number.
   * @param {string} number - The mobile number to opt-in.
   * @returns {Promise<void>} A promise that resolves when the number is opted in.
   */
  async optInNumber(number) {
    try {
      await this.client.request('DELETE', `/v2/opt-outs/${number}`);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OptOutService;
