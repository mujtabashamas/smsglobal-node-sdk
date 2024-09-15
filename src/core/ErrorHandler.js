class ErrorHandler extends Error {
  constructor(error) {
    super();
    this.name = 'ErrorHandler';
    this.message = ErrorHandler.parseError(error);
  }

  static parseError(error) {
    if (error.response) {
      // HTTP error from the server
      const { status, data } = error.response;
      switch (status) {
        case 400:
          return {
            status: false,
            statusCode: status,
            message: `Bad Request: ${data.message || 'The request was invalid or missing data.'}`
          };
        case 401:
          return {
            status: false,
            statusCode: status,
            message: `Unauthorized: ${data.message || 'Authentication failed. Please check your API key and secret.'}`
          };
        case 404:
          return {
            status: false,
            statusCode: status,
            message: `Not Found: ${data.message || 'The requested resource could not be found.'}`
          };
        case 405:
          return {
            status: false,
            statusCode: status,
            message: `Method Not Allowed: ${data.message || 'The HTTP method is not allowed for this endpoint.'}`
          };
        case 406:
          return {
            status: false,
            statusCode: status,
            message: `Not Acceptable: ${data.message || 'The requested content type is not supported.'}`
          }
        case 415:
          return {
            status: false,
            statusCode: status,
            message: `Unsupported Media Type: ${data.message || 'The content type of the request is not supported.'}`
          }
        default:
          return {
            status: false,
            statusCode: status,
            message: `HTTP Error: ${data.message || 'An unexpected error occurred.'} (Status code: ${status})`
          };
      }
    } else if (error.request) {
      // Network error, no response was received
      return {
        status: false,
        message: 'Network Error: No response received from the server. Please check your network connection.'
      }
    } else {
      // General error
      return {
        status: false,
        message: `Error: ${error.message}`
      };
    }
  }
}

module.exports = ErrorHandler;
