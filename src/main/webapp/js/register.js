/**
 * 
 */
function doAjaxPost() {  

	  var email = $('#email').val();
	  var password  = $('#password').val();
	  var cityId     = $('#cityId').val();
	  var city     = $('#city').val();
	  var passwordConfirm = $('#passwordConfirm').val();
	  var firstName     = $('#firstName').val();
	  var lastName     = $('#lastName').val();
	  
	  if(password!=passwordConfirm){
    	  $('#error').html("Las Contrase&ntilde;as no son iguales, ingrese de nuevo");
    	  $('#error').show('slow');
    	  $('#password').val("");
    	  $('#passwordConfirm').val("");
    	  return ;
	  }
	  
	  if(city.trim()==''){
    	  $('#error').html("Por favor, ingrese un ciudad v&aacute;lida.");
    	  $('#error').show('slow');
		  return ;
	  }
	  $('#progressDiv').show('slow');
	  document.getElementById('buttonRegister').disabled=true;
	  
	  
	  $.ajax( {
		type : "POST",
		url : contexPath + "/saveRegister",
		data : "email=" + email + "&password=" + password + "&city.id="
				+ cityId + "&firstName=" +firstName+ "&lastName=" +lastName,
		success : function(response) {
			if (response.status == "SUCCESS") {
				window.location.href = "confirmation";
			} else {
				$('#progressDiv').hide('slow');
				document.getElementById('buttonRegister').disabled=false;
				
				errorInfo = "";
				errorInfo += "<br>" + response.errorMessageResult;
				$('#error').html(errorInfo);
				$('#info').hide('slow');
				$('#error').show('slow');
			}
		},
		error : function(e) {
			alert('Error: ' + e);
		}
	});  
}  