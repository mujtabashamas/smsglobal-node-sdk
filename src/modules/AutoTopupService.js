class AutoTopupService {
  /**
   * Creates an instance of the AutoTopupService.
   * @param {HttpClient} httpClient - Instance of HttpClient.
   */
  constructor(httpClient) {
    this.client = httpClient;
  }

  /**
   * Fetch the auto-top-up information associated with the authenticated account.
   * @returns {Promise<Object>} The auto-top-up information.
   */
  async getAutoTopupInfo() {
    try {
      const response = await this.client.request('GET', '/v2/auto-topup');
      return this.parseAutoTopupResponse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Parses the auto-top-up response data.
   * @param {Object} data - The raw response data.
   * @returns {Object} The parsed auto-top-up information.
   */
  parseAutoTopupResponse(data) {
    return {
      disabled: data.disabled,
      balanceThreshold: data.balanceThreshold,
      balanceAmount: data.balanceAmount,
      card: {
        number: data.card?.number,
        type: data.card?.type,
      },
      periodicFrequency: data.periodicFrequency,
      periodicStartDate: data.periodicStartDate,
      periodicEndDate: data.periodicEndDate,
      periodicAmount: data.periodicAmount,
    };
  }
}

module.exports = AutoTopupService;
