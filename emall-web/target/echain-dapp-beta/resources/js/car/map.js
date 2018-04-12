function baidu_map(data) {
    var self = this;
    var opt = this.option;
    var map = new BMap.Map("l-map");
    var myGeo = new BMap.Geocoder();
    //map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]}));     //2Dͼ������ͼ

    //map.addControl(new BMap.MapTypeControl({anchor: BMAP_ANCHOR_TOP_LEFT}));    //���Ͻǣ�Ĭ�ϵ�ͼ�ؼ�

    //alert(city);
    var currentPoint;
    var marker1;
    var marker2;
    map.enableScrollWheelZoom();
    if (data) {
        var point = new BMap.Point(data.lng, data.lat);
        marker1 = new BMap.Marker(point);        // ������ע
        map.addOverlay(marker1);
        var opts = {
            width: 220,     // ��Ϣ���ڿ�� 220-730
            height: 60,     // ��Ϣ���ڸ߶� 60-650
            title: ""  // ��Ϣ���ڱ���
        }
        var infoWindow = new BMap.InfoWindow("ԭ��λ�� " + data.adr + " ,�ƶ�����޸�λ��!��Ҳ����ֱ���޸��Ϸ�λ��ϵͳ�Զ���λ!", opts);  // ������Ϣ���ڶ���
        marker1.openInfoWindow(infoWindow);      // ����Ϣ����
        doit(point);
    } else {
        var point = new BMap.Point(116.331398, 39.897445);
        doit(point);
        window.setTimeout(function () {
            auto();
        }, 100);
    }
    map.enableDragging();
    map.enableContinuousZoom();
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());



    function auto() {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                //var mk = new BMap.Marker(r.point);  
                //map.addOverlay(mk);  
                // point = r.point;  
                //map.panTo(r.point); 

                var point = new BMap.Point(r.point.lng, r.point.lat);
                marker1 = new BMap.Marker(point);        // ������ע
                map.addOverlay(marker1);
                var opts = {
                    width: 220,     // ��Ϣ���ڿ�� 220-730
                    height: 60,     // ��Ϣ���ڸ߶� 60-650
                    title: ""  // ��Ϣ���ڱ���
                }

                var infoWindow = new BMap.InfoWindow("��λ�ɹ������㵱ǰ��λ��!,�ƶ�����עĿ��λ�ã���Ҳ����ֱ���޸��Ϸ�λ��,ϵͳ�Զ���λ!", opts);  // ������Ϣ���ڶ���
                marker1.openInfoWindow(infoWindow);      // ����Ϣ����
                doit(point);

            } else {
                //alert('failed' + this.getStatus());
            }
        })
    }
    function doit(point) {

        //map.centerAndZoom(point,12);  


        //myGeo.getPoint(city, function(point){ 
        if (point) {
            //window.external.setlngandlat(point.lng,point.lat);
            //alert(point.lng + "  ddd " + point.lat);

            document.getElementById('lat').value = point.lat;
            document.getElementById('lng').value = point.lng;
            map.setCenter(point);
            map.centerAndZoom(point, 15);
            map.panTo(point);

            var cp = map.getCenter();
            myGeo.getLocation(point, function (result) {
                if (result) {
                    document.getElementById('suggestId').value = result.address;
                }
            });






            marker2 = new BMap.Marker(point);        // ������ע  
            var opts = {
                width: 220,     // ��Ϣ���ڿ�� 220-730
                height: 60,     // ��Ϣ���ڸ߶� 60-650
                title: ""  // ��Ϣ���ڱ���
            }
            var infoWindow = new BMap.InfoWindow("��ק��ͼ���㣬�ڵ�ͼ���ú���ע���ĵ���λ�á�", opts);  // ������Ϣ���ڶ���
            marker2.openInfoWindow(infoWindow);      // ����Ϣ����

            map.addOverlay(marker2);                     // ����ע��ӵ���ͼ��

            marker2.enableDragging();
            marker2.addEventListener("dragend", function (e) {
                document.getElementById('lat').value = e.point.lat;
                document.getElementById('lng').value = e.point.lng;
                myGeo.getLocation(new BMap.Point(e.point.lng, e.point.lat), function (result) {
                    if (result) {
                        $('suggestId').value = result.address;
                        //$('city').value = result.city;
                        //			alert(result.address)				
                        //	window.external.setaddress(result.address);//setarrea(result.address);//
                        //marker1.setPoint(new BMap.Point(e.point.lng,e.point.lat));        // �ƶ���ע
                        marker2.setPoint(new BMap.Point(e.point.lng, e.point.lat));
                        map.panTo(new BMap.Point(e.point.lng, e.point.lat));
                        //window.external.setlngandlat(e.point.lng,e.point.lat);
                    }
                });
            });

            map.addEventListener("dragend", function showInfo() {
                var cp = map.getCenter();
                myGeo.getLocation(new BMap.Point(cp.lng, cp.lat), function (result) {
                    if (result) {
                        document.getElementById('suggestId').value = result.address;
                        document.getElementById('lat').value = cp.lat;
                        document.getElementById('lng').value = cp.lng;
                        //	window.external.setaddress(result.address);//setarrea(result.address);//
                        //alert(point.lng + "  ddd " + point.lat);
                        //marker1.setPoint(new BMap.Point(cp.lng,cp.lat));        // �ƶ���ע
                        marker2.setPoint(new BMap.Point(cp.lng, cp.lat));
                        map.panTo(new BMap.Point(cp.lng, cp.lat));
                        //window.external.setlngandlat(cp.lng,cp.lat);
                    }
                });
            });

            map.addEventListener("dragging", function showInfo() {
                var cp = map.getCenter();
                //marker1.setPoint(new BMap.Point(cp.lng,cp.lat));        // �ƶ���ע
                marker2.setPoint(new BMap.Point(cp.lng, cp.lat));
                map.panTo(new BMap.Point(cp.lng, cp.lat));
                map.centerAndZoom(marker2.getPoint(), map.getZoom());
            });


        }


        //}, province);


    }

    function loadmap() {
        //var province = document.getElementById('city').value;
        var city = document.getElementById('suggestId').value;
        var myCity = new BMap.LocalCity();
        // �������ʾ�ڵ�ͼ�ϣ���������ͼ��Ұ  
        myGeo.getPoint(city, function (point) {
            if (point) {
                //marker1.setPoint(new BMap.Point(point.lng,point.lat));        // �ƶ���ע
                marker2.setPoint(new BMap.Point(point.lng, point.lat));
                //window.external.setlngandlat(marker2.getPoint().lng,marker2.getPoint().lat);
                //alert(point.lng + "  ddd " + point.lat);
                document.getElementById('lat').value = point.lat;
                document.getElementById('lng').value = point.lng;
                map.panTo(new BMap.Point(marker2.getPoint().lng, marker2.getPoint().lat));
                map.centerAndZoom(marker2.getPoint(), map.getZoom());
            }
        });//({},province)
        //var citys = new BMap.LocalSearch(map, { renderOptions: { map: map, autoViewport: true } });
        //citys.search(city)
    }

    function setarrea(address, city) {
        $('suggestId').value = address;
        //$('city').value=city;
        window.setTimeout(function () {
            loadmap();
        }, 2000);
    }

    function initarreawithpoint(lng, lat) {
        window.setTimeout(function () {
            //marker1.setPoint(new BMap.Point(lng,lat));        // �ƶ���ע
            marker2.setPoint(new BMap.Point(lng, lat));
            //window.external.setlngandlat(lng,lat);
            map.panTo(new BMap.Point(lng, lat));
            map.centerAndZoom(marker2.getPoint(), map.getZoom());
        }, 2000);
    }
    $("#suggestId").change(function () { loadmap(); })
    $("#positioning").click(function () { loadmap(); });

}