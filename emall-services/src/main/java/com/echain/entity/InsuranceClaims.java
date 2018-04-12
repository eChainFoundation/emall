package com.echain.entity;

import java.math.BigDecimal;
import java.util.Date;

public class InsuranceClaims extends BaseEntity {

    private Long insuranceTransactionId;

    private Integer claimsTimes;

    private BigDecimal claimsPrice;
    
    private Date createTime;

    public Long getInsuranceTransactionId() {
        return insuranceTransactionId;
    }

    public void setInsuranceTransactionId(Long insuranceTransactionId) {
        this.insuranceTransactionId = insuranceTransactionId;
    }

    public Integer getClaimsTimes() {
        return claimsTimes;
    }

    public void setClaimsTimes(Integer claimsTimes) {
        this.claimsTimes = claimsTimes;
    }

    public BigDecimal getClaimsPrice() {
        return claimsPrice;
    }

    public void setClaimsPrice(BigDecimal claimsPrice) {
        this.claimsPrice = claimsPrice;
    }

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
    
}