var _JSSDK = {
  init: function (next) {
      if (!document.querySelector('script[src="'+_Utils.url.jssdkUrl+'"]')) {
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.onload = script.onreadystatechange = function() {
              if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                  // Handle memory leak in IE
                  script.onload = script.onreadystatechange = null;
                  _JSSDK.jssdkAutor(next);
              }
          };
          script.src = _Utils.url.jssdkUrl;
          var head = document.getElementsByTagName('head')[0];
          head.appendChild(script);
      } else {
          _JSSDK.jssdkAutor(next);
      }
  },
  jssdkAutor:function(next){ //jssdk鉴权
      onekit.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wxf8b4f85f3a794e77',
          timestamp: (new Date()).valueOf(),
          nonceStr: '9hKgyCLgGZOgQmEI',
          signature: 'bf7a5555f9ad0e7e491535f232349a40510a6f8f',
          jsApiList: [ // 必填，需要使用的JS接口列表
              {
                  jsMethodName: 'showToast',
                  nativeName: 'Interactivity.showToast'
              },
              {
                  jsMethodName: 'showLoading',
                  nativeName: 'Interactivity.showLoading'
              },
              {
                  jsMethodName: 'hideLoading',
                  nativeName: 'Interactivity.hideLoading'
              },
              {
                  jsMethodName: 'showModal',
                  nativeName: 'Interactivity.showModal'
              },
              //界面 导航栏
              {
                  jsMethodName: 'showShareMenu',
                  nativeName: 'Navigation.showShareMenu'
              },
              {
                  jsMethodName: 'hideShareMenu',
                  nativeName: 'Navigation.hideShareMenu'
              },
              {
                  jsMethodName: 'showNavigationBar',
                  nativeName: 'Navigation.showNavigationBar'
              },
              {
                  jsMethodName: 'hideNavigationBar',
                  nativeName: 'Navigation.hideNavigationBar'
              },
              {
                  jsMethodName: 'setNavigationBar',
                  nativeName: 'Navigation.setNavigationBar'
              },
              {
                  jsMethodName: 'closeWindow',
                  nativeName: 'Navigation.closeWindow'
              },
              {
                  jsMethodName: 'openNewWindow',
                  nativeName: 'Navigation.openNewWindow'
              },
              {
                  jsMethodName: 'getSystemInfo',
                  nativeName: 'SystemInfo.getSystemInfo'
              },
              {
                  jsMethodName: 'getNetworkType',
                  nativeName: 'SystemInfo.getNetworkType'
              },
              {
                  jsMethodName: 'setClipboardData',
                  nativeName: 'SystemInfo.setClipboardData'
              },
              {
                  jsMethodName: 'getClipboardData',
                  nativeName: 'SystemInfo.getClipboardData'
              },
              {
                  jsMethodName: 'setScreenBrightness',
                  nativeName: 'SystemInfo.setScreenBrightness'
              },
              {
                  jsMethodName: 'getScreenBrightness',
                  nativeName: 'SystemInfo.getScreenBrightness'
              },
              {
                  jsMethodName: 'setKeepScreenOn',
                  nativeName: 'SystemInfo.setKeepScreenOn'
              },
              {
                  jsMethodName: 'vibrateLong',
                  nativeName: 'SystemInfo.vibrateLong'
              },
              {
                  jsMethodName: 'vibrateShort',
                  nativeName: 'SystemInfo.vibrateShort'
              },
              {
                  jsMethodName: 'scanCode',
                  nativeName: 'SystemInfo.scanCode'
              },
              {
                  jsMethodName: 'sendAction',
                  nativeName: 'SystemInfo.sendAction'
              },
              //第三方
              {
                  jsMethodName: 'shareAppMessage',
                  nativeName: 'Social.shareAppMessage'
              },
              {
                  jsMethodName: 'launchMiniProgram',
                  nativeName: 'Social.launchMiniProgram'
              },
              {
                  jsMethodName: 'shareMiniProgramMessage',
                  nativeName: 'Social.shareMiniProgramMessage'
              },
              {
                  jsMethodName: 'startPay',
                  nativeName: 'Social.startPay'
              },
              //音频
              {
                  jsMethodName: 'startRecord',
                  nativeName: 'Audio.startRecord'
              },
              {
                  jsMethodName: 'stopRecord',
                  nativeName: 'Audio.stopRecord'
              },
              //位置
              {
                  jsMethodName: 'getLocation',
                  nativeName: 'Location.getLocation'
              },
              //数据缓存
              {
                  jsMethodName: 'getStorage',
                  nativeName: 'Storage.getStorage'
              },
              {
                  jsMethodName: 'setStorage',
                  nativeName: 'Storage.setStorage'
              },
              //媒体
              {
                  jsMethodName: 'chooseImage',
                  nativeName: 'Media.chooseImage'
              },
              //用户接口 
              {
                  jsMethodName: 'toLogin',
                  nativeName: 'Interface.toLogin'
              },
              {
                  jsMethodName: 'checkLogin',
                  nativeName: 'Interface.checkLogin'
              },
              {
                  jsMethodName: 'getClientToken',
                  nativeName: 'Interface.getClientToken'
              },
              {
                  jsMethodName: 'getAccountInfo',
                  nativeName: 'Interface.getAccountInfo'
              },
               //扩展接口
              {
                  jsMethodName: 'runEcloudAction',
                  nativeName: 'Cloud189App.runClientAction'
              },
              {
                  jsMethodName: 'getEcloudValue',
                  nativeName: 'Cloud189App.getClientValue'
                  // jsMethodName: 'getEcloudValue',
                  // nativeName: 'Cloud189App.getClientValue'
              }
          ]
      });
      var isAndroid811 =_Utils.client.isAndroid && _Utils.client.compareVersion(_Utils.client.sdkVersion,'8.1.1') >-1;
      var isiOS810 = _Utils.client.isIOS && _Utils.client.compareVersion(_Utils.client.sdkVersion,'8.1.0') >-1;
      if(isAndroid811 || isiOS810){
        onekit.ready(function(){
            console.log("ready() ======================== ");
            timer1 && clearTimeout(timer1);
            next();
        });
      }else{ //8.1.1 之前版本加上延迟1000
        timer1 && clearTimeout(timer);
        var timer1 = setTimeout(function() {// 响应超时
            next();
        }, 1000);
      }
  },
  callJsApi:function(apiName, options) {
    var isAndroid811 =_Utils.client.isAndroid && _Utils.client.compareVersion(_Utils.client.sdkVersion,'8.1.1') >-1;
    var isiOS810 = _Utils.client.isIOS && _Utils.client.compareVersion(_Utils.client.sdkVersion,'8.1.0') >-1;
    // console.log("客户端版本",_Utils.client.sdkVersion);
    // console.log("客户端版本Android ========小于8.1.1",isAndroid811);
    // console.log("客户端版本iOS========小于8.1.0",isiOS810);
    if(!isAndroid811||!isiOS810){
        onekit[apiName](options);
    }else{
        onekit.checkJsApi({ // onekit-JsApi检查JS接口是否支持
            jsApiList: [apiName],
            success: function(res) {
                console.log("in callJsApi success()",JSON.stringify(res));
                console.log("in callJsApi success()", res.checkResult[apiName]);
                if (res.checkResult[apiName]) { // 当前环境支持调用该方法
                    onekit[apiName](options);
                }else{
                  options.fail({
                      res_code : '-10000',
                      msg : 'oneKit不存在'+apiName+'方法'
                  });
                }
            },
            fail: function(res) {
                options.fail({
                    res_code : '-10000',
                    msg : 'oneKit不存在'+apiName+'方法'
                });
            }
        });
    }
  },
  jssdkShare:function(options){//jssdk分享方法
      console.log("shareAppMessage:"+JSON.stringify(options));
      //判断安卓不同版本下使用不同分享
      var isAndroid811 =_Utils.client.isAndroid && _Utils.client.compareVersion(_Utils.client.sdkVersion,'8.1.1') >-1;
      var isiOS810 = _Utils.client.isIOS && _Utils.client.compareVersion(_Utils.client.sdkVersion,'8.1.0') >-1;
      var shareOptions = {
        cmd: 'setShareOptions',
        params: {
          title: shareOptions.title,
          description: shareOptions.description,
          thumbUrl: shareOptions.thumbUrl,
          shareUrl: shareOptions.shareUrl,
          taskId: shareOptions.taskId
        }
      }
      if(!isAndroid811||!isiOS810){
        _JSSDK.callJsApi('runClientAction',{
            cmd: 'setShareOptions',
            params: {
                title: options.pageTitle,
                description: options.shareDesc,
                thumbUrl: options.shareImg,
                shareUrl: options.shareLink,
                taskId: ''
            },
            success : function(res){
            },
            fail : function(res){//TODO 唤起失败，也通知后台
            },
            complete: function(res){ //兼容旧版，可以调用complete
            }
          });
      }else{
        onekit.shareAppMessage({
            title: options.pageTitle, // 分享主题
            desc: options.shareDesc, // 分享描述
            link: options.shareLink, // 分享链接
            imgUrl: options.shareImg, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则 要提供数据链接，默认为空
            toClient: ['wechat', 'yixin', 'qq', 'sina'], // “wechat”:微信,“yixin”:易信,“qq”:QQ,“sina”:新浪微博 ,默认为空，由客户端提供选择框供用户选择；当数组只有一个值，则直接分享到客户端，如[‘wechat’],代表直接分享到微信；当大于1时，如[‘wechat’,’qq’]则，仅仅弹出微信与qq的选择分享框
            success: function(data) {
                console.log("oneKit分享成功")
                next({
                    resultCode: validateResult.successResultCode,
                    data : data
                });
            },
            fail: function(data) {
                console.log("oneKit分享失败")
                next({
                    resultCode: 10001,//方法具体错误码定为10001
                    data:data
                });
            }
        });
      }
  },
  jssdkInitShare:function(options){// jssdk展示分享图标
    //   options = shareOptions;
      console.log("showShareMenu:"+JSON.stringify(options));
      onekit.showShareMenu({
          title: options.pageTitle, // 分享主题
          desc: options.shareDesc, // 分享描述
          link: options.shareLink, // 分享链接
          imgUrl: options.shareImg, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则 要提供数据链接，默认为空
          toClient: ['wechat', 'yixin', 'qq', 'sina'], // “wechat”:微信,“yixin”:易信,“qq”:QQ,“sina”:新浪微博 ,默认为空，由客户端提供选择框供用户选择；当数组只有一个值，则直接分享到客户端，如[‘wechat’],代表直接分享到微信；当大于1时，如[‘wechat’,’qq’]则，仅仅弹出微信与qq的选择分享框
          success: function(data) {
            console.log("oneKit展示分享成功")
          },
          fail: function(data) {
            console.log("oneKit展示分享失败")
          }
      });
  }
}