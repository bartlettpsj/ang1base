const API_PORT = 3200;
const API_ENDPOINT = 'api';

/**
 * Service for access remote Restful services over http.
 */
class HttpRequestService {

  constructor($http, $log, $location) {
    'ngInject';

    this.$http = $http;
    this.$log = $log;

    // points to same host, but needs to be parameterized build for API location
    this.apiRoute = $location.protocol() + '://' +  $location.host() + ':' + API_PORT + '/' + API_ENDPOINT;

    $log.debug('http service initialized:- ' + this.apiRoute);
  }

  /**
   * GET: single item identified by id from endpoint.
   *
   * @param endPoint
   * @param id
   * @returns {angular.IPromise<any> | Promise<T> | * | Promise<T | never>}
   */
  getDataById(endPoint, id) {
    return this.$http({
      method: 'GET',
      url: `${this.apiRoute}/${endPoint}/${id}`,
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.data)
    .catch(error => this.$log.error('http-request-service - getDataById() failed!', error));
  }

  /**
   * GET: data using parameter from endpoint.
   *
   * @param endPoint
   * @param params
   * @returns {angular.IPromise<any> | Promise<T> | * | Promise<T | never>}
   */
  getData(endPoint, params = null) {
    return this.$http({
      method: 'GET',
      url: `${this.apiRoute}/${endPoint}`,
      headers: {
        'Content-Type': 'application/json'
      },
      params: params ? {params} : {}
    }).then(response => response.data)
      .catch(error => this.$log.error('http-request-service - getData() failed!'));
  }

  /**
   * PUT: data to endpoint.
   *
   * @param endPoint
   * @param data
   * @returns {angular.IPromise<any> | Promise<T> | * | Promise<T | never>}
   */
  putData(endPoint, data) {
    return this.$http({
      method: 'PUT',
      url: `${this.apiRoute}/${endPoint}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }).then(response => response)
      .catch(error => {
        this.$log.error('http-request-service - putData() failed!', error);
      });
  }

  /**
   * DELETE: single entry identified by id.
   *
   * @param endPoint
   * @param id
   * @returns {angular.IPromise<any> | Promise<T> | * | Promise<T | never>}
   */
  deleteDataById(endPoint, id) {
    return this.$http({
      method: 'DELETE',
      url: `${this.apiRoute}/${endPoint}/${id}`,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response)
      .catch(error => {
        this.$log.error('http-request-service - deleteDataById() failed!', error);
      });
  }

}

export default HttpRequestService;
