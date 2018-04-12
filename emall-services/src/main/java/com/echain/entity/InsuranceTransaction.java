package com.echain.entity;

import java.math.BigDecimal;
import java.util.Date;

public class InsuranceTransaction extends BaseEntity {

    private Long insuranceId;

    private Long transactionId;

    private Integer insuranceNum;

    private BigDecimal insurancePrice;

    private String insuranceStatus;

    private Integer claimsTimes;

    private Date createTime;

    public Long getInsuranceId() {
        return insuranceId;
    }

    public void setInsuranceId(Long insuranceId) {
        this.insuranceId = insuranceId;
    }

    public Long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
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

    public String getInsuranceStatus() {
        return insuranceStatus;
    }

    public void setInsuranceStatus(String insuranceStatus) {
        this.insuranceStatus = insuranceStatus == null ? null : insuranceStatus.trim();
    }

    public Integer getClaimsTimes() {
        return claimsTimes;
    }

    public void setClaimsTimes(Integer claimsTimes) {
        this.claimsTimes = claimsTimes;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}