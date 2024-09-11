class UserService {
  /**
   * Creates an instance of the UserService.
   * @param {HttpClient} httpClient - Instance of HttpClient.
   */
  constructor(httpClient) {
    this.client = httpClient;
  }

  /**
   * Get the authenticated account's billing details.
   * @returns {Promise<Object>} The billing details of the authenticated account.
   */
  async getBillingDetails() {
    try {
      const response = await this.client.request('GET', '/v2/user/billing-details');
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update the authenticated account's billing details.
   * @param {Object} billingData - The billing details to update.
   * @returns {Promise<void>} A promise that resolves when the billing details are updated.
   */
  async updateBillingDetails(billingData) {
    try {
      await this.client.request('PUT', '/v2/user/billing-details', billingData);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get the authenticated account's contact details.
   * @returns {Promise<Object>} The contact details of the authenticated account.
   */
  async getContactDetails() {
    try {
      const response = await this.client.request('GET', '/v2/user/contact-details');
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update the authenticated account's contact details.
   * @param {Object} contactData - The contact details to update.
   * @returns {Promise<void>} A promise that resolves when the contact details are updated.
   */
  async updateContactDetails(contactData) {
    try {
      await this.client.request('PUT', '/v2/user/contact-details', contactData);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get the authenticated account's credit balance.
   * @returns {Promise<Object>} The credit balance of the authenticated account.
   */
  async getCreditBalance() {
    try {
      const response = await this.client.request('GET', '/v2/user/credit-balance');
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get low balance alerts information for the authenticated account.
   * @returns {Promise<Object>} The low balance alerts information.
   */
  async getLowBalanceAlerts() {
    try {
      const response = await this.client.request('GET', '/v2/user/low-balance-alerts');
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update low balance alerts information for the authenticated account.
   * @param {Object} alertData - The low balance alerts information to update.
   * @returns {Promise<void>} A promise that resolves when the low balance alerts are updated.
   */
  async updateLowBalanceAlerts(alertData) {
    try {
      await this.client.request('PUT', '/v2/user/low-balance-alerts', alertData);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get the authenticated account's verified numbers.
   * @returns {Promise<Object>} A list of verified numbers.
   */
  async getVerifiedNumbers() {
    try {
      const response = await this.client.request('GET', '/v2/user/verified-numbers');
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create a sub-account.
   * @param {Object} subAccountData - The data for the sub-account to create.
   * @returns {Promise<Object>} The created sub-account details.
   */
  async createSubAccount(subAccountData) {
    try {
      const response = await this.client.request('POST', '/v2/user/sub-account', subAccountData);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
