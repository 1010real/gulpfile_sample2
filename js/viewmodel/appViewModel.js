module.exports = function (params) {
  var self = this;

  // ページ情報
  self.page = ko.observable({
    componentName: "creatorInfo",
    params: {}
  });

  // ページを変更
  self.setContent = function(componentName, params) {
    var tmpStatus = self.page();
    tmpStatus.componentName = componentName;
    if (typeof params != 'undefined') {
      tmpStatus.params = params;
    }
    self.page(tmpStatus);

    setHeader(componentName, params);
  }

  // CalendarMenuの表示修正
  function setHeader(componentName, params) {
    $.Tagtag.KoInstance.headerMenu.promise.always(function(){
      switch(componentName) {
        case 'creatorInfo':
          if (typeof params.date === 'undefined') {
            $.Tagtag.KoInstance.headerMenu.instance.setCalendarText('today');
          } else {
            $.Tagtag.KoInstance.headerMenu.instance.setCalendarText('');
          }
          break;
        case 'weekList':
          $.Tagtag.KoInstance.headerMenu.instance.setCalendarText('week');
          break;
        case 'monthList':
          $.Tagtag.KoInstance.headerMenu.instance.setCalendarText('month');
          break;
        default:
          $.Tagtag.KoInstance.headerMenu.instance.setCalendarText('');
      }
    });
  }

  // ログイン情報とかユーザ情報とかお気に入り情報もここに保持する予定
};