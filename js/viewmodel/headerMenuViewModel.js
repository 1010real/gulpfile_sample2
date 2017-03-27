module.exports = function (params) {
  var self = this;

  var $gmenu = $('#gmenu');

// グローバルメニュー設定
  // _dom:undefined,
  // init:function(){
  //   var self = this;
  //   var touchEvent = $.Tagtag.Util.getTouchEvent();
  //   this._dom = {
  //     gmenuBtn:$('#gmenuBtn'),
  //     gmenu:$('#gmenu'),
  //   }
  //   this._dom.gmenuBtn.on(touchEvent['touchstart'], function(){
  //     if (self._dom.gmenu.hasClass('hide')) {
  //       self._dom.gmenu.removeClass('hide');
  //     } else {
  //       self._dom.gmenu.addClass('hide');
  //     }
  //   });
  //   console.log('gmenu ok!');
  // }

  // ページの表示状態
  self.status = ko.observable({
    showMenu:false,
    showCalendarMenu:false,
    hideCalendarMenu:false,
    calendarMenuText:'',
  });

  // メニューの表示・非表示切り替え
  self.toggleMenu = function() {
    var tmpStatus = self.status();
    tmpStatus.showMenu = !tmpStatus.showMenu;
    self.status(tmpStatus);
  }

  // カレンダーメニューの表示・非表示きりかえ
  self.toggleCalendar = function() {
    var tmpStatus = self.status();
    tmpStatus.showCalendarMenu = !tmpStatus.showCalendarMenu;
    tmpStatus.hideCalendarMenu = !tmpStatus.showCalendarMenu;
    self.status(tmpStatus);
  }

  // カレンダーメニューのリセット
  self.resetCalendar = function() {
    var tmpStatus = self.status();
    tmpStatus.showCalendarMenu = false;
    tmpStatus.hideCalendarMenu = false;
    self.status(tmpStatus);
  }

  // カレンダーメニューのテキストきりかえ
  self.setCalendarText = function(text) {
    var tmpStatus = self.status();
    tmpStatus.calendarMenuText = text;
    self.status(tmpStatus);
  }

  // カレンダーメニューを選択した際の挙動
  self.loadPageCalendar = function(module, event) {
    event.preventDefault();
    var $target = $(event.currentTarget);
    (function() {
      var def = $.Deferred();
      $target.parent().on('webkitAnimationEnd', function(){
        $target.parent().off('webkitAnimationEnd');
        def.resolve();
      });
      self.setCalendarText($target.data('menuText'));
      self.toggleCalendar();
      return def.promise();
    })().then(function(){
      page($target.data('href'));
      // location.href = $target.data('href');
      self.resetCalendar();
    });
  }

  // 左上メニューを選択した際の挙動
  self.loadPageMenu = function(module, event) {
    event.preventDefault();
    var $target = $(event.currentTarget);
    (function() {
      var def = $.Deferred();
      $gmenu.on('webkitTransitionEnd', function(){
        $gmenu.off('webkitTransitionEnd');
        def.resolve();
      });
      self.toggleMenu();
      return def.promise();
    })().then(function(){
      page($target.data('href'));
      // location.href = $target.data('href');
    });
  }

  $.Tagtag.KoInstance.headerMenu.instance = self;
  $.Tagtag.KoInstance.headerMenu.def.resolve();
}