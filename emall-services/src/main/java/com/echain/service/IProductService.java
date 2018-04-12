package com.echain.service;

import java.util.List;

import com.echain.entity.Insurance;
import com.echain.entity.Product;

public interface IProductService {

	public List<Product> selectProducts();

	public Product selectProductsById(Long productId);

}
