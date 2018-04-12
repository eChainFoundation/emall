mvn clean:clean
mvn package -Dmaven.skip.test=true
scp -r /Users/roc/Documents/workspace/echain/echain-admin/target/echain-admin/WEB-INF/classes/* tomcat@182.254.146.118:/opt/tomcat7/webapps/echain/WEB-INF/classes/
 
scp /Users/roc/Documents/workspace/echain/echain-admin/target/echain-admin/WEB-INF/lib/echain-services-0.0.1.jar tomcat@182.254.146.118:/opt/tomcat7/webapps/echain/WEB-INF/lib/

scp -r /Users/roc/Documents/workspace/echain/echain-admin/target/echain-admin/WEB-INF/magazine/* tomcat@182.254.146.118:/opt/tomcat7/webapps/echain/WEB-INF/magazine/




