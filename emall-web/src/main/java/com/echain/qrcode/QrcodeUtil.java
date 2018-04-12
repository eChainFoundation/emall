package com.echain.qrcode;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import com.echain.util.ServiceConstant;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.common.BitMatrix;

public class QrcodeUtil {

	public static String writeQrcode(String flag, Long userId) {
		String qrcodePath = ServiceConstant.qrcodePath;
		String qrcodeUrl = "";
		String qrcodeDBPath = "";
		if(flag.equals("user")) {
//			qrcodePath += ServiceConstant.qrcodeUserPath;
//			qrcodeDBPath = ServiceConstant.qrcodeUserPath;
//			qrcodeUrl = ServiceConstant.qrcodeUserUrl;
		} else if(flag.equals("qicai")) {
//			qrcodePath += ServiceConstant.qrcodeQicaiPath;
//			qrcodeDBPath = ServiceConstant.qrcodeQicaiPath;
//			qrcodeUrl = ServiceConstant.qrcodeQicaiUrl;
		} else if(flag.equals("weixianyuan")) {
//			qrcodePath += ServiceConstant.qrcodeWeixianyuanPath;
//			qrcodeDBPath = ServiceConstant.qrcodeWeixianyuanPath;
//			qrcodeUrl = ServiceConstant.qrcodeWeixianyuanUrl;
		}
		try {
			File file = new File(qrcodePath);
			if(!file.exists())
				file.mkdirs();
			String content = qrcodeUrl + userId;

			MultiFormatWriter multiFormatWriter = new MultiFormatWriter();
			Map hints = new HashMap();
			hints.put(EncodeHintType.CHARACTER_SET, "utf-8");
			BitMatrix bitMatrix = multiFormatWriter.encode(content,
					BarcodeFormat.QR_CODE, 400, 400, hints);
			File file1 = new File(qrcodePath, userId+".jpg");
			MatrixToImageWriter.writeToFile(bitMatrix, "jpg", file1);

			return qrcodeDBPath + "/" + userId+".jpg";
		} catch (Exception e) {
			return null;
		}
	}
}
