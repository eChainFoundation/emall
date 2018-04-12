package com.echain.service.impl;

import java.util.Date;
import java.util.List;

import org.jsoup.helper.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.echain.dao.ReceivingAddressDao;
import com.echain.dao.UserBaseDao;
import com.echain.entity.ReceivingAddress;
import com.echain.entity.UserBase;
import com.echain.service.IUserService;

@Service
public class UserServiceImpl implements IUserService {

	@Autowired
	private UserBaseDao userDao;
	
	@Autowired
	private ReceivingAddressDao receivingAddressDao;

	@Override
	public Boolean saveOrUpdateUser(Long id, String username, String password,
			String country, String phoneNumber, String email, String wallet,
			String recommendUserId) {
		UserBase user = new UserBase();
		if (!StringUtil.isBlank(username))
			user.setUserName(username);
		if (!StringUtil.isBlank(password))
			user.setPassword(password);
		if (!StringUtil.isBlank(country))
			user.setCountry(country);
		if (!StringUtil.isBlank(phoneNumber))
			user.setPhoneNumber(phoneNumber);
		if (!StringUtil.isBlank(email))
			user.setEmail(email);
		if (!StringUtil.isBlank(wallet))
			user.setWallet(wallet);
		if (!StringUtil.isBlank(recommendUserId))
			user.setRecommendUserId(Long.parseLong(recommendUserId));
		
		int result = 0;
		if (id != null && id > 0) {
			user.setId(id);
			result = this.userDao.updateByPrimaryKeySelective(user);
		} else {
			user.setCreateTime(new Date());
			result = this.userDao.insertSelective(user);
		}
		if (result > 0)
			return true;
		return false;
	}

	@Override
	public UserBase selectUserByPhoneNumer(String phoneNumer) {
		return this.userDao.selectUserByPhoneNumer(phoneNumer);
	}

	@Override
	public UserBase selectUserByUsername(String userName) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Boolean saveReceivingAddress(Long id, Long userId, String realName,
			String telephone, String address) {
		ReceivingAddress receivingAddress = new ReceivingAddress();
		if (!StringUtil.isBlank(realName))
			receivingAddress.setRealName(realName);
		if (!StringUtil.isBlank(telephone))
			receivingAddress.setTelephone(telephone);
		if (!StringUtil.isBlank(address))
			receivingAddress.setAddress(address);
		receivingAddress.setUserId(userId);
	
		
		int result = 0;
		if (id != null && id > 0) {
			receivingAddress.setId(id);
			result = this.receivingAddressDao.updateByPrimaryKeySelective(receivingAddress);
		} else {
			result = this.receivingAddressDao.insertSelective(receivingAddress);
			System.out.println(result);
		}
		if (result > 0)
			return true;
		return false;
	}

	@Override
	public List<ReceivingAddress> selectReceivingAddressByUserId(Long userId) {
		return this.receivingAddressDao.selectReceivingAddressByUserId(userId);
	}

	@Override
	public UserBase selectUserById(Long userId) {
		return this.userDao.selectByPrimaryKey(userId);
	}

}
