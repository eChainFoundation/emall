package com.echain.entity;

import java.math.BigDecimal;
import java.util.Date;

public class Insurance extends BaseEntity {

    private String insuranceName;

    private Integer insuranceNum;

    private BigDecimal insurancePrice;
    
    private BigDecimal claimsPrice;
    	      
    private String insuranceType;

    private String insuranceStatus;

    private Date createTime;

    private String describeText;

    public String getInsuranceName() {
        return insuranceName;
    }

    public void setInsuranceName(String insuranceName) {
        this.insuranceName = insuranceName == null ? null : insuranceName.trim();
    }

    public Integer getInsuranceNum() {
        return insuranceNum;
    }

    public void setInsuranceNum(Integer insuranceNum) {
        this.insuranceNum = insuranceNum;
    }

    public BigDecimal getInsurancePrice() {
        return insurancePrice;
    }

    public void setInsurancePrice(BigDecimal insurancePrice) {
        this.insurancePrice = insurancePrice;
    }

    public BigDecimal getClaimsPrice() {
		return claimsPrice;
	}

	public void setClaimsPrice(BigDecimal claimsPrice) {
		this.claimsPrice = claimsPrice;
	}

	public String getInsuranceType() {
		return insuranceType;
	}

	public void setInsuranceType(String insuranceType) {
		this.insuranceType = insuranceType;
	}

	public String getInsuranceStatus() {
        return insuranceStatus;
    }

    public void setInsuranceStatus(String insuranceStatus) {
        this.insuranceStatus = insuranceStatus == null ? null : insuranceStatus.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getDescribeText() {
        return describeText;
    }

    public void setDescribeText(String describeText) {
        this.describeText = describeText == null ? null : describeText.trim();
    }
}