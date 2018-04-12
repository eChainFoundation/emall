package com.echain.dao;

import org.springframework.stereotype.Repository;

import com.echain.entity.ProductAttribute;

@Repository
public class ProductAttributeDao extends BaseDao<ProductAttribute> {

    private final String className = "com.echain.dao.ProductAttributeDao.";

    @Override
    public String getClassName() {
        return className;
    }
}