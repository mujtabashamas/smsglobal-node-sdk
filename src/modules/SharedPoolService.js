class SharedPoolService {
  /**
   * Creates an instance of the SharedPoolService.
   * @param {HttpClient} httpClient - Instance of HttpClient.
   */
  constructor(httpClient) {
    this.client = httpClient;
  }

  /**
   * Get a list of shared pools.
   * @returns {Promise<Object>} A list of shared pools.
   */
  async getSharedPools() {
    try {
      const response = await this.client.request('GET', '/v2/sharedpool');
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get details of a specific shared pool by its ID.
   * @param {number} sharedPoolId - The ID of the shared pool.
   * @returns {Promise<Object>} The details of the shared pool.
   */
  async getSharedPoolById(sharedPoolId) {
    try {
      const response = await this.client.request('GET', `/v2/sharedpool/${sharedPoolId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SharedPoolService;
