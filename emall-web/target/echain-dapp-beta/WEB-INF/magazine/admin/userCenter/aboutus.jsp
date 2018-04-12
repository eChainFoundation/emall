<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page import="com.hisodata.entity.admin.LoginUser"%> 
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isELIgnored="false"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="走农家微信、微信营销、微信代运营、微信定制开发、微信托管、微网站、微商城、微营销" name="Keywords">
<meta content="走农家微信，国内最大的微信公众智能服务平台，走农家微信八大微体系：微菜单、微官网、微会员、微活动、微商城、微推送、微服务、微统计，企业微营销必备。" name="Description">
<link rel="stylesheet" type="text/css" href="<%=basePath %>resources_admin/css/wm/index.css" media="all" />
<link rel="stylesheet" type="text/css" href="<%=basePath %>resources_admin/css/wm/bootstrap_min.css" media="all" />
<link rel="stylesheet" type="text/css" href="<%=basePath %>resources_admin/css/wm/bootstrap_responsive_min.css" media="all" />
<link rel="stylesheet" type="text/css" href="<%=basePath %>resources_admin/css/wm/style.css" media="all" />
<link rel="stylesheet" type="text/css" href="<%=basePath %>resources_admin/css/wm/themes.css" media="all" />
<link rel="stylesheet" type="text/css" href="<%=basePath %>resources_admin/css/wm/todc_bootstrap.css" media="all" />
<link rel="stylesheet" type="text/css" href="<%=basePath %>resources_admin/css/wm/inside.css" media="all" />
<title>走农家微信</title>
<script type="text/javascript">var yyuc_jspath = "/@system/";</script>
<script type="text/javascript" src="<%=basePath %>resources_admin/js/jquery.js"></script>
<script type="text/javascript" src="<%=basePath %>resources_admin/js/yyucadapter.js"></script>


