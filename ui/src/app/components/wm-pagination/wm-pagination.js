
class WmPagination {

  constructor($scope, $log) {
    'ngInject';

    this.$scope = $scope;
    this.$log = $log;
  }

  $onInit() {
    this.$log.debug('OnInit Called');
  }

  $onChanges(changes) {
    this.$log.debug('OnChange parameter : ', changes);
  }

}


const component = {
  // restrict: 'E',
  bindings: {
    mode: '<'
  },
  // template: template,
  templateUrl: require('./wm-pagination.html'),
  controller: WmPagination,
  controllerAs: 'vm'
};

const module = angular.module('wm.components', [])
  .component('wmPagination', component).name;

export default module;
