package com.echain.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.echain.entity.InsuranceClaims;

@Repository
public class InsuranceClaimsDao extends BaseDao<InsuranceClaims> {

    private final String className = "com.echain.dao.InsuranceClaimsDao.";

    @Override
    public String getClassName() {
        return className;
    }

	public List<InsuranceClaims> selectListByInsuranceTransactionId(
			Long insuranceTransactionId) {
		return this.getSqlSession().selectList(getClassName().concat("selectListByInsuranceTransactionId"), insuranceTransactionId);
	}
}