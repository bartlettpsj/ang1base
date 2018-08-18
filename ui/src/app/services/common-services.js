import httpRequestService from './http-request-service';

/**
 * This module is used for defining common services that can be used throughout the application/
 */
const commonServicesModule = angular.module('app.common-services', [])
  .service({
    httpRequestService,
  })
  .name;

export default commonServicesModule;
