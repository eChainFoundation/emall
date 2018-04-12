package com.echain.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.echain.entity.ReceivingAddress;

@Repository
public class ReceivingAddressDao extends BaseDao<ReceivingAddress> {

    private final String className = "com.echain.dao.ReceivingAddressDao.";

    @Override
    public String getClassName() {
        return className;
    }

	public List<ReceivingAddress> selectReceivingAddressByUserId(Long userId) {
		return this.getSqlSession().selectList(getClassName().concat("selectReceivingAddressByUserId"), userId);
	}
}