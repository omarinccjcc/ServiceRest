$(function() {
	$( "#cityInput" ).autocomplete({
		source: function( request, response ) {
			$.ajax({
				url: "../service/cities",
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
							latitude:item.latitude,
							longitude:item.longitude,
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
            $('#latitude').val(ui.item.latitude);
            $('#longitude').val(ui.item.longitude);
            $('#hiddenLat').val(ui.item.latitude);
            $('#hiddenLng').val(ui.item.longitude);
            loadMap();
        } ,
		open: function() {
        	$('#city.id').val("");
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