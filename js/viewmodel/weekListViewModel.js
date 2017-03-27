module.exports = function (params) {
  var self = this;

  // シャツ、クリエイターのデータの配列
  self.creatorDataList = ko.observable();

  // ページの表示状態
  // self.status = ko.observable({
  //   showDetail:false,
  // });

  // // 詳細表示に切り替える
  // self.showLater = function() {
  //     var tmpStatus = self.status();
  //     tmpStatus.showDetail = true;
  //     self.status(tmpStatus);
  // }

  // // 簡易表示に切り替える
  // self.hideDetail = function() {
  //     var tmpStatus = self.status();
  //     tmpStatus.showDetail = false;
  //     self.status(tmpStatus);
  // }

  // 初期データロード
  // $.get('http://localhost/api.php', { type: "week" }, self.creatorDataList);
  $.get($.Tagtag.Config.apiDomain + '/api/shirts', { type: "week", order: "desc" }, self.creatorDataList);
  // $.get('http://tagtag.lab.local/api.php', { type: "week" }, self.creatorDataList);
  // $.get('http://192.168.128.100/api.php', { type: "week" }, self.creatorDataList); // 端末テスト時（localhost配下にapi.phpをコピーする必要あり）
}