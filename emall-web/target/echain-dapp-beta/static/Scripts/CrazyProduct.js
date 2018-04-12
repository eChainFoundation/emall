
var Id = 0; //图片ID
//新增图片上传
function AddImg(obj) {
    Id++;
    var imgId = "imgId_" + Id;
    var newTr = '<span style="margin-left:65px;" id="' + imgId + '"><input type="file"name="addFileFu" /> <span style="color:#007ac7;cursor:pointer;font-size:10px;"  onclick="DelImg(' + imgId + ')">删除</span><br></span>';
    $(newTr).insertBefore($(obj));
}

//编辑--副图图片上传
function AddEditFuImg(obj, imgId) {
    var fuImgId = "editFuImgId_" + imgId;
    if (!document.getElementById(fuImgId)) {
        var newTr = '<span style="margin-left:5px;" id="' + fuImgId + '"><input type="file"name="editFileFu_' + imgId + '" /> <span style="color:#007ac7;cursor:pointer;font-size:10px;"  onclick="DelImg(' + fuImgId + ')">取消</span><br></span>';
        $(newTr).insertBefore($(obj));
    }
}
//编辑--主图图片上传
function AddEditZhuImg(obj, imgId) {
    var zhuImgId = "editZhuImgId_" + imgId;
    if (!document.getElementById(zhuImgId)) {
        var newTr = '<span style="margin-left:5px;" id="' + zhuImgId + '"><input type="file"name="editFileZhu_' + imgId + '" /> <span style="color:#007ac7;cursor:pointer;font-size:10px;"  onclick="DelImg(' + zhuImgId + ')">取消</span><br></span>';
        $(newTr).insertBefore($(obj));
    }
}
var delImgCount = 0;
//编辑--删除图片
function DelImgDiv(divId) {
    if (confirm("确认删除？")) {
        var delImgId = $("#delImg").val() + divId.split('_')[1] + "_";
        $("#delImg").val(delImgId);
        $("#" + divId).remove();
        delImgCount++;
    }
}
//删除图片
function DelImg(imgId) {
    if (confirm("确认删除？")) {
        $(imgId).remove();
    }
}
//自动金额算法
function UpdateLoanFee() {
    var MarketPrice = $("#MarketPrice").val();
    var CrazyPrice = $("#CrazyPrice").val();
    var DanBaoRate = $("#DanBaoRate").val();
    var LoanFeeRate = $("#LoanFeeRate").val();
    var LoanRate = $("#LoanRate").val();
    var Limit = $("#Limit").val();

    //分期折扣=分期价/市场价*100
    var FreeRate = (CrazyPrice / MarketPrice * 100).toFixed(2);
    $("#FreeRate").val(FreeRate);
    //担保费=分期价*年担保费利率*分期期限*0.01
    //分期期限=3年，目前指定3年
    var DanBaoFee = (CrazyPrice * DanBaoRate * 3 * 0.01).toFixed(2);
    $("#DanBaoFee").val(DanBaoFee);
    //手续费=分期价*手续费率*0.01
    var LoanFee = (CrazyPrice * LoanFeeRate * 0.01).toFixed(2);
    $("#LoanFee").val(LoanFee);
    //每期还款=分期总价/分期期限
    var RepayValue = (CrazyPrice / Limit).toFixed(2);
    $("#RepayValue").val(RepayValue);
    //利息
    if (CrazyPrice > 0 && LoanRate > 0 && Limit > 0) {
        var url = "/CrazyBuy/GetInterest";
        $.ajax({
            type: "POST",
            url: url,
            data: { total: parseFloat(CrazyPrice), LoanRate: parseFloat(LoanRate), Limit: parseInt(Limit) },
            success: function (data) {
                $("#TotalIntrest").val(data); 
            }
        });
    }
}
//点击提交
function ProductSubmit(status) {
    //保存提交商品状态
    $("#CrazyProductStatus").val(status);
    $("form:first").submit();
}
function sumbit(fuTuCount, isEdit) {
    var msg = $("#msg");
    if ($.trim($("#ProductName").val()).length < 1 || $.trim($("#ProductName").val()).length > 14) {
        msg.html("请先确认商品名称长度1到14个字");
        return false;
    } else if ($.trim($("#Code").val()).length < 1) {
        msg.html("请先输入商品货号");
        return false;
    } else if ($("#PBrand_Id").val() < 1) {
        msg.html("请先选择品牌名称");
        return false; 
    } else if ($.trim($("#MarketPrice").val()).length < 1) {
        msg.html("请先输入产品市场价");
        return false;
    } else if ($.trim($("#CrazyPrice").val()).length < 1) {
        msg.html("请先输入分期价");
        return false;
    } else if ($.trim($("#OfficialUrl").val()).length < 1) {
        msg.html("请先输入产品官网地址");
        return false;
    } else if ($("#OfficialUrl").val().indexOf("http://") < 0 || $("#OfficialUrl").val().indexOf("http://") > 0) {
        msg.html("产品官网地址必须是http://开头！");
        return false;
    } else if ($.trim($("#LoanRate").val()).length < 1) {
        msg.html("请先输入年利率");
        return false;
    } else if ($.trim($("#BrandReceiveAmount").val()).length < 1) {
        msg.html("请先输入商户收款价");
        return false;
    } else if ($("#Limit").val() < 1) {
        msg.html("请先输入分期周期");
        return false;
    } else if ($.trim($("#LoanFeeRate").val()).length < 1) {
        msg.html("请先输入手续费率");
        return false;
    } else if ($.trim($("#DanBaoRate").val()).length < 1) {
        msg.html("请先输入担保费率");
        return false;
    } else if ($.trim($("#Number").val()).length < 1) {
        msg.html("请先输入产品数量");
        return false;
    }
    if (!isEdit) {
        if ($.trim($("#fileFu").val()).length < 1) {
            msg.html("请先输入商品副图");
            return false;
        } else if ($.trim($("#fileZhu").val()).length < 1) {
            msg.html("请先输入商品主图");
            return false;
        }
    } else {
        if (delImgCount > 0) {//有删除图片                 
            if (delImgCount == fuTuCount && $("input[name^=editFileFu_]").length < 1 && $("input[name=addFileFu]").length < 1) {
                msg.html("请输入商品副图");
                return false;
            }
        }
    }
    msg.html("");
    var productStatus = $("#CrazyProductStatus").val();
    var confirmMsg = "";
    switch (productStatus) {
        case "-1": confirmMsg = "确定要将该商品下架吗？下架之后，此商品将不会出现在疯买商品首页！"; break;
        case "0": confirmMsg = "确定要将该商品保存至草稿吗？保存至草稿之后，此商品将不会出现在疯买商品首页！"; break;
        case "1": confirmMsg = "确定要将该商品上架吗？上架之后，此商品将出现在疯买商品首页！"; break;
        default: break;
    }
    if (!confirm(confirmMsg)) {
        return false;
    }
    return true;
}