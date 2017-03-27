// componentの登録
module.exports = function(){
  ko.components.register('headerMenu', {
      viewModel: require('./viewmodel/headerMenuViewModel'),
      template: require('../template/headerMenu.html')
  });
  ko.components.register('creatorInfo', {
      viewModel: require('./viewmodel/creatorInfoViewModel'),
      template: require('../template/creatorInfo.html')
  });
  ko.components.register('weekList', {
      viewModel: require('./viewmodel/weekListViewModel'),
      template: require('../template/weekList.html')
  });
  ko.components.register('monthList', {
      viewModel: require('./viewmodel/monthListViewModel'),
      template: require('../template/monthList.html')
  });
  ko.components.register('transaction', {
      viewModel: require('./viewmodel/transactionViewModel'),
      template: require('../template/transaction.html')
  });
  ko.components.register('policy', {
      viewModel: require('./viewmodel/policyViewModel'),
      template: require('../template/policy.html')
  });
  ko.components.register('error', {
      viewModel: require('./viewmodel/errorViewModel'),
      template: require('../template/error.html')
  });
}
