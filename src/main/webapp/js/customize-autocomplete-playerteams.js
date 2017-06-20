$(function() {
	$( "#playerName" ).autocomplete({
		source: function( request, response ) {
			$.ajax({
				url: "../service/playersteams",
				dataType: "json",
			    data: {
					maxRows: 10,
					name: request.term
				},
				success: function( data ) {
					$('#playerName_id').val("");
					$('#playerEmail').val("");
					response( $.map( data.players, function( item ) {
						return {
							key: item.id,
							label: 	"<div>"+
									"<img src='"+item.photo+"' width='32' height='32' class='pull-left'/>"+
									"<h5> "+
									item.name.toString().replace(new RegExp('('+request.term+')','i'),'<strong>$1</strong>') +
									"<br><small> "+item.cityDescription+"</small>"+
									"</h5></div>",
							value: item.name,
							logo: item.photoName,
							email: item.email
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
            $('#playerName_id').val(ui.item.key);
            $('#playerEmail').val(ui.item.email);
            //return ui.item.key;
        } ,
		open: function() {
        	$('#playerName_id').val("");
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
