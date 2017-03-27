module.exports = function (params) {
  var self = this;
  var paramsApi = { type: "oneday" };

  // シャツ、クリエイターのデータ
  self.creatorData = ko.observable();

  // ページの表示状態
  self.status = ko.observable({
    showDetail:false,
  });

  // 背景指定用styleの生成（前面）
  self.displayColorBackgroundFore = ko.computed(function() {
    try{
      if (self.status().showDetail) {
        return "rgba(" + self.creatorData().colorBackground + ",0.5)";
      } else {
        return "rgba(" + self.creatorData().colorBackground + ",0)";
      }
    }catch(e){
      return "";
    }
  }, self);

  // 背景指定用styleの生成（背面）
  self.displayColorBackgroundBack = ko.computed(function() {
    try{
      if (self.status().showDetail) {
        return "rgba(" + self.creatorData().colorBackground + ",0.5)";
      } else {
        return "rgba(" + self.creatorData().colorBackground + ",1)";
      }
    }catch(e){
      return "";
    }
  }, self);

  // 詳細表示に切り替える
  self.showDetail = function() {
      var tmpStatus = self.status();
      tmpStatus.showDetail = true;
      self.status(tmpStatus);
  }

  // 簡易表示に切り替える
  self.hideDetail = function() {
      var tmpStatus = self.status();
      tmpStatus.showDetail = false;
      self.status(tmpStatus);
  }

  // 表示切り替え
  self.toggleDetail = function() {
      var tmpStatus = self.status();
      tmpStatus.showDetail = !tmpStatus.showDetail;
      self.status(tmpStatus);
  }

  // 初期データロード
  if (typeof params.date !== 'undefined') {
    paramsApi.date = params.date;
  }
  // $.get('http://localhost/api.php', paramsApi, self.creatorData);
  $.get($.Tagtag.Config.apiDomain + '/api/shirts', paramsApi, self.creatorData);
  // $.get('http://tagtag.lab.local/api.php', { type: "creator" }, self.creatorData);
  // $.get('http://192.168.128.100/api.php', { type: "creator" }, self.creatorData); // 端末テスト時（localhost配下にapi.phpをコピーする必要あり）
}