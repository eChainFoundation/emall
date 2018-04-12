package com.echain.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.echain.dao.InsuranceClaimsDao;
import com.echain.dao.InsuranceDao;
import com.echain.dao.InsuranceTransactionDao;
import com.echain.dao.ProductDao;
import com.echain.dao.ProductTransactionDao;
import com.echain.dao.ReceivingAddressDao;
import com.echain.dao.UserBaseDao;
import com.echain.entity.Insurance;
import com.echain.entity.InsuranceClaims;
import com.echain.entity.InsuranceTransaction;
import com.echain.entity.Product;
import com.echain.entity.ProductTransaction;
import com.echain.entity.ReceivingAddress;
import com.echain.helper.TranscationExecutor;
import com.echain.service.IOrderService;

@Service
public class OrderServiceImpl implements IOrderService {

	@Autowired
	private ProductTransactionDao productTransactionDao;
	
	@Autowired
	private InsuranceTransactionDao insuranceTransactionDao;
	
	@Autowired
	private InsuranceClaimsDao insuranceClaimsDao;
	
	@Autowired
	private InsuranceDao insuranceDao;
	
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private UserBaseDao userDao;
	
	@Autowired
	private ReceivingAddressDao receivingAddressDao;

	@Override
	public Boolean saveProductTransaction(Long id, Long userBuyerId,
			Long userSellerId, Long receivingAddressId, Long productId,
			String status, String describeText) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Boolean saveInsuranceTransaction(Long id, Long insuranceId,
			Long transactionId, Integer insuranceNum, String insuranceStatus,
			Integer claimsTimes) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ProductTransaction> selectProductTransactionByUserid(Long userBuyerId, Long productId) {
		return this.productTransactionDao.selectProductTransactionByUserid(userBuyerId, productId);
	}

	@Override
	public Integer saveInsuranceClaims(Long insuranceTransactionId) {
		int i = 0;
		int times = 0;
		InsuranceTransaction it = this.insuranceTransactionDao.selectByPrimaryKey(insuranceTransactionId);
		Insurance in = this.insuranceDao.selectByPrimaryKey(it.getInsuranceId());
		if("2".equals(it.getInsuranceStatus())) {
			i = 2;
		} else if("3".equals(it.getInsuranceStatus())) {
			i = 3;
		} 
		
		List<InsuranceClaims> lis = this.insuranceClaimsDao.selectListByInsuranceTransactionId(insuranceTransactionId);
		if(lis != null && lis.size() > 0) {
			if(it.getClaimsTimes() == lis.size()) {
				i = 1;
			}
			times = lis.size();
		}
		if(i == 0) {
			InsuranceClaims ic = new InsuranceClaims();
			ic.setInsuranceTransactionId(insuranceTransactionId);
			ic.setClaimsPrice(in.getClaimsPrice());
			ic.setClaimsTimes(times+1);
			ic.setCreateTime(new Date());
			this.insuranceClaimsDao.insertSelective(ic);
		}
		return i;
	}

	@Override
	public boolean buyGoods(Long userBuyerId, Long productId, Long insuranceId) {
		TranscationExecutor<Boolean> executor = new TranscationExecutor<Boolean>(){
			public Boolean execute(){
				Product product = productDao.selectByPrimaryKey(productId);
				List<ReceivingAddress> addresses = receivingAddressDao.selectReceivingAddressByUserId(userBuyerId);
				Insurance insurance = insuranceDao.selectByPrimaryKey(insuranceId);
				ReceivingAddress address = null;
				if(addresses != null && addresses.size() == 1) {
					address = addresses.get(0);
				}
				ProductTransaction pt = new ProductTransaction();
				pt.setCreateTime(new Date());
				pt.setProductId(productId);
				pt.setProductName(product.getProductName());
				pt.setProductPrice(product.getProductPrice());
				pt.setReceivingAddressId(address.getId());
				pt.setUserBuyerId(userBuyerId);
				pt.setUserSellerId(product.getUserBaseId());
				Integer result = productTransactionDao.insertSelective(pt);
				if(result > 0) {
					InsuranceTransaction it = new InsuranceTransaction();
					it.setClaimsTimes(10);
					it.setCreateTime(new Date());
					it.setInsuranceId(insuranceId);
					it.setInsuranceNum(1);
					it.setInsurancePrice(insurance.getInsurancePrice());
					it.setTransactionId(pt.getId());
					insuranceTransactionDao.insertSelective(it);
					
					return true;
				}
				return false;
			}
		};
		
		return executor.run();
	}
	
	
}
