package com.echain.entity;

import java.math.BigDecimal;
import java.util.Date;

public class ProductTransaction extends BaseEntity {

    private Long userBuyerId;

    private String userBuyerName;
    
    private Long userSellerId;

    private String userSellerName;

    private Long logisticsCompanyId;

    private String logisticsNo;

    private Long receivingAddressId;

    private Long productId;

    private String productName;

    private BigDecimal productPrice;

    private String status;

    private String describeText;

    private String isDel;

    private Date createTime;

    public Long getUserBuyerId() {
        return userBuyerId;
    }

    public void setUserBuyerId(Long userBuyerId) {
        this.userBuyerId = userBuyerId;
    }

    public String getUserBuyerName() {
        return userBuyerName;
    }

    public void setUserBuyerName(String userBuyerName) {
        this.userBuyerName = userBuyerName == null ? null : userBuyerName.trim();
    }

    public Long getLogisticsCompanyId() {
		return logisticsCompanyId;
	}

	public void setLogisticsCompanyId(Long logisticsCompanyId) {
		this.logisticsCompanyId = logisticsCompanyId;
	}

	public String getLogisticsNo() {
		return logisticsNo;
	}

	public void setLogisticsNo(String logisticsNo) {
		this.logisticsNo = logisticsNo;
	}

	public Long getUserSellerId() {
        return userSellerId;
    }

    public void setUserSellerId(Long userSellerId) {
        this.userSellerId = userSellerId;
    }

    public String getUserSellerName() {
        return userSellerName;
    }

    public void setUserSellerName(String userSellerName) {
        this.userSellerName = userSellerName == null ? null : userSellerName.trim();
    }

    public Long getReceivingAddressId() {
        return receivingAddressId;
    }

    public void setReceivingAddressId(Long receivingAddressId) {
        this.receivingAddressId = receivingAddressId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName == null ? null : productName.trim();
    }

    public BigDecimal getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(BigDecimal productPrice) {
        this.productPrice = productPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public String getDescribeText() {
        return describeText;
    }

    public void setDescribeText(String describeText) {
        this.describeText = describeText == null ? null : describeText.trim();
    }

    public String getIsDel() {
        return isDel;
    }

    public void setIsDel(String isDel) {
        this.isDel = isDel == null ? null : isDel.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}