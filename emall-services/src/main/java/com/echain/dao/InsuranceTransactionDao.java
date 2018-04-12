package com.echain.dao;

import org.springframework.stereotype.Repository;

import com.echain.entity.InsuranceTransaction;

@Repository
public class InsuranceTransactionDao extends BaseDao<InsuranceTransaction> {

    private final String className = "com.echain.dao.InsuranceTransactionDao.";

    @Override
    public String getClassName() {
        return className;
    }
}