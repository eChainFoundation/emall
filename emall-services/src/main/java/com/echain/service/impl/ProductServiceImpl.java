package com.echain.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.echain.dao.ProductDao;
import com.echain.entity.Product;
import com.echain.service.IProductService;

@Service
public class ProductServiceImpl implements IProductService {

	@Autowired
	private ProductDao productDao;
	
	@Override
	public List<Product> selectProducts() {
		return this.productDao.listAll();
	}

	@Override
	public Product selectProductsById(Long productId) {
		return this.productDao.selectByPrimaryKey(productId);
	}

}
