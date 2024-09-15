// src/core/HttpClient.js
const axios = require('axios');
const crypto = require('crypto');
const sdkConfig = require('../config');
// const Auth = require('./Auth'); // Keep this if you are using additional methods from Auth, otherwise remove it.
const ErrorHandler = require('./ErrorHandler');

class HttpClient {
  constructor(apiKey, apiSecret) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;

    this.client = axios.create({
      baseURL: sdkConfig.baseURL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Add request interceptor
    this.client.interceptors.request.use((config) => this._addAuthorizationHeader(config));
  }

  _addAuthorizationHeader(config) {
    try {
      // Construct full URL
      const urlString = new URL(config.url, config.baseURL).toString();

      // Generate a secure random nonce
      const timestamp = Math.floor(Date.now() / 1000);
      const nonce = crypto.randomBytes(8).toString('hex'); // Secure random nonce generation
      const urlObj = new URL(urlString);
      const port = urlObj.protocol === 'https:' ? 443 : 80;

      // Construct the MAC authentication string
      const authString = `${timestamp}\n${nonce}\n${config.method.toUpperCase()}\n${urlObj.pathname}${urlObj.search}\n${urlObj.host}\n${port}\n\n`;

      // Create the HMAC SHA-256 hash
      const hash = crypto
        .createHmac('sha256', this.apiSecret)
        .update(authString)
        .digest('base64');

      // Construct the Authorization token
      const authorizationHeader = `MAC id="${this.apiKey}", ts="${timestamp}", nonce="${nonce}", mac="${hash}"`;

      // Assign the Authorization header and return the modified config
      config.headers = {
        ...config.headers,
        Authorization: authorizationHeader,
      };

      return config;
    } catch (error) {
      console.error('Error generating Authorization header:', error);
      throw new ErrorHandler(error);
    }
  }

  async request(method, endpoint, data = {}, extraHeaders = {}) {
    try {
      const response = await this.client.request({
        method,
        url: endpoint,
        data,
        headers: {
          ...extraHeaders, // Include any additional headers provided during the request
        },
      });
      return {
        status: true,
        statusCode: response.status,
        result: response.data,
      };
    } catch (error) {
      console.log(error)
      console.error('HTTP Request Failed:', error.response ? error.response.data : error.message);
      throw new ErrorHandler(error);
    }
  }
}

module.exports = HttpClient;
