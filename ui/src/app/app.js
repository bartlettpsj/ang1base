// import "jQuery";
import angular from 'angular';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'angular-ui-bootstrap';
import '../style/app.css';
import commonServices from './services/common-services';
import 'angular-ui-router';
import moment from "moment";

import page1Controller from './pages/page1.js';
import page1Template from './pages/page1.html';

// Bootstrap the app via app controller

class AppController {
  constructor(httpRequestService, $scope) {
    'ngInject';
  }
}

// Define the angular module with dependencies
const MODULE_NAME = 'app';


angular.module(MODULE_NAME, [commonServices, 'ui.router', 'ui.bootstrap', 'wm.components'])

  .controller('AppCtrl', AppController)

  // Define states
  .config(function($stateProvider, $urlRouterProvider) {

    // Home
    $urlRouterProvider.when('', 'pages');

    // The unknown
    $urlRouterProvider.otherwise('/404');

    $stateProvider.state({
      name: '404',
      url: '/404',
      templateUrl: require('./system/404.html')
    });

    $stateProvider.state({
      name: 'pages',
      url: '/pages',
      templateUrl: page1Template,
      controller: page1Controller,
      controllerAs: 'vm'
    });

  })

  // Define filters
  .filter('dateToNow', () => date => moment(date).fromNow())
  .filter('dateTime', () => date => moment(date).format('LLL'))


  // todo... make this work without webpack-dev-server, need server redirects
  // .config(["$locationProvider", function($locationProvider) {
  //   $locationProvider.html5Mode(true);
  //  }]);

  .run(["$templateCache", function ($templateCache) {
    // $templateCache.removeAll(); // ("uib/template/pagination/pagination.html");
    //
    // $templateCache.put("uib/template/pagination/pagination.html",
    //   "<li role=\"menuitem\" ng-if=\"::boundaryLinks\" ng-class=\"{disabled: noPrevious()||ngDisabled}\" class=\"pagination-first\"><a href ng-click=\"selectPage(1, $event)\" ng-disabled=\"noPrevious()||ngDisabled\" uib-tabindex-toggle>{{::getText('first')}}</a></li>\n" +
    //   "<li role=\"menuitem\" ng-if=\"::directionLinks\" ng-class=\"{disabled: noPrevious()||ngDisabled}\" class=\"pagination-prev\"><a href ng-click=\"selectPage(page - 1, $event)\" ng-disabled=\"noPrevious()||ngDisabled\" uib-tabindex-toggle>{{::getText('previous')}}</a></li>\n" +
    //   "<li role=\"menuitem\" ng-repeat=\"page in pages track by $index\" ng-class=\"{active: page.active,disabled: ngDisabled&&!page.active}\" class=\"pagination-page page-item\"><a href ng-click=\"selectPage(page.number, $event)\" ng-disabled=\"ngDisabled&&!page.active\" ng-class=\"page-link\" uib-tabindex-toggle>{{page.text}}</a></li>\n" +
    //   "<li role=\"menuitem\" ng-if=\"::directionLinks\" ng-class=\"{disabled: noNext()||ngDisabled}\" class=\"pagination-next\"><a href ng-click=\"selectPage(page + 1, $event)\" ng-disabled=\"noNext()||ngDisabled\" uib-tabindex-toggle>{{::getText('next')}}</a></li>\n" +
    //   "<li role=\"menuitem\" ng-if=\"::boundaryLinks\" ng-class=\"{disabled: noNext()||ngDisabled}\" class=\"pagination-last\"><a href ng-click=\"selectPage(totalPages, $event)\" ng-disabled=\"noNext()||ngDisabled\" uib-tabindex-toggle>{{::getText('last')}}</a></li>\n" +
    //   "");

    // $templateCache.remove("uib/template/pagination/pagination.html");


  }]);


export default MODULE_NAME;
