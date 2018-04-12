package com.echain.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.echain.dao.InsuranceDao;
import com.echain.entity.Insurance;
import com.echain.service.IInsuranceService;

@Service
public class InsuranceServiceImpl implements IInsuranceService {
	
	@Autowired
	private InsuranceDao insuranceDao;

	@Override
	public Insurance selectInsurancesById(long insurancesId) {
		return this.insuranceDao.selectByPrimaryKey(insurancesId);
	}

}
