// 工具类对象

var ua = window.navigator.userAgent.toLowerCase();//UA 字符串
var _Utils = {
    url:{
      jssdkUrl: '//m.cloud.189.cn/zhuanti/2019/ecloud8/lib/jssdk/jok-0.0.2.js',
      wxsdkUrl :  '//m.cloud.189.cn/zhuanti/2019/ecloud8/lib/jssdk/jweixin-1.4.0.js',
      wxAuthor : '//event.21cn.com/api/v1/wxin/getSign2.do'
    },
    ajax: function (options) {
      options = options || {}
      options.type = (options.type || 'GET').toUpperCase()
      options.dataType = options.dataType || 'json'
      var params = formatParams(options.data)
      var xhr = new XMLHttpRequest()
      //接收 - 第三步
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          var status = xhr.status
          if (status >= 200 && status < 300) {
            options.success && options.success(JSON.parse(xhr.responseText), xhr.responseXML)
          } else {
            options.fail && options.fail(status)
          }
        }
      }
  
      //连接 和 发送 - 第二步
      if (options.type == 'GET') {
        xhr.open('GET', options.url + '?' + params, true)
        xhr.send(null)
      } else if (options.type == 'POST') {
        xhr.open('POST', options.url, true)
        //设置表单提交时的内容类型
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(params)
      }
  
      function formatParams(data) {
        var arr = []
        for (var name in data) {
          arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]))
        }
        arr.push(('noCache=' + Math.random()).replace('.', ''))
        return arr.join('&')
      }
    },
    client : {//端判断
        isAndroid: /android/i.test(ua),
        isIOS: /(iphone|ipad|ipod|ios)/i.test(ua),
        isEcloud: /ecloud/i.test(ua),
        isFcloud: /familycloud/i.test(ua),
        isWX: /micromessenger/.test(ua),
        isQQ: /mobile mqqbrowser/.test(ua) || /mobile[/][\s\S]+qq/.test(ua),
        isQzone: /qzone/.test(ua),
        isQQBrowser: /mqqbrowser[/]([0-9][.][0-9]|[0-9][.][0-9][.][0-9]|[0-9][.][0-9][.][0-9][.][0-9]) mobile/.test(ua),
        isAlipay: /alipayclient/i.test(ua),
        isMobile: /AppleWebKit.*Mobile.*/.test(ua),
        //UA: Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60 Ecloud/7.4.0 iOS/10.3.3 clientId/767f27242b19970981d09e7676119d78a1e29ac6 clientModel/iPhone proVersion/1.0.5
        // IOS 7.4 接入onekit
        // Android 7.5  接入onekit
        sdkVersion: /(ecloud)\D+(\d[\d.]*)/i.test(ua) ? RegExp.$2 : '',
        compareVersion: function(v1, v2) {
            v1 = v1.split('.')
            v2 = v2.split('.')
            const len = Math.max(v1.length, v2.length)
            while (v1.length < len) {
              v1.push('0')
            }
            while (v2.length < len) {
              v2.push('0')
            }
            for (var i = 0; i < len; i++) {
              const num1 = parseInt(v1[i])
              const num2 = parseInt(v2[i])
              if (num1 > num2) {
                return 1
              } else if (num1 < num2) {
                return -1
              }
            }
            return 0
        },
        isJSSDK: function(){//是否JSSDK 条件1： 是客户端ua  条件二: ios版本大于7.4.0 安卓版本大于7.5.0
            var isClient = _Utils.client.isEcloud|| _Utils.client.isFcloud;
            var iosOneKitVersion = _Utils.client.isIOS && _Utils.client.compareVersion(_Utils.client.sdkVersion,'7.4.0')>0;
            var androidOneKitVersion = _Utils.client.isAndroid && _Utils.client.compareVersion(_Utils.client.sdkVersion,'7.5.0')>0;
            // alert("iosOneKitVersion:"+ iosOneKitVersion);
            // alert("androidOneKitVersion:"+ androidOneKitVersion);
            // alert("isJSSDK:"+isClient && (iosOneKitVersion || androidOneKitVersion));
            // console.log();
            return isClient && (iosOneKitVersion || androidOneKitVersion);
        }
    },
    jssdkErrorCode:{
        '10000': '成功',
        '-10000':'方法不存在',
        '10001': '能力方法方法执行错误'
    },
    shareImageURL:function(){
        return "https://m.cloud.189.cn/zhuanti/2019/ecloud8/img/share.jpg";
    },
    checkEmpty: function(value){
      var _val = value.replace(/\s+/g, '');
      return _val.length > 0;
    },
    queryString : function(key) {
        var url = document.location;
        if (key) {
            return (url.search.match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || ['', null])[1];
        } else {
            var params = url.search,
                reg = /(?:^\?|&)(.*?)=(.*?)(?=&|$)/g,
                temp, args = {};
            while ((temp = reg.exec(params)) != null) args[temp[1]] = decodeURIComponent(temp[2]);
            return args;
        }
    },
    formatUserAccount: function (account) {
      var reg = /^(13|14|15|16|17|18|19)+[0-9]{9}$/;
      var phone = account.slice(0, 11);
      if (reg.exec(phone)) {
        return account.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
      }
      return account;
    }
};


