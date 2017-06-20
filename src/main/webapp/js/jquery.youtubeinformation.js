function getYoutubeInformation(urlVideo,paramUrlYoutube){
	var video_id=getYoutubeVideoID(urlVideo);
    $.getJSON('http://gdata.youtube.com/feeds/api/videos/'+video_id+'?v=2&alt=jsonc',function(data,status,xhr){
        $(paramUrlYoutube).html(buidHTMLComponent(data,urlVideo,paramUrlYoutube,video_id)).slideDown(400);
    });
}

function splitFunction(descrption,descriptionSplit){
        var val=descrption;
        return val.substring(0,descriptionSplit)
}
function getYoutubeVideoID(url){
    return getUrlVars(url)["v"];
}
function getUrlVars(url) {
    var vars = {};
    var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function buidHTMLComponent(data,urlVideo,paramUrlYoutube,video_id){
	var objtId = paramUrlYoutube+"-y";
	var html = "";
	html=html+"<div id='"+objtId.substr(4)+"' class='vidframe'><iframe width='380' height='290' src='http://www.youtube.com/embed/"+video_id+"' frameborder='0' allowfullscreen></iframe></div>";
	html=html+"<table>";
	html=html+"<tr>";
	html=html+"<td rowspan='3'><a href=\"javascript:buildYoutubePlayer('"+objtId+"','i-"+objtId.substr(4)+"');\"><img src='"+data.data.thumbnail.sqDefault+"' id = 'i-"+objtId.substr(4)+"' width='100'/></a></td>";
	html=html+"<td><a href='"+data.data.player.default+"' target='_blank'><b>"+data.data.title+"</b></a></td>";
	html=html+"</tr>";
	html=html+"<tr>";
	html=html+"<td><font color='gray'>"+urlVideo+"</font></td></tr>";
	html=html+"<tr><td>"+splitFunction(data.data.description,'145')+"..."+"</td>";
	html=html+"</tr>";
	html=html+"</table>";
	return html;
}

function buildYoutubePlayer(objId,img){
	$('img#'+img).hide();
	$(objId).toggle(400);
}