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
const contactGroupService = new ContactGroupService(httpClient);
const dedicatedNumberService = new DedicatedNumberService(httpClient);
const optOutsService = new OptOutsService(httpClient);
const sharedPoolService = new SharedPoolService(httpClient);
const smsService = new SmsService(httpClient);
const smsIncomingService = new SmsIncomingService(httpClient);
const userService = new UserService(httpClient);

module.exports = {
  autoTopupService,
  contactGroupService,
  dedicatedNumberService,
  optOutsService,
  sharedPoolService,
  smsService,
  smsIncomingService,
  userService,
};
