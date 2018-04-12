package com.echain.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.echain.entity.ProductTransaction;

@Repository
public class ProductTransactionDao extends BaseDao<ProductTransaction> {

    private final String className = "com.echain.dao.ProductTransactionDao.";

    @Override
    public String getClassName() {
        return className;
    }

	public List<ProductTransaction> selectProductTransactionByUserid(Long userBuyerId, Long productId) {
		Map<String, Long> map = new HashMap<String, Long>();
		map.put("userBuyerId", userBuyerId);
		map.put("productId", productId);
		return this.getSqlSession().selectList(getClassName().concat("selectProductTransactionByUserid"), map);
	}
}