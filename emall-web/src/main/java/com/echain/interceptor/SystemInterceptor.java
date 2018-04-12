package com.echain.interceptor;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Repository;


/**
* 会话session 监听
* @author zhangchao
* @date 2013-2-17 下午2:29:35
*/
@Repository
public class SystemInterceptor extends HandlerInterceptorAdapter {
 
	public boolean preHandle(HttpServletRequest request,HttpServletResponse response, Object handler) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=UTF-8");
		// 后台session控制
		String[] noFilters = new String[] {"/Jrj/preLogin","/resources","/JrjWeb/findUser"};
		String uri = request.getRequestURI();
			boolean beFilter = true;
			System.currentTimeMillis();
			for (String s : noFilters) {
				//System.out.println(uri +"====:"+s);
				if (uri.contains(s)) {
					beFilter = false;
					//System.out.println("111"+beFilter);
					break;
				}
			}
			
			if (beFilter) {
				Object obj = request.getSession().getAttribute("admin");
				if (null == obj) {
					// 未登录
//					response.sendRedirect("/Jrj/preLogin");
//					return false;
				} else {
					// 添加日志
					//System.out.println("22222");
				}    
			}
		return super.preHandle(request, response, handler);
	}

}
