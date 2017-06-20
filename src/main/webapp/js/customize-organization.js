function organizationUrl() {
	var url = $('#url').val();
	$.ajax( {
		type : "POST",
		url : "../service/organizationUrl",
		data : "url=" + url,
		success : function(response) {
			if (response.status == "FAILD") {
				$('#error').html(response.errorMessageResult);
			}
		}
	});	
	  
}


function clean() {
	$('#error').html("");
}
