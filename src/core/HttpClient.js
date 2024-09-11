// src/core/HttpClient.js
const axios = require('axios');
const Auth = require('./Auth');
const ErrorHandler = require('./ErrorHandler');
const config = require('../config');

class HttpClient {
  constructor() {
    this.client = axios.create({
      baseURL: config.baseURL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    this.apiKey = config.apiKey;
    this.apiSecret = config.apiSecret;
  }

  async request(method, endpoint, data = {}, extraHeaders = {}) {
    const timestamp = Math.floor(Date.now() / 1000);
    const nonce = Auth.generateNonce();

    const mac = Auth.calculateMAC({
      timestamp,
      nonce,
      method,
      endpoint,
      host: this.client.defaults.baseURL.replace(/^https?:\/\//, ''), // Remove protocol
      port: 443,
      data: JSON.stringify(data),
      apiSecret: this.apiSecret,
    });

    try {
      const response = await this.client.request({
        method,
        url: endpoint,
        data,
        headers: {
          ...extraHeaders,
          Authorization: `MAC id="${this.apiKey}", ts="${timestamp}", nonce="${nonce}", mac="${mac}"`,
        },
      });
      return response.data;
    } catch (error) {
      throw new ErrorHandler(error);
    }
  }
}

module.exports = HttpClient;
