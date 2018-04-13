package com.echain.util;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.http.Consts;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;

import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

public class SubmailClient {
    private static Logger apiErrLogger = Logger.getLogger("SubmailClient");

    public static void sendRejectApply(String phoneno, String ticketNo, Integer time, String country) throws IOException{
        StringBuilder sb = new StringBuilder();
//        sb.append("{\"code\":\"").append(ticketNo).append("\"}");
        sb.append("{\"code\":\"").append(ticketNo).append("\",\"time\":\"").append(time).append("\"}");

        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("appid", appid));
        params.add(new BasicNameValuePair("signature", signature));
        params.add(new BasicNameValuePair("project", project7));
        params.add(new BasicNameValuePair("to", phoneno));
        params.add(new BasicNameValuePair("vars", URLEncoder.encode(sb.toString(), "UTF-8")));

        String send_url = SEND_MESSAGE_URL;
        if(!country.equals("+86")) {
        	send_url = SEND_INTERNATIONAL_URL;
        }
        HttpPost httpPost = new HttpPost(send_url);
        httpPost.setConfig(requestConfig);
        httpPost.addHeader("charset", "UTF-8");
        httpPost.setEntity(new UrlEncodedFormEntity(params, Consts.UTF_8));

        HttpResponse response = httpClient.execute(httpPost);
        String responseStr = EntityUtils.toString(response.getEntity(), "UTF-8");

        Map<String, String> result = new GsonBuilder().create().fromJson(responseStr,
                new TypeToken<Map<String, String>>() {
                }.getType());

        apiErrLogger.info(result);
        String status = result.get("status");

        apiErrLogger.info(status);

