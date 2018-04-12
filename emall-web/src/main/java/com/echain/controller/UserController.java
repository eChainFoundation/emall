package com.echain.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jsoup.helper.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.echain.entity.ReceivingAddress;
import com.echain.entity.UserBase;
import com.echain.service.IUserService;
import com.echain.util.SubmailClient;

@RequestMapping("/user")
@Controller
public class UserController {

	@Autowired
	private IUserService userService;
	
	@RequestMapping(value = "save_user.action", produces = "text/html;charset=UTF-8")
    public String saveUser(
    		@RequestParam(required=false) Long id,
    		@RequestParam(required=false) String username,
    		@RequestParam(required=false) String password,
    		@RequestParam(required=false) String country,
    		@RequestParam(required=true) String phoneNumber,
    		@RequestParam(required=false) String email,
    		@RequestParam(required=false) String wallet,
    		@RequestParam(required=false) String recommendId,
			HttpServletRequest request, HttpServletResponse response,
			ModelMap modelMap) throws Exception {
        
		if(StringUtil.isBlank(phoneNumber))
			modelMap.put("errorMessage", "手机号不能为空！");
			
		Boolean bool = this.userService.saveOrUpdateUser(id, username, password, country, phoneNumber, email, wallet, recommendId);
		if(bool) {
			return "";
		}
		return "";
    }
	
	@RequestMapping(value = "get_yam.html", produces = "text/html;charset=UTF-8")
    public @ResponseBody String getYZM(
    		@RequestParam(required=false) String country,
    		@RequestParam(required=true) String phoneNumber,
			HttpServletRequest request, HttpServletResponse response,
			ModelMap modelMap) throws Exception {
         
		if(StringUtil.isBlank(phoneNumber))
			modelMap.put("errorMessage", "手机号不能为空！");
		
		int rand = (int)((Math.random()*9+1)*100000);
		
		try {
			SubmailClient.sendRejectApply(phoneNumber, rand+"", country);
			return rand+"";
		} catch(Exception e) {
			return "0";
		}
    }
	
	@RequestMapping(value = "show_user", produces = "text/html;charset=UTF-8")
    public String selectUserByphoneNumber(
    		@RequestParam(required=false) Long id,
    		@RequestParam(required=false) String phoneNumber,
			HttpServletRequest request, HttpServletResponse response,
			ModelMap modelMap) throws Exception {
        
		UserBase user = null;
		if(id != null && id > 0)
			user = this.userService.selectUserById(id);
		
		if(phoneNumber != null)
			user = this.userService.selectUserByPhoneNumer(phoneNumber);
		if(user != null) {
			modelMap.put("user", user);
			return "";
		}
		return "";
    }
	
	@RequestMapping(value = "regist_user_phone", produces = "text/html;charset=UTF-8")
    public String registUserPhone(
			HttpServletRequest request, HttpServletResponse response,
			ModelMap modelMap) throws Exception {
        
		return "/web/login2";
    }
	
	@RequestMapping(value = "regist_user_wallet", produces = "text/html;charset=UTF-8")
    public String registUserWallet(
			HttpServletRequest request, HttpServletResponse response,
			ModelMap modelMap) throws Exception {
        
		return "/web/login1";
    }
	
	@RequestMapping(value = "save_receiving_address", produces = "text/html;charset=UTF-8")
    public String saveReceivingAddress(
    		@RequestParam(required=false) Long id,
    		@RequestParam(required=false) Long userId,
    		@RequestParam(required=false) String realName,
    		@RequestParam(required=false) String telephone,
    		@RequestParam(required=false) String address,
			HttpServletRequest request, HttpServletResponse response,
			ModelMap modelMap) throws Exception {
        
		Boolean bool = this.userService.saveReceivingAddress(id,userId,realName,telephone,address);
		if(bool) {
			return "";
		}
		return "";
    }
	
	@RequestMapping(value = "select_receiving_address_userid", produces = "text/html;charset=UTF-8")
    public String selectReceivingAddressByUserId(
    		@RequestParam(required=false) Long userId,
			HttpServletRequest request, HttpServletResponse response,
			ModelMap modelMap) throws Exception {
        
		List<ReceivingAddress> listReceivingAddress = this.userService.selectReceivingAddressByUserId(userId);
		if(listReceivingAddress != null && listReceivingAddress.size() > 0)
			modelMap.put("listReceivingAddress", listReceivingAddress);
		return "";
    }
}
