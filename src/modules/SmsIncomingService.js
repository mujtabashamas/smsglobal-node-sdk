class SmsIncomingService {
  /**
   * Creates an instance of the SmsIncomingService.
   * @param {HttpClient} httpClient - Instance of HttpClient.
   */
  constructor(httpClient) {
    this.client = httpClient;
  }

  /**
   * Get a list of incoming SMS messages.
   * @param {Object} [filters] - Optional filters for pagination, date range, etc.
   * @returns {Promise<Object>} A list of incoming SMS messages.
   */
  async getIncomingMessages(filters = { offset: 1, limit: 20 }) {
    try {
      const response = await this.client.request('GET', '/v2/sms-incoming', filters);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get details of an incoming SMS by its ID.
   * @param {number} messageId - The ID of the incoming SMS.
   * @returns {Promise<Object>} The details of the incoming SMS.
   */
  async getIncomingMessageById(messageId) {
    try {
      const response = await this.client.request('GET', `/v2/sms-incoming/${messageId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete an incoming SMS by its ID.
   * @param {number} messageId - The ID of the incoming SMS.
   * @returns {Promise<void>} A promise that resolves when the SMS is deleted.
   */
  async deleteIncomingMessage(messageId) {
    try {
      await this.client.request('DELETE', `/v2/sms-incoming/${messageId}`);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SmsIncomingService;
