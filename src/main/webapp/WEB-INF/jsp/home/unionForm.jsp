<%@ include file="/WEB-INF/jsp/include/taglibs.jsp"%>

<script src="http://maps.google.com/maps/api/js?sensor=false" type="text/javascript"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/gmap/gmap3.js"></script> 

<link type="text/css" href="<%=request.getContextPath()%>/css/carousel/bottom.css" rel="stylesheet" />
<script type="text/javascript" src="<%=request.getContextPath()%>/js/carousel/jquery.pikachoose.js"></script>

<style>
.gmap3{
  margin: 0px auto;
  border: 1px dashed #C0C0C0;
  width: 100%;
  height: 400px;
}
</style>

<script type="text/javascript">


function saveUnion(){
	if($("#nameInstitution").val() =="" ){
		alert("Nombre de institucion es requerido");
		return;
	}
	if(confirm('Esta seguro de guardar!')){
		document.institutionFrm.submit();
	}
} 

function changeCity(){
	var cityId = $('#cityId').val();
	$.ajax({
	    type: "POST",  
	    url: "../homeAjax/searchCity",  
	    data: "cityId=" + cityId
		, 
	    success: function(response){
			if(response.status == "SUCCESS") {
				$('#hiddenLat').val(response.result.latitude);
				$('#hiddenLng').val(response.result.longitude);
				$('#latitude').val(response.result.latitude);
				$('#longitude').val(response.result.longitude);
				loadMap();
			}
		}, 
		error: function(e){  
			alert('Error: ' + e);  
		}
	});
}

function loadMap(){
	var clearMap = {action:'clear'}
	$('#mapCity').gmap3(clearMap);
	$('#mapCity').gmap3(
		{ action: 'addMarker',
		   latLng: [$('#hiddenLat').val(),$('#hiddenLng').val()],
		   map:{
		     center: true,
		     zoom: 12
		   },
		   marker:{
		     options:{
		       draggable:true
		     },
		     events:{
		       dragend: function(marker){
					$('#latitude').val(marker.getPosition().lat());
					$('#longitude').val(marker.getPosition().lng());
		       }
		     }
		   }
		}
	);
        
}

$(document).ready( function() {
	loadMap();
});



</script>

<!--<div class="dashboard-info well">-->

<br>

<form:form commandName="institution" name="institutionFrm" action="../register/saveUnion" method="post" cssClass="form-horizontal">
<input id="hiddenLat" type="hidden" value="${latitude}">
<input id="hiddenLng" type="hidden" value="${longitude}">
				
<div class="row">
  <div class="span4">
			<div>
				<h4>Union Peruana</h4>
				<input type="hidden" id="addresspicker" />
				<input type="hidden" id="locality" disabled=disabled> 
				<input type="hidden" id="country" disabled=disabled>
			</div>
		    <div>
				<label class="control-label" for="input01">Ciudad&nbsp;:&nbsp;</label>
				<div>
					<label>
							<form:select path="city.id" onchange="changeCity()" id="cityId">
							   <form:options items="${cityList}" itemValue="id" itemLabel="cityDescription"/>
							</form:select>
					</label>
				</div>
		    </div>
		    <div>
				<label class="control-label" for="input01">Nombre de Institucion:&nbsp;</label>
				<div >
					<label><form:input path="nameInstitution" autocomplete="off" maxlength="60"/></label>
				</div>
		    </div>
		    <div>
				<label class="control-label" for="input01">Direccion&nbsp;:&nbsp;</label>
				<div>
					<label><input type="text" autocomplete="off" name="address" id="address" /></label>
				</div>
		    </div>

		    <div>
				<label class="control-label" for="input01">Tipo de Institucion&nbsp;:&nbsp;</label>
				<div>
					<label>
							<form:select path="typeInstitution.typeCode">
							   <form:options items="${typeInstitutionList}" itemValue="typeCode" itemLabel="description"/>
							</form:select>
					</label>
				</div>
		    </div>
			
		    <div>
				<label class="control-label" for="input01">latitude&nbsp;:&nbsp;</label>
				<div>
					<label><input type="text" name="latitude" id="latitude" value="${latitude}" readonly=readonly/></label>
				</div>
		    </div>
		    <div>
				<label class="control-label" for="input01">longitude&nbsp;:&nbsp;</label>
				<div>
					<label><input type="text" name="longitude" id="longitude" value="${longitude}" readonly=readonly /></label>
				</div>
		    </div>
		    <div>
				<label class="control-label" for="input01">Telefono&nbsp;:&nbsp;</label>
				<div>
					<label><input type="text" name="phone" id="phone" value="" /></label>
				</div>
		    </div>
		    <div>
				<label class="control-label" for="input01">Descipcion&nbsp;:&nbsp;</label>
				<div>
					<label>
						<textarea class="form-control" rows="4" name="description" id = "description" maxlength="200"></textarea>
					</label>
				</div>
		    </div>
			<div align="center">
				<input type="button" class="btn btn-primary" value="Guardar" onclick="saveUnion()"/>
				<a class="btn btn-inverse" href="<%=request.getContextPath() %>/home/dashboard">Cancelar</a>

			</div>
	</div>
	
	<div class="span8">
		 <div id="mapCity" class="gmap3"></div>
	</div>
</div>

</form:form>