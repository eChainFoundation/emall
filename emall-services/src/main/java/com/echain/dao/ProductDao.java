package com.echain.dao;

import org.springframework.stereotype.Repository;

import com.echain.entity.Product;

@Repository
public class ProductDao extends BaseDao<Product> {

    private final String className = "com.echain.dao.ProductDao.";

    @Override
    public String getClassName() {
        return className;
    }
}