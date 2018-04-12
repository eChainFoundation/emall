package com.echain.service;

import java.util.List;

import com.echain.entity.ProductTransaction;

public interface IOrderService {

	public Boolean saveProductTransaction(Long id, Long userBuyerId,
			Long userSellerId, Long receivingAddressId, Long productId,
			String status, String describeText);

	public Boolean saveInsuranceTransaction(Long id, Long insuranceId,
			Long transactionId, Integer insuranceNum, String insuranceStatus,
			Integer claimsTimes);

	public List<ProductTransaction> selectProductTransactionByUserid(Long userBuyerId, Long productId);
	
	public Integer saveInsuranceClaims(Long insuranceTransactionId);

	public boolean buyGoods(Long userBuyerId, Long productId, Long insuranceId);
}
