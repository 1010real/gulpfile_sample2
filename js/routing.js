// クライアントサイドルーティングの設定
module.exports = function(app){
  var routeMapping = {
    "/" : { componentName:"creatorInfo" },
    "/list/today" : { componentName:"creatorInfo" },
    "/list/week" : { componentName:"weekList" },
    "/list/month" : { componentName:"monthList" },
    "/list/month/:yearmonth" : { componentName:"monthList" },
    "/list/oneday/:date" : { componentName:"creatorInfo" },
    "/setting/transaction" : { componentName:"transaction" },
    "/setting/policy" : { componentName:"policy" },
    "/error" : { componentName:"error" },
  };

  // appViewModelのpageを書き換える
  function load(ctx, next) {
    var routeKey = ctx.path;
    // console.log(ctx);
    // Context {
    //   canonicalPath: "/base/list/today"
    //   hash: ""
    //   params: Object
    //   path: "/list/today"
    //   pathname: "/base/list/today"
    //   querystring: ""
    //   state: Object
    //   title: "tagtag"
    //   __proto__: Context
    // }

    // ここもっとうまくやりたい
    if (ctx.path.indexOf('/list/oneday/') != -1) {
      routeKey = "/list/oneday/:date";
    }

    if (ctx.path.indexOf('/list/month/') != -1) {
      routeKey = "/list/month/:yearmonth";
    }

    app.setContent(routeMapping[routeKey].componentName, ctx.params);
    next();
  };

  function notfound(ctx, next) {
    console.log('not found!');
    app.setContent(routeMapping['/error'].componentName, ctx.params);
    next();
  };

  function gaSend(){
    setTimeout(function(){
      // console.log('ga-send:' + location.pathname + location.search  + location.hash);
      ga('send', 'pageview', (location.pathname + location.search  + location.hash));
    }, 500);
  }

  // page.base('/base');
  page('/', load, gaSend)
  page('/list/today', load, gaSend);
  page('/list/week', load, gaSend);
  page('/list/month', load, gaSend);
  page('/list/month/:yearmonth', load, gaSend);
  page('/list/oneday/:date', load, gaSend);
  page('/setting/transaction', load, gaSend);
  page('/setting/policy', load, gaSend);
  page('*', notfound, gaSend);
  page({
    hashbang:true
  });
};