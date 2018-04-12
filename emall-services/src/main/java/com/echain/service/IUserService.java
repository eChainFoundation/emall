package com.echain.service;

import java.util.List;

import com.echain.entity.ReceivingAddress;
import com.echain.entity.UserBase;

public interface IUserService {

	public Boolean saveOrUpdateUser(Long id, String username, String password,
			String country, String phoneNumber, String email, String wallet,
			String recommendUserId);

	public UserBase selectUserByPhoneNumer(String phoneNumer);

	public UserBase selectUserByUsername(String userName);

	public Boolean saveReceivingAddress(Long id, Long userId, String realName,
			String telephone, String address);

	public List<ReceivingAddress> selectReceivingAddressByUserId(Long userId);

	public UserBase selectUserById(Long userId);

}
