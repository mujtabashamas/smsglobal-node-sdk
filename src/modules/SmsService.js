class SmsService {
  /**
   * Creates an instance of the SmsService.
   * @param {HttpClient} httpClient - Instance of HttpClient.
   */
  constructor(httpClient) {
    this.client = httpClient;
  }

  /**
   * Get a list of outgoing SMS messages.
   * @param {Object} [filters] - Optional filters for pagination, status, date range, etc.
   * @returns {Promise<Object>} A list of outgoing SMS messages.
   */
  async getOutgoingMessages(filters = { offset: 1, limit: 20 }) {
    try {
      const response = await this.client.request('GET', '/v2/sms', filters);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Send SMS message(s).
   * @param {Object} smsData - Data for the SMS to be sent.
   * @returns {Promise<Object>} The result of the SMS sending operation.
   */
  async sendSms(smsData) {
    try {
      const response = await this.client.request('POST', '/v2/sms', smsData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get details of an outgoing SMS by its ID.
   * @param {number} messageId - The ID of the outgoing SMS.
   * @returns {Promise<Object>} The details of the outgoing SMS.
   */
  async getOutgoingMessageById(messageId) {
    try {
      const response = await this.client.request('GET', `/v2/sms${messageId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete an outgoing SMS by its ID.
   * @param {number} messageId - The ID of the outgoing SMS.
   * @returns {Promise<void>} A promise that resolves when the SMS is deleted.
   */
  async deleteOutgoingMessage(messageId) {
    try {
      await this.client.request('DELETE', `/v2/sms${messageId}`);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SmsService;
