// メインjs
(function() {
  window.addEventListener('load', function() {
    // 共通初期設定（カスタムバインディングの設定含む）
    var common = require('./common');

    // componentの登録
    var register = require('./register');
    register();

    // アプリケーション全体で使用するViewModelを$rootとして設定
    var app = require('./viewmodel/appViewModel.js');
    var appInstance = new app();

    // ルーティング
    var routing = require('./routing');
    routing(appInstance);

    ko.applyBindings(appInstance);
  });
})();
