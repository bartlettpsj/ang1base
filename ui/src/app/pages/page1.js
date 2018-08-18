import _ from 'lodash';

import wmPagination from '../components/wm-pagination/wm-pagination';

/**
 * Handle list of notes.
 */
class PagesController {
  constructor($scope, $timeout, $stateParams, httpRequestService, $uibModal) {
    'ngInject';

    this.pagenumber = 1;
    this.httpRequestService = httpRequestService;
    this.$uibModal = $uibModal;
    this.loadNotes();

    this.paginationUrl = require('./test.html');
    console.log('test fiule is: ', this.paginationUrl);





  }

  getPaginationUrl(e,a) {
    console.log('getPaginationUrl');
    

  }

  /**
   * Load all notes on promise.
   *
   * @returns {*}
   */
  loadNotes() {
    return this.httpRequestService.getData('records').then(data => {
      this.records = data;
    });
  }

  /**
   * Show specified note for view/edit via modal and refresh on close.
   *
   * @param note
   */
  // showRecord(note) {
  //   const modalInstance = this.$uibModal.open({
  //    templateUrl: noteTemplate,
  //    controller: noteController,
  //    bindToController: true,
  //    controllerAs: 'vm',
  //    backdrop: 'static',
  //    size: 'lg'
  //   });
  //
  //   // Wait for completion then refresh
  //   modalInstance.result.then(result => {
  //     this.loadNotes();
  //   });
  // }

  /**
   * Set any item checked flag for UX enable/disable.
   */
  checkSelections() {
      this.hasSelected = _.some(this.records, 'selected');
  }

  /**
   * Get checked records and delete each via promise.all then refresh.
   */
  deleteSelections() {
    const promises = _.map(_.filter(this.records, 'selected'), record => this.httpRequestService.deleteDataById('records', record.id));

    Promise.all(promises).then(response => {
      this.loadRecords().then(response => {
        this.checkSelections();
      })
    })
  }
}

export default PagesController;
