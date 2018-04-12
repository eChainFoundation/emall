package com.echain.dao;

import org.springframework.stereotype.Repository;

import com.echain.entity.UserBase;

@Repository
public class UserBaseDao extends BaseDao<UserBase> {

    private final String className = "com.echain.dao.UserBaseDao.";

    @Override
    public String getClassName() {
        return className;
    }

	public UserBase selectUserByPhoneNumer(String phoneNumer) {
		return this.getSqlSession().selectOne(getClassName().concat("selectUserByPhoneNumer"), phoneNumer);
	}
}