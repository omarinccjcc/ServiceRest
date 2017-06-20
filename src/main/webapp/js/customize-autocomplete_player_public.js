$(function() {
	$( "#city" ).autocomplete({
		source: function( request, response ) {
		 
			$.ajax({
				url: contexPath+"/service/cities",
				dataType: "json",
			    data: {
					maxRows: 10,
					startsWith: request.term
				},
				success: function( data ) {
					response( $.map( data.cities, function( item ) {
						//var label = item.label.toString().replace(new RegExp('('+request.term+')','i'),'<strong>$1</strong>');
						return {
							key: item.cityId,
							label: item.cityName.toString().replace(new RegExp('('+request.term+')','i'),'<strong>$1</strong>'),
							value: item.cityName
						}
					}));
				}
			});
		},
		minLength: 1,
		select: function (event, ui) {
            $('#cityId').val(ui.item.key);
            //return ui.item.key;
        } ,
		open: function() {
        	$('#cityId').val("");
			$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
		} /* ,
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