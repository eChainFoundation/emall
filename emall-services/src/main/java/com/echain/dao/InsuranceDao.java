package com.echain.dao;

import org.springframework.stereotype.Repository;

import com.echain.entity.Insurance;

@Repository
public class InsuranceDao extends BaseDao<Insurance> {

    private final String className = "com.echain.dao.InsuranceDao.";

    @Override
    public String getClassName() {
        return className;
    }
}