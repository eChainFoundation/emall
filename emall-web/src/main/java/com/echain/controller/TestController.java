package com.echain.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.echain.service.IProductService;
import com.echain.service.IUserService;


/***
 * 简介：测试类
 * <p>
 * code review 2018-03-09 16:16
 * 
 * @author roc
 * 
 */
@RequestMapping("/test")
@Controller
public class TestController {

	@Autowired
	private IProductService productService;
	
	@Autowired
	private IUserService userService;
	
    @RequestMapping(value = "test", produces = "text/html;charset=UTF-8")
    public @ResponseBody String transferData(
			HttpServletRequest request, HttpServletResponse response) throws Exception {
    	
//    	List<Product> products = productService.selectProducts();
//        return JsonUtil.convertBeanToJson(products);
    	Boolean bool = this.userService.saveReceivingAddress(null, 1l, "test", "123", "345");
    	
    	return "1";
    }

}
