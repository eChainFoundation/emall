package com.echain.dao;

import org.springframework.stereotype.Repository;

import com.echain.entity.LogisticsCompany;

@Repository
public class LogisticsCompanyDao extends BaseDao<LogisticsCompany> {

    private final String className = "com.echain.dao.LogisticsCompanyDao.";

    @Override
    public String getClassName() {
        return className;
    }
}