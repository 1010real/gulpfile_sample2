module.exports = function (params) {
  var self = this;
  var paramsApi = { type: 'month' };

  // シャツ、クリエイターのデータの配列
  self.monthList = ko.observable();

  // ページの表示状態
  // self.status = ko.observable({
  //   showDetail:false,
  // });

  // // 指定した月の表示に切り替える
  // self.showSelectMonth = function(yearmonth) {
  //   // $.get('http://localhost/api.php', { type: 'month', 'yearmonth':yearmonth }, self.monthList);
  //   $.get($.Tagtag.Config.apiDomain + '/api/shirts', { type: 'month', 'yearmonth':yearmonth }, self.monthList);
  //   // $.get('http://192.168.128.100/api.php', { 'type': 'month', 'yearmonth':yearmonth }, self.monthList);
  //  }

  // // 簡易表示に切り替える
  // self.hideDetail = function() {
  //     var tmpStatus = self.status();
  //     tmpStatus.showDetail = false;
  //     self.status(tmpStatus);
  // }

  // 初期データロード
  if (typeof params.yearmonth !== 'undefined') {
    paramsApi.yearmonth = params.yearmonth;
  }
  // $.get('http://localhost/api.php', { type: 'month' }, self.monthList);
  $.get($.Tagtag.Config.apiDomain + '/api/shirts', paramsApi, self.monthList);
  // $.get('http://tagtag.lab.local/api.php', { type: 'month' }, self.monthList);
  // $.get('http://192.168.128.100/api.php', { type: "month" }, self.monthList); // 端末テスト時（localhost配下にapi.phpをコピーする必要あり）
}