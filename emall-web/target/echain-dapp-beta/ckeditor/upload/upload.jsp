<%@ page language="java" import="java.util.*,java.util.regex.*" pageEncoding="gbk"%>
<%@ page
	import="org.apache.commons.fileupload.DiskFileUpload,java.text.SimpleDateFormat,org.apache.commons.fileupload.FileItem,java.io.File"%>
<%@ page
	import="org.apache.commons.fileupload.FileUploadException,org.apache.commons.fileupload.FileUploadBase.SizeLimitExceededException"%>
<%
String INDEX_LOGO = "/var/www/zounongjia-files/static/image/content_pic";
String path1s = request.getContextPath();
//String basePath1 = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path1s+"/";
String basePath1 = "http://www.zounongjia.com:"+request.getServerPort()+path1s+"/";
response.setHeader("Cache-Control","no-cache"); //HTTP 1.1    
response.setHeader("Pragma","no-cache"); //HTTP 1.0    
response.setDateHeader ("Expires", 0); //prevents caching at the proxy server 
 //��ʼ��Ʒid
String  tproid = "630";
//��¼�û�id
int useid = 231;
String spath = "";
final int MAX_SIZE = 10 * 300 * 1024;// �����ϴ��ļ����Ϊ 3k
final int ONE_MAX_SIZE=300 * 1024;
// �����ϴ����ļ���ʽ���б� 
final String[] allpict = new String[] { ".jpg", ".jpeg", ".gif",".jpeg",".png",".bmp",".JPG", ".JPGE", ".GIF",".JPEG",".PNG",".BMP",".swf" };
String path2 = request.getSession().getServletContext().getRealPath("/edit_image");	
DiskFileUpload fu = new DiskFileUpload();
// ��������ļ��ߴ磬������4MB
//fu.setSizeMax(41943040);
fu.setSizeMax(MAX_SIZE);
// ���û������С��������4kb
fu.setSizeThreshold(MAX_SIZE);      
// ������ʱĿ¼��
fu.setRepositoryPath(path2+"\\temp");
// �õ����е��ļ���
List fileItems;
String message = "";
//��ɵ�ǰʱ�� ��
SimpleDateFormat formater = new SimpleDateFormat("yyyyMMddHHmmssS");
String tday = formater.format(new Date());
useid=useid+10041235;
tday=tday.substring(0, 8)+useid+tday.substring(8,16);

int it=1;
List<String> ls = new ArrayList<String>();
Boolean namenull=false;
try {
fileItems = fu.parseRequest(request);
Iterator iter = fileItems.iterator();
while(iter.hasNext()){
FileItem item = (FileItem) iter.next();
 if (!item.isFormField()) {
 String name = item.getName();
 long size = item.getSize();
 if((name==null||name.equals("")) && size==0){
	 namenull=true;
	 continue;
 }

 String tnam = name.substring(name.lastIndexOf("."), name.length());
 boolean picge = false;	
 for(String sin:allpict){
	 if(tnam.equals(sin)){
		 picge=true;
	 }
 }if(!picge){
 	message="1";

}else{		
	if(size>ONE_MAX_SIZE){
        	  message="2";
         	}
         it++;
         String callback = request.getParameter("CKEditorFuncNum");//��ȡ�ص�JS�ĺ���Num 
       //�����ļ�����ʱ��Ϊ��·����e:/temp
String path  = INDEX_LOGO+"/"+tday.substring(0,4)+"/"+tday.substring(4,6)+"/"+tday.substring(6,8)+"/"+tday+it+tnam;

String savpath  = path2+"/"+tday.substring(0,6)+"/"+tday.substring(6,8)+"/308x308_"+tday+it+tnam;
File file = new File(path);
boolean b = file.getParentFile().isDirectory();
if(!b){
     file.getParentFile().mkdirs();//����Ŀ¼
}
      
try {
   item.write(file);
	
	//path=path.substring(4);
	String imagePath=file.getAbsolutePath();
	Pattern pattern = Pattern.compile("\\\\");
	Matcher matcher = pattern.matcher(imagePath);
	imagePath=matcher.replaceAll("/");
	
	
	    // System.out.println("##########"+spath);
	  String showImagePath=basePath1+path.substring(26);
	  
	  //System.out.println("$$$"+showImagePath);
	  
			        //  System.out.println("##########"+showImagePath);
			           if(basePath1.contains("localhost"))
			              {showImagePath=request.getContextPath()+"/ckeditor/upload/showImage.jsp";
			               out.println("<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction("+callback+",'"+showImagePath+"?showImagePath="+imagePath+"')</script>");
			               break;
			              }
   //System.out.println("!!!!!!!!"+file.getAbsolutePath());
   //session.notifyAll();

   out.println("<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction("+callback+",'"+showImagePath+"')</script>");  
   break; 

} catch (Exception e) {
   message = "5";
   }
}
   }
   
 }
} catch (FileUploadException e) {
 if (e instanceof SizeLimitExceededException) { 
           message="2";
       }  
}
%>
