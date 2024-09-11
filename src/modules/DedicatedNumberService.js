class DedicatedNumberService {
  /**
   * Creates an instance of the DedicatedNumberService.
   * @param {HttpClient} httpClient - Instance of HttpClient.
   */
  constructor(httpClient) {
    this.client = httpClient;
  }

  /**
   * Get a list of dedicated numbers.
   * @returns {Promise<Object>} A collection of dedicated numbers.
   */
  async getDedicatedNumbers() {
    try {
      const response = await this.client.request('GET', '/v2/dedicated-number');
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DedicatedNumberService;