        if (!"success".equals(status)) {
            throw new IOException("发送短信验证码失败！\t code: " + result.get("code") + "\t msg: " + result.get("msg"));
        }

    }

    public static void sendVerifyCode(String phoneno, String verifyCode) throws IOException {
        apiErrLogger.info(phoneno);
        apiErrLogger.info(verifyCode);
        StringBuilder sb = new StringBuilder();
        sb.append("{\"code\":\"").append(verifyCode).append("\"}");

        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("appid", appid));
        params.add(new BasicNameValuePair("signature", signature));
        params.add(new BasicNameValuePair("project", project));
        params.add(new BasicNameValuePair("to", phoneno));
        params.add(new BasicNameValuePair("vars", URLEncoder.encode(sb.toString(), "UTF-8")));

        HttpPost httpPost = new HttpPost(SEND_MESSAGE_URL);
        httpPost.setConfig(requestConfig);
        httpPost.addHeader("charset", "UTF-8");
        httpPost.setEntity(new UrlEncodedFormEntity(params, Consts.UTF_8));

        HttpResponse response = httpClient.execute(httpPost);
        String responseStr = EntityUtils.toString(response.getEntity(), "UTF-8");

        Map<String, String> result = new GsonBuilder().create().fromJson(responseStr,
                new TypeToken<Map<String, String>>() {
                }.getType());

        apiErrLogger.info(result);
        String status = result.get("status");

        apiErrLogger.info(status);

        if (!"success".equals(status)) {
            throw new IOException("发送短信验证码失败！\t code: " + result.get("code") + "\t msg: " + result.get("msg"));
        }

    }

    //发送优惠码
    public static void sendPromoCode(String phoneno, String promoCode) throws IOException {
        apiErrLogger.info(phoneno);
        apiErrLogger.info(promoCode);
        StringBuilder sb = new StringBuilder();
        sb.append("{\"code\":\"").append(promoCode).append("\"}");

        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("appid", appid));
        params.add(new BasicNameValuePair("signature", signature));
        params.add(new BasicNameValuePair("project", project4));
        params.add(new BasicNameValuePair("to", phoneno));
        params.add(new BasicNameValuePair("vars", URLEncoder.encode(sb.toString(), "UTF-8")));

        HttpPost httpPost = new HttpPost(SEND_MESSAGE_URL);
        httpPost.setConfig(requestConfig);
        httpPost.addHeader("charset", "UTF-8");
        httpPost.setEntity(new UrlEncodedFormEntity(params, Consts.UTF_8));

        HttpResponse response = httpClient.execute(httpPost);
        String responseStr = EntityUtils.toString(response.getEntity(), "UTF-8");

        Map<String, String> result = new GsonBuilder().create().fromJson(responseStr,
                new TypeToken<Map<String, String>>() {
                }.getType());

        apiErrLogger.info(result);
        String status = result.get("status");

        apiErrLogger.info(status);

        if (!"success".equals(status)) {
            throw new IOException("发送短信失败！\t code: " + result.get("code") + "\t msg: " + result.get("msg"));
        }

    }


    public static void sendPhoneno(String phoneno, String ticketNo) throws IOException {//,String money

        StringBuilder sb = new StringBuilder();
        sb.append("{\"code\":\"").append(ticketNo).append("\"}");
        //sb.append("{\"code\":\"").append(ticketNo).append("\",\"money\":\"").append(money).append("\"}");

        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("appid", appid));
        params.add(new BasicNameValuePair("signature", signature));
        params.add(new BasicNameValuePair("project", project3));
        params.add(new BasicNameValuePair("to", phoneno));
        params.add(new BasicNameValuePair("vars", URLEncoder.encode(sb.toString(), "UTF-8")));

        HttpPost httpPost = new HttpPost(SEND_MESSAGE_URL);
        httpPost.setConfig(requestConfig);
        httpPost.addHeader("charset", "UTF-8");
        httpPost.setEntity(new UrlEncodedFormEntity(params, Consts.UTF_8));

        HttpResponse response = httpClient.execute(httpPost);
        String responseStr = EntityUtils.toString(response.getEntity(), "UTF-8");

        Map<String, String> result = new GsonBuilder().create().fromJson(responseStr,
                new TypeToken<Map<String, String>>() {
                }.getType());

        String status = result.get("status");
        if (!"success".equals(status)) {
            throw new IOException("发送短信信息失败！\t code: " + result.get("code") + "\t msg: " + result.get("msg"));
        }

    }

    public static void send(String phoneno) throws IOException {
    	
        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("appid", appid));
        params.add(new BasicNameValuePair("signature", signature));
        params.add(new BasicNameValuePair("project", project1));
        params.add(new BasicNameValuePair("to", phoneno));


        HttpPost httpPost = new HttpPost(SEND_MESSAGE_URL);
        httpPost.setConfig(requestConfig);
        httpPost.addHeader("charset", "UTF-8");
        httpPost.setEntity(new UrlEncodedFormEntity(params, Consts.UTF_8));

        HttpResponse response = httpClient.execute(httpPost);
        String responseStr = EntityUtils.toString(response.getEntity(), "UTF-8");

        Map<String, String> result = new GsonBuilder().create().fromJson(responseStr,
                new TypeToken<Map<String, String>>() {
                }.getType());

        String status = result.get("status");
        if (!"success".equals(status)) {
            throw new IOException("！\t code: " + result.get("code") + "\t msg: " + result.get("msg"));
        }

    }

    //大地活动
    public static void dadiInsuranceActivity(String phoneno, String money, String code) throws IOException {
        apiErrLogger.info(phoneno);
        apiErrLogger.info(money);
        apiErrLogger.info(code);
        StringBuilder sb = new StringBuilder();
        sb.append("{\"code\":\"").append(code).append("\",\"money\":\"").append(money).append("\"}");

        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("appid", appid));
        params.add(new BasicNameValuePair("signature", signature));
        params.add(new BasicNameValuePair("project", project5));
        params.add(new BasicNameValuePair("to", phoneno));
        params.add(new BasicNameValuePair("vars", URLEncoder.encode(sb.toString(), "UTF-8")));

        HttpPost httpPost = new HttpPost(SEND_MESSAGE_URL);
        httpPost.setConfig(requestConfig);
        httpPost.addHeader("charset", "UTF-8");
        httpPost.setEntity(new UrlEncodedFormEntity(params, Consts.UTF_8));

        HttpResponse response = httpClient.execute(httpPost);
        String responseStr = EntityUtils.toString(response.getEntity(), "UTF-8");

        Map<String, String> result = new GsonBuilder().create().fromJson(responseStr,
                new TypeToken<Map<String, String>>() {
                }.getType());

        apiErrLogger.info(result);
        String status = result.get("status");

        apiErrLogger.info(status);

        if (!"success".equals(status)) {
            throw new IOException("发送短信验证码失败！\t code: " + result.get("code") + "\t msg: " + result.get("msg"));
        }
    }
    private static HttpClient httpClient;

    static {
        PoolingHttpClientConnectionManager connManager = new PoolingHttpClientConnectionManager();
        connManager.setMaxTotal(100);
        connManager.setDefaultMaxPerRoute(10);
        httpClient = HttpClientBuilder.create().setConnectionManager(connManager).build();
    }

    private static RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(30000).setConnectTimeout(30000)
            .setConnectionRequestTimeout(30000).build();

    private static final String appid = "21878";

    // 模版代码
    private static final String project = "AeKAs3";
    // 模版代码
    private static final String project2 = "zp0iD1";
    // 模版代码
    private static final String project1 = "Pr3Pc3";
    // 模版代码
    private static final String project3 = "UDe563";
    //
    private static final String project4 = "qJqsW2";
    //大地活动
    private static final String project5 = "7fURU2";

    //申请驳回
    private static final String project6 = "F8jox2";
    //EChain验证码
    private static final String project7 = "k6Cqy";

    // 用户密钥
    private static final String signature = "2f3b38ab436ae0c6e8b543cbd9b50d8e";

    private static final String SEND_MESSAGE_URL = "http://api.mysubmail.com/message/xsend.json";
    
    private static final String SEND_INTERNATIONAL_URL = "http://api.mysubmail.com/internationalsms/xsend";

}
