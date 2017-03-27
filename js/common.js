// 共通的に使うライブラリ
// どこからでも呼び出せるようにjQueryオブジェクトに紐付け
$.Tagtag = {
    KoInstance: {
      headerMenu:{ instance:null }
    },
    Config: {
      'apiDomain':'http://tagtag.tokyo',
    },
    Util:{
      // touchイベントの有無によって、使用できるイベント名オブジェクトで返却
      getTouchEvent: function(){
        if ('ontouchstart' in window) {
          return {
            "touchstart":"touchstart",
            "touchend":"touchend",
            "touchmove":"touchmove",
            "touchcancel":"touchcancel",
          };
        } else {
          return {
            "touchstart":"mousedown",
            "touchend":"mouseup",
            "touchmove":"mousemove",
            "touchcancel":"mouseup",
          };
        }
      }
    }
};

if (typeof _Config !== 'undefined') {
  $.extend($.Tagtag.Config, _Config);
}

// Deferred設定
for(var key in $.Tagtag.KoInstance) {
  $.Tagtag.KoInstance[key].def = $.Deferred();
  $.Tagtag.KoInstance[key].promise = $.Tagtag.KoInstance[key].def.promise();
}

// touchendとclickを環境により判別してバインドするカスタムバインディング
ko.bindingHandlers['touch'] = {
  init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
    var $el = $(element);
    if ('ontouchstart' in window) {
      var srcYOffset = null;

      // タッチスタート時に、元々のY座標を取得
      $el.on("touchstart", function(){
        srcYOffset = window.pageYOffset;
      });

      // タッチエンド
      $el.on("touchend", function(){
        var destYOffset = window.pageYOffset;

        if (srcYOffset === destYOffset) {
          var handlerFunction = valueAccessor();

          viewModel = bindingContext['$data'];

          handlerReturnValue = handlerFunction.apply(viewModel, arguments);
        }
      });
    } else {
      $el.click(function(){
        var handlerFunction = valueAccessor();

        viewModel = bindingContext['$data'];

        handlerReturnValue = handlerFunction.apply(viewModel, arguments);
      });
    }
  }
};

module.exports = $.Tagtag;
