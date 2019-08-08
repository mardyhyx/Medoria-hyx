var _WXShare = {
    init:function(next){
        if (!document.querySelector('script[src="'+_Utils.url.wxsdkUrl+'"]')) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.onload = script.onreadystatechange = function() {
                if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                    script.onload = script.onreadystatechange = null;
                    _WXShare.wxAuthor(next);
                }
            };
            script.src = _Utils.url.wxsdkUrl;
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(script);
        } else {
            _WXShare.wxAuthor(next);//微信鉴权
        } 
    },
    wxAuthor:function(next){
        $.ajax({
            async: false,
            url: _Utils.url.wxAuthor,
            type: 'GET',
            data: {
              url: encodeURIComponent(window.location.href)
            },
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            beforeSend: function beforeSend(XMLHttpRequest) {
                XMLHttpRequest.withCredentials = true;
            },
            success: function(json) {
                try {
                    var signature = json.signature;
                    var noncestr = json.nonceStr;
                    var timestamp = json.timeStr;
                    wx.config({
                        debug: false,
                        appId: "wxe632d63bbcfe4e6c",
                        timestamp: timestamp,
                        nonceStr: noncestr,
                        signature: signature,
                        jsApiList: [
                            'updateTimelineShareData ',
                            'updateAppMessageShareData', 
                            'onMenuShareAppMessage', 
                            'onMenuShareTimeline', 
                            'onMenuShareWeibo', 
                            'onMenuShareQQ', 
                            'onMenuShareQZone'
                        ]
                    });
                    wx.ready(function() {
                        timer1 && clearTimeout(timer1);
                        if(next && typeof(next)==='function'){
                            next()
                        }
                        //_WXShare.wxShare(options);
                    });
                    var timer1 = setTimeout(function() {// 响应超时
                    }, 2000);
                } catch (e) {
                    console.log("微信鉴权响应参数有误!");
                }
            },
            fail: function() {
                console.log("微信鉴权接口fail!");
            }
        });
    },
    wxInitShare: function (options) { //微信分享方法
        // options = shareOptions;
        if(_Utils.client.isWX){
            console.log("_WXShare.wxShare()"+JSON.stringify(options));
            wx.updateTimelineShareData({
                title: options.shareTitle,
                desc: options.shareDesc,
                link: options.shareLink,
                imgUrl: options.shareImg
            });
            wx.updateAppMessageShareData({
                title: options.shareTitle,
                desc: options.shareDesc,
                link: options.shareLink,
                imgUrl: options.shareImg
            });
            wx.onMenuShareAppMessage({
                title: options.shareTitle,
                desc: options.shareDesc,
                link: options.shareLink,
                imgUrl: options.shareImg
            });
            wx.onMenuShareTimeline({
                title: options.shareTitle,
                desc: options.shareDesc,
                link: options.shareLink,
                imgUrl: options.shareImg
            });
            wx.onMenuShareWeibo({
                title: options.shareTitle,
                desc: options.shareDesc,
                link: options.shareLink,
                imgUrl: options.shareImg
            });
            wx.onMenuShareQQ({
                title: options.shareTitle,
                desc: options.shareDesc,
                link: options.shareLink,
                imgUrl: options.shareImg
            });
            wx.onMenuShareQZone({
                title: options.shareTitle,
                desc: options.shareDesc,
                link: options.shareLink,
                imgUrl: options.shareImg
            });
        }
    }
  }