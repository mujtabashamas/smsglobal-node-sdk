class ContactGroupService {
  /**
   * Creates an instance of the ContactGroupService.
   * @param {HttpClient} httpClient - Instance of HttpClient.
   */
  constructor(httpClient) {
    this.client = httpClient;
  }

  // Contact Methods

  /**
   * Get a contact by its ID.
   * @param {number} contactId - The ID of the contact to retrieve.
   * @returns {Promise<Object>} The contact details.
   */
  async getContactById(contactId) {
    try {
      const response = await this.client.request('GET', `/v2/contact/${contactId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update a contact by its ID.
   * @param {number} contactId - The ID of the contact to update.
   * @param {Object} contactData - The data to update the contact with.
   * @returns {Promise<void>} A promise that resolves when the contact is updated.
   */
  async updateContact(contactId, contactData) {
    try {
      await this.client.request('PUT', `/v2/contact/${contactId}`, contactData);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete a contact by its ID.
   * @param {number} contactId - The ID of the contact to delete.
   * @returns {Promise<void>} A promise that resolves when the contact is deleted.
   */
  async deleteContact(contactId) {
    try {
      await this.client.request('DELETE', `/v2/contact/${contactId}`);
    } catch (error) {
      throw error;
    }
  }

  // Contact Group Methods

  /**
   * Get a list of all contact groups with optional pagination.
   * @param {Object} [filters] - Optional filters for pagination.
   * @returns {Promise<Object>} A list of contact groups.
   */
  async getAllContactGroups(filters = { offset: 1, limit: 20 }) {
    try {
      const response = await this.client.request('GET', '/v2/group', filters);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get a contact group by its ID.
   * @param {number} groupId - The ID of the contact group to retrieve.
   * @returns {Promise<Object>} The contact group details.
   */
  async getContactGroupById(groupId) {
    try {
      const response = await this.client.request('GET', `/v2/group/${groupId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create a new contact group.
   * @param {Object} groupData - The data for the new contact group.
   * @returns {Promise<Object>} The newly created contact group.
   */
  async createContactGroup(groupData) {
    try {
      const response = await this.client.request('POST', '/v2/group', groupData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update a contact group by its ID.
   * @param {number} groupId - The ID of the contact group to update.
   * @param {Object} groupData - The data to update the contact group with.
   * @returns {Promise<void>} A promise that resolves when the contact group is updated.
   */
  async updateContactGroup(groupId, groupData) {
    try {
      await this.client.request('PATCH', `/v2/group/${groupId}`, groupData);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete a contact group by its ID.
   * @param {number} groupId - The ID of the contact group to delete.
   * @returns {Promise<void>} A promise that resolves when the contact group is deleted.
   */
  async deleteContactGroup(groupId) {
    try {
      await this.client.request('DELETE', `/v2/group/${groupId}`);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all contacts in a specific group with optional pagination and sorting.
   * @param {number} groupId - The ID of the contact group.
   * @param {Object} [filters] - Optional filters for pagination and sorting.
   * @returns {Promise<Object>} A list of contacts in the group.
   */
  async getContactsByGroup(groupId, filters = { offset: 1, limit: 20, sort: 'id' }) {
    try {
      const response = await this.client.request('GET', `/v2/group/${groupId}/contacts`, filters);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Add a contact to a group.
   * @param {number} groupId - The ID of the contact group.
   * @param {Object} contactData - The contact data to add.
   * @returns {Promise<Object>} The newly created contact.
   */
  async addContactToGroup(groupId, contactData) {
    try {
      const response = await this.client.request('POST', `/v2/group/${groupId}/contact`, contactData);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ContactGroupService;
