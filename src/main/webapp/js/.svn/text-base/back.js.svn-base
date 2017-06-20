
$(document).ready(function()
{
	var noChange = true;
	
	
	$("form").click(function(){
		noChange = false;
	});

	$("a").click(function(e){
		if(!$(this).hasClass("no-back-popup")){
			if (noChange){
				return true;
			}
			else{
				return confirm(gettext("You have unsaved changes. Are you sure you want to leave this page?"));
			}
		}
	});
});
