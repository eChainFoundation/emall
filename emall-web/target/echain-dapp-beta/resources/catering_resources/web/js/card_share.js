 document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {

            window.shareData = {  
                "imgUrl": "http://imgcache.life.qq.com/www/misc/images/weixin_shop_logo/1620394988_share_150_150.png?update=1371612628", 
                "timeLineLink": "http://life.qq.com/qr/t13578029830381#wechat_redirect",
                "sendFriendLink": "http://life.qq.com/qr/f13578029830381#wechat_redirect",
                "weiboLink": "http://meishi.qq.com/weixin",
                "tTitle": "��ע�ɻ�á����͡�΢�����Ա��",
                "tContent": "����",
                "fTitle": "����",
                "fContent": "��ע�ɻ�á����͡�΢�����Ա��",
                "wContent": "#΢��ɨ���ά��#�Ҹ�������ɨ���ά�룬���ɻ��΢�����Ա���������ֺ��棡" 
            };
            // ���͸�����
            WeixinJSBridge.on('menu:share:appmessage', function (argv) {
                WeixinJSBridge.invoke('sendAppMessage', { 
                    "img_url": window.shareData.imgUrl,
                    "img_width": "640",
                    "img_height": "640",
                    "link": window.shareData.sendFriendLink,
                    "desc": window.shareData.fContent,
                    "title": window.shareData.fTitle
                }, function (res) {
                    _report('send_msg', res.err_msg);
                })
            });

            // ��������Ȧ
            WeixinJSBridge.on('menu:share:timeline', function (argv) {
                WeixinJSBridge.invoke('shareTimeline', {
                    "img_url": window.shareData.imgUrl,
                    "img_width": "640",
                    "img_height": "640",
                    "link": window.shareData.timeLineLink,
                    "desc": window.shareData.tContent,
                    "title": window.shareData.tTitle
                }, function (res) {
                    _report('timeline', res.err_msg);
                });
            });

            // ����΢��
            WeixinJSBridge.on('menu:share:weibo', function (argv) {
                WeixinJSBridge.invoke('shareWeibo', {
                    "content": window.shareData.wContent,
                    "url": window.shareData.weiboLink,
                }, function (res) {
                    _report('weibo', res.err_msg);
                });
            });
        }, false)