</head>
<body>
	
    <div id="main">
        <div class="container-fluid">

            <div class="row-fluid">
                <div class="span12">
                    <div class="box">
                        <div class="box-title">
                            <div class="span10">
                                <h3><i class="icon-book"></i>关于我们</h3>
                            </div>
                            <div class="span2"><a class="btn" href="Javascript:window.history.go(-1)">返回</a></div>
                        </div>

                        <div class="box-content">
                        <div class="bs-docs-example">
       					  <h4 class="text-success">什么是走农家微信?</h4>
                            <p>走农家微信是一个专门针对微信公众账号提供营销推广服务的第三方平台。主要功能是针对微信商家公众号提供与众不同的、有针对性的营销推广服务。通过走农家微信，用户可以轻松管理自己的微信各类信息，对微信公众账号进行维护、开展智能机器人、在线发优惠劵、抽奖、刮奖、派发会员卡、打造微官网、开启微团购等多种活动，对微信营销实现有效监控，极大扩展潜在客户群和实现企业的运营目标。走农家微信平台很好的弥补了微信公众平台本身功能不足、针对性不强、交互不便利的问题，为商家公众账号提供更为贴心的、且是核心需求的功能和服务。在线优惠劵、转盘抽奖、微信会员卡等推广服务更是让微信成为商家推广的利器。智能客服的可调教功能让用户真正从微信繁琐的日常客服工作中解脱出来，真正成为商家便利的新营销渠道。</p>
                            <br>
                          <h4 class="text-success">为什么选择走农家微信？</h4>
                          <h5 class="text-warning">•企业为什么要开通微信公众账号</h5>
                          <h6 class="text-success">O 移动互联网的趋势</h6>
                            <p>平台化电子商务最缺的不是商家是消费者。</p>
                            <p>哪里有人哪里就有商业，哪里就有盈利空间。据第三方统计70%的手机用户开通了个人微信，其年龄涵盖了小学生至老年人，各年龄阶层的人群。截止目前腾讯已拥有4亿的微信用户，7亿的qq用户。</p>
                            <p>消费者才是企业追逐的目标，人的数量决定了财富的数量。</p>
                              <br>
                            <h6 class="text-success">O 微信营销的趋势与巨大利润空间</h6>
                            <p>微信营销是继微博后的最大营销机遇！</p>
                            <p>淘宝的第一批用户是一批什么都敢尝试的大学生，如今他们已经大多成为千万、亿万的商务人群。</p>
                          <p>微信营销时代已经到来，其势不可挡的趋势，已严重冲击着传统的销售渠道。错过了淘宝时代，错过了微博时代，不要错过微信营销时代。基于微信营销的第一批企业必然成为未来的微信首批富豪。</p>
                            <br>
                          <h6 class="text-success">O 微信的粘性和使用惯性</h6>
                            <p>没有人会天天上淘宝，也没有人会天天刷微博——但微信可以。</p>
                            <p>首先微信是一款沟通工具，实时通讯的特性决定了其使用价值，朋友圈的分享让社会化关系代替了点对点的交互，这不仅是一种关系，更是影响力！更是控制力！基于关系网的微信，平民也有明星的感觉。其用户黏度没有任何一个产品可以比拟。微信用其巨大的威力吸引、稳定着消费者，消费者已经准备好了，企业还不来吗？</p>
                              <br>
                            <h6 class="text-success">O 企业微信公众账号的作用与开通意义</h6>
                            <p>企业微信公众账号是企业媒体发布平台、销售信息发布平台、危机公关平台、消费者互动平台、促销活动开展平台、新品展示平台、产品在线销售平台、网上支付平台、调研平台、公司企业文化传播平台、人才招聘平台等，一切企业关注的，企业需要的在企业微信公众账号都可以实现！！</p>
                            
                            <h6 class="text-success">O 企业为什么要开通、运营企业微信公众账号</h6>
                            <p>重点的关键点——品牌、产品销售、人才、客户</p>
                            <p>1) 企业微信公众账号的媒体属性:10万个粉丝等于地方性报纸;100万个粉丝等于全国性的报纸头条新闻。</p> 
                            <p>2) 产品销售平台:在线购买、在线支付、促销活动。最活跃的、反应速度最快、互动最强的电子商务平台</p>
                            <p>3) 人才招聘的平台：免费的人才招聘渠道，未来人才招聘的主流渠道</p>
                            <p>4) 客户：客户在线互动、客户体验、新品试用、消费者意见调研、有奖活动、在线咨询甚至网上订餐、送货服务、钟点服务、上门维修等。</p>
                               <br>
                            <h6 class="text-success">O 企业微信公众平台的现状</h6>
                            <p>功能单一、操作复杂、用户体验差、没有差异化功能。</p>
                              <br>
                          <h5 class="text-warning">•走农家微信全面解决当前企业微信营销困境</h5>
                            
                            <table id="listTable" class="table table-bordered table-hover  dataTable">
                              <tbody><tr>
                                <th scope="col">当前企业遇到的困境</th>
                                <th scope="col">解决方案</th>
                              </tr>
                              <tr>
                                <td>传统网络营销遭遇瓶颈</td>
                                <td><strong class="text-success">微营销成为企业营销新渠道</strong> 走农家微信为企业微信营销提供智能的服务平台和完整的解决方案</td>
                              </tr>
                              <tr>
                                <td>微信营销有理论、无方法，想法无法落地</td>
                                <td><strong class="text-success">走农家微信——理论加实践的产物</strong> 走农家微信根据市场行业需求，制定行业标准解决方案。</td>
                              </tr>
                              <tr>
                                <td>腾讯对企业开发要求门槛过高</td>
                                <td><strong class="text-success">走农家微信平台解决企业开发烦恼</strong> 走农家微信大部分技术研发人员来自百度、腾讯，强大的技术后盾企业微信开发提供有力的保障。</td>
                              </tr>
                              <tr>
                                <td>腾讯公众平台无法满足企业需求</td>
                                <td><strong class="text-success">行业需求，定制开发</strong> 根据市场上目前行业的需求，设定相应的功能，从而满足了企业微信营销的需求。</td>
                              </tr>
                              <tr>
                                <td>企业定制开发成本高、周期长</td>
                                <td><strong class="text-success">走农家微信——微信智能服务平台</strong> 走农家微信在定制开发的基础上，抽取大部分行业定制需求，对产品进行标准化，企业无需开发即可实现强大的功能。</td>
                              </tr>
                              <tr>
                                <td>微信5.0群发功能限制，个性化服务凸现</td>
                                <td><strong class="text-success">走农家微信——功能强大，满足个性需求</strong> 针对微信商家公众号提供与众不同的、有针对性的、更为贴心的、核心需求的功能和服务</td>
                              </tr>
                            </tbody></table>
                              <br>
                          <h5 class="text-warning">•走农家微信平台的优势</h5>
                            
                            
                            <h6 class="text-success"> O 操作简洁</h6>
                            <p>走农家微信平台的管理界面简单易用、操作方便，大量人性化设计，一分钟开启微信营销，无需安装任何软件，全自动“云”平台，多账号管理，只需要简单的设置即可完成复杂的微信营销推广功能。</p>
                             <h6 class="text-success">O 功能强大</h6>
                            <p>通过走农家微信平台，用户可以轻松管理自己的微信各类信息，对微信公众账号进行维护、开展智能机器人、在线发优惠劵、抽奖、刮奖、派发会员卡、打造微官网、开启微团购等多种活动，对微信营销实现有效监控，在线优惠劵、转盘抽奖、微信会员卡等推广服务更是让微信成为商家推广的利器，智能客服的可调教功能让用户真正从微信繁琐的日常客服工作中解脱出来，真正成为商家便利的新营销渠道，极大扩展潜在客户群和实现企业的运营目标。</p>
                            
                             <h6 class="text-success">O 专业团队</h6>
                            <p>一站式管理，平台支持，拥有多年网络营销经验的管理团队，强大的技术支持，专注于社会化媒体的研究，自有全国百万订阅量公众账号、全国主要城市区域号，以及微信电商团队实际操作，运营上海本地公众账号用户过万，熟练掌握获取本地用户的方法，不做整合营销，我们只专注于微信。</p>
                             <h6 class="text-success">O 资深背景</h6>
                            <p>走农家微信，技术团队由国内知名IT公司（百度、腾讯）核心成员组成、其技术总监为原百度商务搜索部技术经理，商务总监为原腾讯IMG商务经理，运营团队有着丰富的互联网推广经验和资源，并与腾讯保持密切合作，因此可以为商家提供一个更智能、更便捷的微信公众服务平台。</p>
                            
                              <br>
                             <h5 class="text-warning">•走农家微信提供的服务</h5>
                             <h6 class="text-success">O 专业企业微信提案</h6>
                             <p><strong>行业分析</strong></p>
                             <p>根据企业发展的现状、未来的发展趋势，以及遇到的竞争对手情况，走农家微信帮助企业分析发展中将会遇到哪些问题？以及如何把握行业的最新动态？如何采取最佳的解决策略？走农家微信将为您提供一套完整的、贴心的解决方案。</p>
                             <p><strong>解决方案</strong></p>
                             <p>走农家微信为企业提供行业报告、行业动态、行业案例，并与战略合作伙伴在全国重点行业城市，联手打造行业信息化战略目标，为参与系列活动的行业企业提供高质量的微信营销知识培训。</p>
                             <h6 class="text-success">O 资深客服服务</h6>
                             <p>1、 2年以上客服经验。</p>
                             <p>2、 跟踪用户需求，提供专业优化方案。</p>
                             <br>
                            <h5 class="text-warning">•VIP服务标准</h5>
                            <h6 class="text-success">O 一对一客服专业服务</h6>
                            <h6 class="text-success">O 7x12小时专业服务</h6>
                            <h6 class="text-success">O 定期提供相应的数据报告</h6>



                            
                            
                            
          </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div id="footer">
        <p>
            Copyright © 2013-2014 走农家微信. All Rights Reserved
        </p>
        <a href="" class="gototop"><i class="icon-arrow-up"></i></a>
    </div>







<div id="fallr-overlay"></div></body></html>