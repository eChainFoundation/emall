package com.echain.util;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;


/**
 * Created by ning.li on 2016/9/12.
 */
public class ApplicationUtil implements ApplicationContextAware {

    private static ApplicationContext applicationContext;
  
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        ApplicationUtil.applicationContext = applicationContext;
        
    }

    public static Object getBean(String name) {
        return applicationContext.getBean(name);
    }
}
