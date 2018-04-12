package com.zounongjia.test;

 

import org.junit.runner.RunWith;
import org.apache.log4j.Logger;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.unitils.UnitilsJUnit3;

/**
 * 测试基类
 * @author guoyun
 */
@ContextConfiguration(locations = {"classpath:applicationContext.xml"})
@RunWith(SpringJUnit4ClassRunner.class)
public class BaseTestCase extends UnitilsJUnit3{	
 	
	public void test(){	}
}
