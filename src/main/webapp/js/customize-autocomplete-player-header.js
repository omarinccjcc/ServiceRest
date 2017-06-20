$(function() {
	$( "#header_search_input" ).autocomplete({
		source: function( request, response ) {
			$.ajax({
				url: contextPath+"/service/players",
				dataType: "json",
			    data: {
					maxRows: 10,
					name: request.term
				},
				success: function( data ) {
					response( $.map( data.players, function( item ) {
						return {
							key: item.id,
							label: 	"<div>"+
									"<img src='"+item.photo+"' width='32' height='32' class='pull-left'/>"+
									"<h5> "+
									item.name.toString().replace(new RegExp('('+request.term+')','i'),'<strong>$1</strong>') + " ("+item.age+")"+
									"<br><small> "+item.cityDescription+"</small>"+
									"</h5></div>",
							value: item.name,
							logo: item.photoName
							//key: item.id,
							//label: item.name.toString().replace(new RegExp('('+request.term+')','i'),'<strong>$1</strong>'),
							//value: item.name
						}
					}));
				}
			});
		},
		minLength: 1 ,
		select: function (event, ui) {
			if(ui.item.key != null && ui.item.key != ''){
	            var form = document.forms["profileFormHeader"];
	        	form.playerId.value = ui.item.key;
	        	form.submit();
			}
        } ,
		open: function() {
			$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
		}  /* ,
		close: function() {
			$( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
		} */
	}).data( "autocomplete" )._renderItem = function( ul, item ) {
    return $( "<li></li>" )
        .data( "item.autocomplete", item )
        .append( '<a href="#"><span class="tag">' + item.label + "</span></a>" )
        .appendTo( ul );
	};

});
