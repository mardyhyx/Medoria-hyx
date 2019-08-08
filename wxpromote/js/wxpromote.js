var pageTitle = '墙裂推荐一个云盘小程序！';
 var shareTitle = '墙裂推荐一个云盘小程序！';
 var shareDesc = '高速上传微信文件，亲友分享无需等待！';
 var shareOptions = {
   pageTitle: pageTitle,
   shareTitle: shareTitle,
   shareDesc: shareDesc,
   shareImg: 'https://m.cloud.189.cn/zhuanti/2019/wxpromote/images/share-img.png',
   shareLink: "https://m.cloud.189.cn/zhuanti/2019/wxpromote/index.html"
 };
 if (_Utils.client.isWX) {
   shareOptions.shareImg = "https://m.cloud.189.cn/zhuanti/2019/wxpromote/images/wxshare-img.jpg";
   _WXShare.init(function () {
     _WXShare.wxInitShare(shareOptions)
   }); //微信分享
 }
 console.log("_Utils.client.isJSSDK()", _Utils.client.isJSSDK());
 if (_Utils.client.isJSSDK()) { //云盘内部分享
  shareOptions.shareImg = "https://m.cloud.189.cn/zhuanti/2019/wxpromote/images/share-img.png";
   _JSSDK.init(function () {
     _JSSDK.jssdkInitShare(shareOptions);
   });
 }