package com.echain.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.echain.entity.Insurance;
import com.echain.entity.Product;
import com.echain.entity.ProductTransaction;
import com.echain.entity.ReceivingAddress;
import com.echain.service.IInsuranceService;
import com.echain.service.IOrderService;
import com.echain.service.IProductService;
import com.echain.service.IUserService;
import com.echain.util.SessionUtil;

@RequestMapping("/order")
@Controller
public class OrderController {

	@Autowired
	private IOrderService orderService;
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private IProductService productService;
	
	@Autowired
	private IInsuranceService insuranceService;
	
	@RequestMapping(value = "show_product.html", produces = "text/html;charset=UTF-8")
    public String showProduct(ModelMap modelMap) throws Exception {
        
		List<Product> products = this.productService.selectProducts();
		if(products != null && products.size() > 0) {
			modelMap.put("products", products);
		}
		return "/web/index";
    }
	
	@RequestMapping(value = "check_buy.html", produces = "text/html;charset=UTF-8")
    public @ResponseBody String checkBuy(
    		@RequestParam(required=false) Long productId,
			ModelMap modelMap) throws Exception {
        
		Long userBuyerId = SessionUtil.getUserId();
		if(userBuyerId == null || userBuyerId == 0)
			userBuyerId = 1l;
		
		List<ProductTransaction> pts = this.orderService.selectProductTransactionByUserid(userBuyerId, productId);
		if(pts != null && pts.size() > 0) {
			return "0";
		}
		
		return "1";
    }
	
	@RequestMapping(value = "to_buy.html", produces = "text/html;charset=UTF-8")
    public String toBuy(
    		@RequestParam(required=false) Long productId,
			ModelMap modelMap) throws Exception {
        
		Long userBuyerId = SessionUtil.getUserId();
		if(userBuyerId == null || userBuyerId == 0)
			userBuyerId = 1l;
		
		Product product = this.productService.selectProductsById(productId);
		if(product != null) {
			modelMap.put("product", product);
		}
		
		Insurance insurance = this.insuranceService.selectInsurancesById(1l);
		if(product != null) {
			modelMap.put("product", product);
		}
		if(insurance != null) {
			modelMap.put("insurance", insurance);
		}
		
		return "/web/order";
    }
	
	@RequestMapping(value = "buy_goods.action", produces = "text/html;charset=UTF-8")
    public String buyGoods(
    		@RequestParam(required=false) Long productId,
    		@RequestParam(required=false) Long insuranceId,
			ModelMap modelMap) throws Exception {
        
		Long userBuyerId = SessionUtil.getUserId();
		if(userBuyerId == null || userBuyerId == 0)
			userBuyerId = 1l;
		
		Product product = this.productService.selectProductsById(productId);
		List<ReceivingAddress> addresses = this.userService.selectReceivingAddressByUserId(userBuyerId);
		
		boolean bool = this.orderService.buyGoods(userBuyerId, productId, insuranceId);
		
		return "/web/order_information";
    }
}
