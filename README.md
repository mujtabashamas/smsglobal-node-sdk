# smsglobal-node-sdk

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

Node SDK to interact with the SMSGlobal REST API endpoints. This SDK provides an easy way to integrate SMSGlobal services into your Node.js applications, allowing you to send SMS, manage contacts, view balances, and more.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Initialization](#initialization)
  - [Services](#services)
    - [AutoTopupService](#autotopupservice)
    - [ContactGroupService](#contactgroupservice)
    - [DedicatedNumberService](#dedicatednumberservice)
    - [OptOutService](#optoutservice)
    - [SharedPoolService](#sharedpoolservice)
    - [SmsService](#smsservice)
    - [SmsIncomingService](#smsincomingservice)
    - [UserService](#userservice)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

To use the SMSGlobal Node SDK, you need to have [Node.js](https://nodejs.org/) installed. You can then install the SDK via npm:

```bash
npm install smsglobal-node-sdk
```

## Usage

### Initialization

To use the SDK, first, you need to initialize it with your SMSGlobal API key and secret.

### Initialization

To use the SDK, you need to initialize it with your SMSGlobal API key and secret by passing a configuration object to the `init` function provided by the SDK.

```javascript
// Import the SDK
const SmsGlobal = require('smsglobal-node-sdk');

// Your custom configuration
const config = {
  apiKey: 'your-api-key', // Replace with your actual API key
  apiSecret: 'your-api-secret', // Replace with your actual API secret
};

// Initialize the SDK with your configuration
const smsglobal = SmsGlobal.init(config);

// Destructure the services you want to use
const { autoTopupService, contactGroupService } = smsglobal;

// Example: Fetching Auto-Topup Information
(async () => {
  try {
    const autoTopupInfo = await autoTopupService.getAutoTopupInfo();
    console.log(autoTopupInfo);
  } catch (error) {
    console.error('Error fetching auto-topup information:', error.message);
  }
})();
```

### Services

The SDK provides several services to interact with the SMSGlobal API:

#### AutoTopupService

- `getAutoTopupInfo()`: Fetch auto-topup information for the authenticated account.

#### ContactGroupService

- `getContactGroupById(groupId)`: Fetch a specific contact group by ID.
- `createContactGroup(groupData)`: Create a new contact group.
- `updateContactGroup(groupId, groupData)`: Update a contact group.
- `deleteContactGroup(groupId)`: Delete a contact group by ID.

#### DedicatedNumberService

- `getDedicatedNumbers()`: Fetch a list of dedicated numbers associated with the account.

#### OptOutService

- `getOptOuts()`: Fetch a list of opted-out numbers.
- `optOutNumbers(numbers)`: Opt-out mobile numbers.
- `optInNumber(number)`: Opt-in a mobile number.

#### SharedPoolService

- `getSharedPools()`: Fetch a list of shared pools.
- `getSharedPoolById(sharedPoolId)`: Fetch details of a specific shared pool.

#### SmsService

- `getOutgoingMessages(filters)`: Fetch a list of outgoing SMS messages.
- `sendSms(smsData)`: Send an SMS message.
- `deleteOutgoingMessage(messageId)`: Delete an outgoing SMS message by ID.

#### SmsIncomingService

- `getIncomingMessages(filters)`: Fetch a list of incoming SMS messages.
- `deleteIncomingMessage(messageId)`: Delete an incoming SMS message by ID.

#### UserService

- `getBillingDetails()`: Fetch billing details of the authenticated account.
- `updateBillingDetails(billingData)`: Update billing details.
- `getContactDetails()`: Fetch contact details of the authenticated account.
- `getCreditBalance()`: Fetch the credit balance of the authenticated account.

## Sending SMS via HTTP API

If you're sending SMS via the HTTP API, you need to locate your **Master API keys** for your username and password. You can find these keys by logging into your SMSGlobal account and navigating to [Integrations](https://mxt.smsglobal.com/integrations).

### Sample HTTP API Request

Below is a sample HTTP API request for sending an SMS:

```bash
https://api.smsglobal.com/http-api.php?action=sendsms&user=username&password=password&from=Test&to=61447100250&text=Testmessage
```

Replace `username` and `password` with your Master API keys, and update the `from`, `to`, and `text` parameters as needed.

## OTP API Documentation

For setting up and using the **OTP API**, refer to the SMSGlobal [OTP API documentation](https://www.smsglobal.com/otp-api). This API uses **REST API keys** for authentication and offers robust OTP generation and verification features.

### OTP Setup Guide

To help you set up the OTP API, we've provided an [OTP Setup Guide](https://www.smsglobal.com/otp-api). Make sure to follow the guide to configure your OTP services properly.

## Testing

The SDK comes with comprehensive tests for each service module using **Mocha**, **Chai**, and **Sinon**. To run the tests:

```bash
npm test
```

This command will run all tests located in the `test/` directory.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork** the repository.
2. **Clone** your fork: `git clone https://github.com/yourusername/smsglobal-node-sdk.git`
3. **Create** a new branch: `git checkout -b my-feature-branch`
4. **Commit** your changes: `git commit -m 'Add some feature'`
5. **Push** to the branch: `git push origin my-feature-branch`
6. **Submit** a Pull Request.

Please make sure to write tests for your changes and run existing tests to ensure nothing is broken.

## License

This project is licensed under the **GNU General Public License v3.0 or later**. See the [LICENSE](LICENSE) file for more details.

---

© 2024 Mujtaba Shamas. All rights reserved.
