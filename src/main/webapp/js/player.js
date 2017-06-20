/**
 * 
 */
function doAjaxPost() {  
	  // get the form values  
	 
	  var firstName     = $('#firstName').val();
	  var lastName      = $('#lastName').val();
	  var email         = $('#email').val();
	  var movil         = $('#movil').val();
	  var sex           = $('input:radio[name=sex]:checked').val();
	  var year          = $('#year option:selected').val();
	  var month         = $('#month option:selected').val();
	  var day           = $('#day option:selected').val();
	  var status        = $('input:radio[name=status]:checked').val();
	  var motivo        = $('#motivo').val();
	  var cityId        = $('#cityId').val();
	  var positionId    = $('#positionId option:selected').val();
	  var skilledFoodId = $('#skilledFoodId option:selected').val();
	  var fanTypeId   = $('#fanTypeId option:selected').val();
	  var amount      = $('#amount').val();
	  var description = $('#description').val();
	 
	  alert(email);
	  $.ajax(
		  {  
		    type: "POST",  
		     url: contexPath + "/savePlayer",  
		    data: "firstName=" + firstName +
		          "&lastName=" + lastName +
		          "&email=" + email +
		          "&movil=" + movil +
		          "&sex=" + sex +
		          "&birthDate2=" +day+"/"+month+"/"+year+
		          "&playerStatus.typeCode=" + status +
		          "&motivo=" + motivo +
		          "&city.id=" + cityId +
		          "&playerPosition.typeCode=" + positionId +
		          "&skilledFoodType.typeCode=" + skilledFoodId +
		          "&fanType.typeCode=" + fanTypeId +
		          "&amount=" + amount +
		          "&description=" + description
		          ,  
		      success: function(response){
		      // we have the response 
			 
		      if(response.status == "SUCCESS")
		      {
		    	  $('#exito').html("Se grabo exitosamente!. ");
		    	  $('#error').hide('slow');
		    	  $('#exito').show('slow');
		      }
		      else
		      {
		    	  
		    	  $("#firstNameError").addClass("error");
		    	  errorInfo = "";
		    	  errorInfo += "<br>" + response.errorMessageResult;
		    	  $('#error').html(errorInfo);
		    	  $('#exito').hide('slow');
		    	  $('#error').show('slow');
		      }	      
		    },  
		    error: function(e){  
		      alert('Error: ' + e);  
		    }  
		  });  
	 
	}  