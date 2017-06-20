<!DOCTYPE html>
<%@ include file="/WEB-INF/jsp/include/taglibs.jsp"%>
<html lang="en">
<head>
<!--	<meta http-equiv="content-type" content="text/html; charset=ISO-8859-1">-->
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>demo.com</title>
	<link rel="icon" href="<%=request.getContextPath()%>/images/favicon.ico" type="image/x-icon" />
	<%@ include file = "/WEB-INF/jsp/include/include.jsp"%>
</head>
<body>
	<header id="site_head">
		<%@ include file = "/WEB-INF/jsp/include/header.jsp"%>
	</header>
	<div class="container">
		
<div class="containerBody">
		<decorator:body/>
</div>
		
		<footer>
		<%@ include file = "/WEB-INF/jsp/include/footer.jsp"%>
		</footer>
	</div>
	
</body>
<script type="text/javascript">
  var uvOptions = {};
  (function() {
    var uv = document.createElement('script'); uv.type = 'text/javascript'; uv.async = true;
    uv.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'widget.uservoice.com/BxvBF8yC33HiU61IeyMQ.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(uv, s);
  })();
</script>
</html>
        