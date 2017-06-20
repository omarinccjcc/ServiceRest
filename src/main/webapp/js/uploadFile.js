/**
 * 
 */
/*
function doAjaxPost() {  
	  // get the form values  
	
	 var filename = $("#file1").val();
	  
	  alert(filename);
	  $.ajax({  
		    type: "POST",  
		    data: {file: filename},
		    contentType: 'multipart/form-data',
		    success: function(response)
		    {
		      // we have the response 
			 
		      if(response.status == "SUCCESS")
		      {
		    	   alert("exito file");
		    	   $('#outer').modal('hidden');
				   $('#cortarImagen').modal('show');
				   $('#cortarImagen').modal('keyboard');
				   
				   $('#exito').html("Se grabo exitosamente!. ");
		      }
		      else
		      {
		    	
		    	  errorInfo = "";
		    	  errorInfo += "<br>" + response.errorMessageResult;
		    	  $('#error').html(errorInfo);
		    	  $('#info').hide('slow');
		    	  $('#error').show('slow');
		      }	      
		    },  
		    error: function(e){  
		      alert('Error: ' + e);  
		    }  
		  });  
	 
	} 
	*/


 $(function () {
	   alert('test success');
         $('#btnSave').click(function () {
             $('#frmMain').ajaxSubmit({
                 success: function (data, statusText, xhr, $form) {
                     alert('test success');
                 },
                 fail: function (data, statusText, xhr, $form) {
                     alert('test fail');
                 }
             });
         });
 });      