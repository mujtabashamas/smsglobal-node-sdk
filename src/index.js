const HttpClient = require('./core/HttpClient');

const AutoTopupService = require('./modules/AutoTopupService');
const ContactGroupService = require('./modules/ContactGroupService');
const DedicatedNumberService = require('./modules/DedicatedNumberService');
const OptOutsService = require('./modules/OptOutsService');
const SharedPoolService = require('./modules/SharedPoolService');
const SmsService = require('./modules/SmsService');
const SmsIncomingService = require('./modules/SmsIncomingService');
const UserService = require('./modules/UserService');

// Initialize the HttpClient once
const httpClient = new HttpClient();

// Initialize services with the shared HttpClient
const autoTopupService = new AutoTopupService(httpClient);

module.exports = {
  AutoTopupService,
  ContactGroupService,
  DedicatedNumberService,
  OptOutsService,
  SharedPoolService,
  SmsService,
  SmsIncomingService,
  UserService,
};
