const crypto = require('crypto');

class Auth {
  static generateNonce(length = 16) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
  }

  static calculateMAC({ timestamp, nonce, method, endpoint, host, port, data = '', apiSecret }) {
    const requestString = `${timestamp}\n${nonce}\n${method.toUpperCase()}\n${endpoint}\n${host}\n${port}\n${data}\n`;
    const hmac = crypto.createHmac('sha256', apiSecret);
    hmac.update(requestString);
    return hmac.digest('base64');
  }
}

module.exports = Auth;
