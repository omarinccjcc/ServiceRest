<%@ include file="/WEB-INF/jsp/include/taglibs.jsp"%>

<script type="text/javascript" src="<%=request.getContextPath().toString()%>/js/jquery.js"></script>
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
<script type="text/javascript" src="<%=request.getContextPath().toString()%>/js/jquerygmap/jquery.gmap.js"></script>

<script type="text/javascript" charset="utf-8">
$(function() {
	$("#map_extended").gMap({
		scrollwheel: true,
		maptype: 'ROADMAP',
		markers: [
			${markers}
		],
		icon: {
			image: "<%=request.getContextPath()%>/images/gmap_pin.png", 
			iconsize: [26, 46],
			iconanchor: [6,27]
		},
		latitude: ${latitude},
		longitude: ${longitude},
		zoom: 13
	});
});
</script>

<script >
function search() {
	document.institution.submit();
}
</script>

<br>
<form method="post" action="<%=request.getContextPath()%>/home/search" class="form-inline" name="institution">
<div class="container-fluid">
	<!--	<input type="text" autocomplete="off" name="city" value="" id="city" placeholder="${state}" />-->
	<!--	<input type="hidden" autocomplete="off" name="cityId" value="${cityId}" id="cityId" />-->
		<select name="cityId">
			<option value="">Todo</option>
			<c:forEach items="${cityList}" var="item">
			<option value="${item.id}" <c:if test="${not empty cityId and cityId eq item.id}">selected="selected"</c:if>>${item.cityDescription}</option>
			</c:forEach>
		</select>
	
		&nbsp;
		<select name="typeInstitution">
			<option value="">Todo</option>
			<c:forEach items="${typeInstitutionList}" var="item">
			<option value="${item.typeCode}" <c:if test="${not empty typeInstitution and typeInstitution eq item.typeCode}">selected="selected"</c:if>>${item.description}</option>
			</c:forEach>
		</select>
	
		&nbsp;
		<input type="button" class="btn btn-info" onclick="javascript:search()" value="Buscar" />
		
		<div class="pull-right">
			<a class="btn btn-primary" href="<%=request.getContextPath()%>/register/unionForm">Registrar Institucion</a>
		</div>	
	</div>	
</form>

<div class="container-fluid">
	<div>
		<h4>Lista de Instituciones de la Union peruana</h4>
	</div>
	<div id="map_extended" class="map"></div>
	<br>
</div>	


<style>
.map {
	width: 100%;
	height: 460px;
	border: 1px solid #000;
	margin-bottom: 0px;
}

.map p {
	margin: 10px;
	color: #333;
}
</style>
