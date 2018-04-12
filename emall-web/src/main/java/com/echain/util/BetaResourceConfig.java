package com.echain.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.log4j.Logger;

public class BetaResourceConfig {
	private static Logger LOGGER = Logger.getLogger(BetaResourceConfig.class);

	private String[] resouces = new String[] { "echain-dapp-beta.properties" };
	private static BetaResourceConfig config;
	private Properties properties = new Properties();

	private BetaResourceConfig() {

	}

	public String getValue(String key) {
		return this.properties.getProperty(key);
	}

	private void init() {
		properties.clear();
		for (String resouce : resouces) {
			InputStream inputstream = null;
			try {
				inputstream = this.getClass().getClassLoader()
						.getResourceAsStream(resouce);
				properties.load(inputstream);
				inputstream.close();
			} catch (IOException e) {
				LOGGER.fatal(e.getMessage(), e);
				System.exit(0);
			}
		}
	}

	public synchronized static BetaResourceConfig getInstance() {
		if (config == null) {
			config = new BetaResourceConfig();
			config.init();
		}

		return config;
	}

	public String getGongzhonghaoCreateUrl() {
		return getValue("gongzhonghao_create_url");
	}

	public static void main(String[] args) {

		String weixinPublishUrl = BetaResourceConfig.getInstance()
				.getGongzhonghaoCreateUrl();
		System.out.println(weixinPublishUrl);
	}
}
