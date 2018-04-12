SET FOREIGN_KEY_CHECKS=0;
DROP DATABASE IF EXISTS emall;
CREATE DATABASE emall DEFAULT CHARSET 'utf8';

USE emall;

/*==============================================================*/
/* Table: `ec_user_base`                                   */
/* 用户基本信息表							*/
/* 创建时间:2018-03-08                                          */
/*==============================================================*/
DROP TABLE IF EXISTS `ec_user_base`;
CREATE TABLE `ec_user_base` (
  `id`                BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `user_name`         VARCHAR(100) CHARACTER SET utf8 COMMENT '用户名称（登陆账号）',
  `password`          VARCHAR(100) CHARACTER SET utf8 COMMENT '管理员密码（登陆密码）',
  `user_state`        CHAR(2) NOT NULL DEFAULT '0' COMMENT '用户状态-判断是否登陆状态0-未登陆，1-已登陆,2-账号冻结无法登陆',
  `country`           CHAR(2) NOT NULL DEFAULT '0' COMMENT '用户所在地：0-中国，1-其他',
  `phone_number`      VARCHAR(11) NOT NULL COMMENT '联系方式，手机号码',
  `email`             VARCHAR(100) COMMENT '邮箱',
  `wallet`            VARCHAR(100) DEFAULT NULL COMMENT '以太坊钱包地址',
  `recommend_user_id` BIGINT(20) NOT NULL DEFAULT 0 COMMENT '推荐人ID',
  `create_time`       DATETIME NOT NULL COMMENT '创建时间',

  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_phone_number` (`phone_number`),
  UNIQUE KEY `uk_wallet` (`wallet`)
) ENGINE=INNODB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8 COMMENT='用户基本信息表';


/*==============================================================*/
/* Table: `ec_receiving_address`                                   */
/* 收货地址信息表					  */	
/* 创建时间:2018-03-08                                          */
/*==============================================================*/
DROP TABLE IF EXISTS `ec_receiving_address`;
CREATE TABLE `ec_receiving_address` (
  `id`                BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id`   		  BIGINT(20) NOT NULL COMMENT '关联用户ID',
  `real_name`	      VARCHAR(100) CHARACTER SET utf8 NOT NULL COMMENT '收货人姓名',
  `telephone`     	  VARCHAR(20) CHARACTER SET utf8 NOT NULL COMMENT '联系电话',
  `address`           VARCHAR(100) NOT NULL COMMENT '收货地址',
  `status`            CHAR(1) NOT NULL DEFAULT '1' COMMENT '状态，1-正常，0-禁用',

  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='收货地址信息表';


/*==============================================================*/
/* Table: `ec_product`                                   */
/* 产品表	  */	
/* 创建时间:2018-03-08                                          */
/*==============================================================*/
DROP TABLE IF EXISTS `ec_product`;
CREATE TABLE `ec_product` (
  `id`                BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_base_id`      BIGINT(20) NOT NULL COMMENT '产品供应用户',
  `product_name`      VARCHAR(20) NOT NULL DEFAULT 0 COMMENT '产品名',
  `product_area`      VARCHAR(1000) COMMENT '产品产地',
  `product_no`        VARCHAR(100) CHARACTER SET utf8 COMMENT '产品编号',
  `product_price`     DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT '价格',
  `product_num`       INT(10) NOT NULL DEFAULT '-1' COMMENT '-1为不限量供应',
  `product_material`  VARCHAR(100) CHARACTER SET utf8 COMMENT '材料',
  `product_picture`   VARCHAR(100) NOT NULL COMMENT '产品图片',
  `status`            CHAR(2) NOT NULL DEFAULT '1' COMMENT '1-上架，0-下架',

  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='产品表';

/*==============================================================*/
/* Table: `ec_product_attribute`                                   */
/* 产品属性表	  */	
/* 创建时间:2018-03-08                                          */
/*==============================================================*/
DROP TABLE IF EXISTS `ec_product_attribute`;
CREATE TABLE `ec_product_attribute` (
  `id`                BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `product_id`        BIGINT(20) NOT NULL COMMENT '关联用户id',
  `attribute_name`    VARCHAR(100) NOT NULL COMMENT '属性名',
  `attribute_value`   VARCHAR(100) NOT NULL COMMENT '属性值',
  `status`            CHAR(2) NOT NULL DEFAULT '1' COMMENT '属性状态，0-启用,1-禁用',

  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='产品属性表';


/*==============================================================*/
/* Table: `ec_product_transaction`                                   */
/* 商品交易表	         			         */
/* 创建时间:2018-03-08                                          */
/*==============================================================*/
DROP TABLE IF EXISTS `ec_product_transaction`;
CREATE TABLE `ec_product_transaction` (
  `id`                  BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_buyer_id`       BIGINT(20) NOT NULL COMMENT '买家用户id',
  `user_buyer_name`     VARCHAR(100) NOT NULL COMMENT '买家名',
  `user_seller_id`     	BIGINT(20) NOT NULL COMMENT '角色id',
  `user_seller_name`    VARCHAR(100) NOT NULL COMMENT '卖家名',
  `receiving_address_id` BIGINT(20) NOT NULL COMMENT '收货地址id',
  `product_id`   		BIGINT(20) NOT NULL DEFAULT 1 COMMENT '产品ID',
  `product_name`   		VARCHAR(100) NOT NULL DEFAULT 1 COMMENT '产品名',
  `product_price`       DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT '价格',
  `logistics_company_id`  BIGINT(20) DEFAULT NULL COMMENT '物流公司id',
  `logistics_no`    	VARCHAR(100) DEFAULT NULL COMMENT '物流编号',
  `status`              CHAR(2) NOT NULL DEFAULT '0' COMMENT '交易状态，0-待付款，1-已付款，2-物流运输，4-交易成功，5-交易失败，6-保险赔付',
  `describe_text`	        VARCHAR(1000) COMMENT '描述',
  `is_del`              CHAR(2) NOT NULL DEFAULT '1' COMMENT '交易记录，0-删除，1-正常',
  `create_time` DATETIME NOT NULL COMMENT '创建时间',

  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='商品交易表';

/*==============================================================*/
/* Table: `ec_logistics_company`                              */
/* 物流公司信息表					*/	
/* 创建时间:2018-03-08                                          */
/*==============================================================*/
DROP TABLE IF EXISTS `ec_logistics_company`;
CREATE TABLE `ec_logistics_company` (
  `id`                BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `company_name`      VARCHAR(100) NOT NULL COMMENT '公司名',
  `status`            CHAR(2) NOT NULL DEFAULT '1' COMMENT '1-正常，0-禁用',
  `create_time`       DATETIME NOT NULL COMMENT '创建时间',

  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='物流公司信息表';

/*==============================================================*/
/* Table: `ec_logistics_record`                                       */
/* 物流记录信息表					*/	
/* 创建时间:2018-03-08                                          */
/*==============================================================*/
DROP TABLE IF EXISTS `ec_logistics_record`;
CREATE TABLE `ec_logistics_record` (
  `id`                		BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `logistics_company_id`    BIGINT(20) NOT NULL COMMENT '物流公司id',
  `logistics_no`    		VARCHAR(100) NOT NULL COMMENT '物流编号',
  `transaction_id`          BIGINT(20) NOT NULL COMMENT '交易id',
  `product_name`        	VARCHAR(100) COMMENT '产品名',
  `optioner_name`     		VARCHAR(100) NOT NULL COMMENT '操作人名',
  `option_content`            		VARCHAR(1000) NOT NULL COMMENT '操作内容',
  `describe_text`          		TEXT COMMENT '描述',
  `create_time`      		DATETIME NOT NULL COMMENT '创建时间',

  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='物流记录信息表';

/*==============================================================*/
/* Table: `ec_insurance`                                       */
/* 保险信息表				         		*/
/* 创建时间:2018-03-08                                           */
/*==============================================================*/
DROP TABLE IF EXISTS `ec_insurance`;
CREATE TABLE `ec_insurance` (
  `id`                   	BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '保单ID',
  `insurance_name`        VARCHAR(100) NOT NULL COMMENT '险种名称',
  `insurance_num`           INT(10) NOT NULL DEFAULT 0 COMMENT '0为不限量购买',
  `insurance_price`         DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT '保险金额',
  `claims_price`         DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT '赔付金额',
  `insurance_type`   		CHAR(1) COMMENT '险种类型，1-定价版，1-费率版',
  `insurance_status`   		CHAR(1) COMMENT '险种状态，0-禁用，1-启用',
  `describe_text`      	 		TEXT COMMENT '险种描述',
  `create_time`      		DATETIME NOT NULL COMMENT '创建时间',

  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='保险信息表';

/*==============================================================*/
/* Table: `ec_insurance_transaction`                                       */
/* 购买保险信息表				         		*/
/* 创建时间:2018-03-08                                           */
/*==============================================================*/
DROP TABLE IF EXISTS `ec_insurance_transaction`;
CREATE TABLE `ec_insurance_transaction` (
  `id`                   	BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `insurance_id`          	BIGINT(20) NOT NULL COMMENT '险种ID',
  `transaction_id`          BIGINT(20) NOT NULL COMMENT '交易ID',
  `insurance_num`           VARCHAR(1000) CHARACTER SET utf8 COMMENT '保险份数',
  `insurance_price`         DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT '保险总金额',
  `insurance_status`   		CHAR(1) COMMENT '是否赔付，0-未赔付，1-赔付中，2-已赔付，3-不需要赔付',
  `claims_times`      	 	INT(10) NOT NULL DEFAULT 0 COMMENT '已赔付次数',
  `create_time`      		DATETIME NOT NULL COMMENT '创建时间',

  PRIMARY KEY (`id`),
  UNIQUE KEY `unq_transaction_id` (`transaction_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='购买保险信息表';

/*==============================================================*/
/* Table: `ec_insurance_claims`                                   */
/* 保险理赔记录表				         */
/* 创建时间:2018-03-08                                          */
/*==============================================================*/
DROP TABLE IF EXISTS `ec_insurance_claims`;
CREATE TABLE `ec_insurance_claims` (
  `id`                   		BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `insurance_transaction_id`   	BIGINT(20) NOT NULL COMMENT '保险交易id',
  `claims_times`      	 		INT(10) NOT NULL DEFAULT 0 COMMENT '已赔付次数',
  `claims_price`         		DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT '每次赔付金额',
  `create_time`      		DATETIME NOT NULL COMMENT '创建时间',

  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='保险理赔记录表';


