package com.echain.util;

public class ConstantsUser {

	// public static final String qrcodePath =
	// ResourceConfig.getInstance().getQrcodePicPath() + "static/qrcode";
	// public static final String qrcodeUrl =
	// ResourceConfig.getInstance().getHttpUrlPrefix()+"JrjWeb/findUser?userId=";

	// /*
	// * 保存action映射,便于获得描述
	// */
	// public static final Map<String, String> MapActionDesc = new
	// HashMap<String, String>();
	// static{
	// // MapActionDesc.put(AccountOPAction.Increment.action,
	// AccountOPAction.Increment.desc);
	// // MapActionDesc.put(AccountOPAction.Reduce.action,
	// AccountOPAction.Reduce.desc);
	// // MapActionDesc.put(AccountOPAction.Block.action,
	// AccountOPAction.Block.desc);
	// // MapActionDesc.put(AccountOPAction.UnBlock.action,
	// AccountOPAction.UnBlock.desc);
	// // MapActionDesc.put(AccountOPAction.Recharge.action,
	// AccountOPAction.Recharge.desc);
	// // MapActionDesc.put(AccountOPAction.Withdrawal.action,
	// AccountOPAction.Withdrawal.desc);
	// // MapActionDesc.put(AccountOPAction.BlockAndPay.action,
	// AccountOPAction.BlockAndPay.desc);
	// }
	//
	// /*
	// * 保存type映射,便于获得描述
	// */
	// public static final Map<String, String> MapTypeDesc = new HashMap<String,
	// String>();
	// static{
	// // MapTypeDesc.put(AccountOPType.ICoursePassReward.type,
	// AccountOPType.ICoursePassReward.desc);
	// // MapTypeDesc.put(AccountOPType.OCoursePassReward.type,
	// AccountOPType.OCoursePassReward.desc);
	// // MapTypeDesc.put(AccountOPType.IRechargeWX.type,
	// AccountOPType.IRechargeWX.desc);
	// // MapTypeDesc.put(AccountOPType.IRechargeZFB.type,
	// AccountOPType.IRechargeZFB.desc);
	// }
	//
	// /**
	// * 根据交易行为获得描述
	// * @param action
	// * @return
	// */
	// public static String GetDescByOpAction(String action) {
	// String actionDesc = MapActionDesc.get(action);
	// if(StringUtils.isEmpty(actionDesc)) {
	// actionDesc = "未知";
	// }
	//
	// return actionDesc;
	// }
	//
	// /**
	// * 根据交易类型获得描述
	// * @param type
	// * @return
	// */
	// public static String GetDescByOpType(String type) {
	// String typeDesc = MapTypeDesc.get(type);
	// if(StringUtils.isEmpty(typeDesc)) {
	// typeDesc = "未知";
	// }
	//
	// return typeDesc;
	// }
	//
	//
	//
	// /*
	// *
	// */
	//
	// /*
	// * 账户操作行为
	// */
	// public static enum ActiveOPAction{
	// BAOMING("1", "报名", 0), // 入账
	// CHENGGONG("2", "参加活动", 1), // 出帐
	// QUXIAOBAOMING("3", "取消报名", 2); // 冻结
	//
	// public String status;
	// public String desc;
	// public int index;
	//
	// public String getStatus() {
	// return status;
	// }
	//
	// public String getDesc() {
	// return desc;
	// }
	//
	// public int getIndex() {
	// return index;
	// }
	//
	// private ActiveOPAction(String status, String desc, int index) {
	// this.status = status;
	// this.desc = desc;
	// this.index = index;
	// }
	// }
	//
	// /*
	// * 账户操作类型
	// */
	// public static enum ActivityStatus{
	// WEIKAISHI("0", "未开始", 0), // 默认类型
	// JINGXINGZHONG("1", "进行中", 1), // 学生
	// YIJIESU("2", "已结束", 2);
	//
	// public String status;
	// public String desc;
	// public int index;
	//
	// public String getStatus() {
	// return status;
	// }
	//
	// public void setStatus(String status) {
	// this.status = status;
	// }
	//
	// public String getDesc() {
	// return desc;
	// }
	//
	// public void setDesc(String desc) {
	// this.desc = desc;
	// }
	//
	// public int getIndex() {
	// return index;
	// }
	//
	// public void setIndex(int index) {
	// this.index = index;
	// }
	//
	// private ActivityStatus(String status, String desc, int index) {
	// this.status = status;
	// this.desc = desc;
	// this.index = index;
	// }
	//
	// }
	//
	// public static enum ActivityTuijian{
	// TUIJIAN("1", "未开始", 0), // 默认类型
	// BUTUIJIAN("0", "进行中", 1); // 学生
	//
	// public String status;
	// public String desc;
	// public int index;
	//
	// public String getStatus() {
	// return status;
	// }
	//
	// public void setStatus(String status) {
	// this.status = status;
	// }
	//
	// public String getDesc() {
	// return desc;
	// }
	//
	// public void setDesc(String desc) {
	// this.desc = desc;
	// }
	//
	// public int getIndex() {
	// return index;
	// }
	//
	// public void setIndex(int index) {
	// this.index = index;
	// }
	//
	// private ActivityTuijian(String status, String desc, int index) {
	// this.status = status;
	// this.desc = desc;
	// this.index = index;
	// }
	//
	// }

}
