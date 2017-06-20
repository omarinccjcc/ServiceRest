function validateField(obj){
	var val = trim(obj);
	if(val!=""){
		return true;
	}
	return false;
}
function trim(s)
{
	var l=0; var r=s.length -1;
	while(l < s.length && s[l] == ' ')
	{	l++; }
	while(r > l && s[r] == ' ')
	{	r-=1;	}
	return s.substring(l, r+1);
}
function doAjaxPost() {  
	  // get the form values  
	  var postText = $('#post_text_1').val();
//	  var permition = $('#permition_1 option:selected').val();
	  var permition = $('#permition_01').val();
	  if(validateField(postText)){
		  $.ajax({  
			  type: "POST",  
			  url: contexPath + "/post/postStatusSave",  
			  data: "postText=" + postText + "&permition=" + permition,  
			  success: function(response){
				  // we have the response 
				  if(response.status == "SUCCESS"){
					  $('#post-body').hide();
					  $('#post-body').html(createHTMLPostBody(response.result)).show("slow");
					  createAttachments(response.result.posts,imagesUrl);
					  buildHTMLExtendPOst(response.result.postSize, response.result.start);
					  $('#post_text_1').val('');
					  $('#response_message').val('');
				  }else{
					  buildErrorResponseMessage();
				  }	      
			  },  
			  error: function(e){  
//				  alert('Error: ' + e);  
			  }  
		  });  
	  }
}


function doAjaxPostYoutube() {  
	  // get the form values  
	  var postText = $('#post_text_3').val();
//	  var permition = $('#permition_3 option:selected').val();
	  var permition = $('#permition_03').val();
	  var sourseVideo = $('#sourseVideo').val();
	  if(validateField(postText) || validateField(sourseVideo)){
		  $.ajax({  
			  type: "POST",  
			  url: contexPath + "/post/postStatusYoutubeSave",  
			  data: "postText=" + postText + "&permition=" + permition+"&url="+sourseVideo,  
			  success: function(response){
				  // we have the response 
				  if(response.status == "SUCCESS"){
					  $('#post-body').hide();
					  $('#post-body').html(createHTMLPostBody(response.result)).show("slow");
					  createAttachments(response.result.posts,response.result.imagesUrl);
					  buildHTMLExtendPOst(response.result.postSize, response.result.start);
					  $('#post_text_3').val('');
					  $('#sourseVideo').val('');
					  $('#youtubeComponent').html("");
					  $('#response_message').val('');
				  }else{
					  buildErrorResponseMessage();
				  }	      
			  },  
			  error: function(e){  
//				  alert('Error: ' + e);  
			  }  
		  });  
		  
	  }
}

function doInitObjects() {  
	  $.ajax({  
	    type: "POST",  
	    url: contexPath + "/post/postInitObjects",  
	    data: "postText=a&permition=a",  
	    success: function(response){
	      // we have the response 
	      if(response.status == "SUCCESS"){
	    	  $('#post-body').hide();
	    	  $('#post-body').html(createHTMLPostBody(response.result)).show("slow");
	    	  createAttachments(response.result.posts,response.result.imagesUrl);
	    	  buildHTMLExtendPOst(response.result.postSize, response.result.start);
	    	  $('#post_text_1').val('');
	    	  $('#response_message').val('');
	      }else{
	    	  buildErrorResponseMessage();
	      }	      
	    },  
	    error: function(e){  
//	      alert('Error: ' + e);  
	    }  
	  });  
	}


function createHTMLPostBody(result){
	var htmlPostBody ="";
	  jQuery.each(result.posts,function (i, post) {
		  htmlPostBody = htmlPostBody+"<table width='100%' class='table table-bordered table-condensed' id='tb_"+post.id+"'>";
		  htmlPostBody = htmlPostBody+"<td rowspan='3' width='50'><img src='"+post.player.pictureSquare+"' width='50'/></td><td>" ;
		  
		  if(post.postByThisUser == 'yes'){
			  htmlPostBody = htmlPostBody+"<table cellpadding='0' cellspacing='0' width='100%'><tr><td>";  
		  }
		  
		  
		  //htmlPostBody = htmlPostBody+"<button class='link'><span><b>"+post.player.fullName+"</b></span></button>";
		  htmlPostBody = htmlPostBody+"<a href='#' onclick='javascript:viewPlayerProfileFromWallPost("+post.player.id+");'><span><b>"+post.player.fullName+"</b></span></a>";
		  if(post.publisher.publisherType.typeCode == 'PT_MATCH'){
			  var profileUrl = contexPath + "/match/detail"+post.publisher.referenceEntityId+"";
			  htmlPostBody = htmlPostBody+" <i class='icon-chevron-right'></i> ";
			  htmlPostBody = htmlPostBody+"<a href='"+profileUrl+"'><span><b>"+post.publisher.referenceEntityDescription+"</b></span></a>";
		  }
		  if(post.publisher.publisherType.typeCode == 'PT_TEAM'){
			  var profileUrl = contexPath + "/team/detail"+post.publisher.referenceEntityId+"";
			  htmlPostBody = htmlPostBody+" <i class='icon-chevron-right'></i> ";
			  htmlPostBody = htmlPostBody+"<a href='"+profileUrl+"'><span><b>"+post.publisher.referenceEntityDescription+"</b></span></a>";
		  }
		  if(post.publisher.publisherType.typeCode == 'PT_FIELD'){
			  var profileUrl = contexPath + "/field/detail"+post.publisher.referenceEntityId+"";
			  htmlPostBody = htmlPostBody+" <i class='icon-chevron-right'></i> ";
			  htmlPostBody = htmlPostBody+"<a href='"+profileUrl+"'><span><b>"+post.publisher.referenceEntityDescription+"</b></span></a>";
		  }
		  if(post.publisher.publisherType.typeCode == 'PT_PLAYER'){
			  if(post.publisher.referenceEntityId != post.player.id){
				  htmlPostBody = htmlPostBody+" <i class='icon-chevron-right'></i> ";
				  htmlPostBody = htmlPostBody+"<a href='#' onclick='javascript:viewPlayerProfileFromWallPost("+post.publisher.referenceEntityId+");'><span><b>"+post.publisher.referenceEntityDescription+"</b></span></a>";
			  }
		  }
		  if(post.publisher.publisherType.typeCode == 'PT_TOURNAMENT'){
			  var profileUrl = contexPath + "/tournament/detail"+post.publisher.referenceEntityId+"";
			  htmlPostBody = htmlPostBody+" <i class='icon-chevron-right'></i> ";
			  htmlPostBody = htmlPostBody+"<a href='"+profileUrl+"'><span><b>"+post.publisher.referenceEntityDescription+"</b></span></a>";
		  }
		  htmlPostBody = htmlPostBody+"<BR>";
		  htmlPostBody = htmlPostBody+"<p>"+post.postText+"</p>";
//		  htmlPostBody = htmlPostBody+"<BR>";
		  htmlPostBody = htmlPostBody+"<div id='post-attachment-body-"+post.id+"'>";
		  htmlPostBody = htmlPostBody+"</div>";
		  htmlPostBody = htmlPostBody+"<div id='l_"+post.id+"'>";
		  htmlPostBody = htmlPostBody+buildPostLikeButton(post);
		  htmlPostBody = htmlPostBody+"</div>";
//		  htmlPostBody = htmlPostBody+"<BR>";
		  htmlPostBody = htmlPostBody+"<div id='ls_"+post.id+"'>";
		  htmlPostBody = htmlPostBody+buildPostLikeSize(post);
		  htmlPostBody = htmlPostBody+"</div>";
//		  htmlPostBody = htmlPostBody+"<BR>";
		  htmlPostBody = htmlPostBody+"<div id='cs_"+post.id+"'>";
		  htmlPostBody = htmlPostBody+buildMessaseToExtendChilds(post);
		  htmlPostBody = htmlPostBody+"</div>";
		  if(post.postByThisUser == 'yes'){
			  htmlPostBody = htmlPostBody+"</td><td width='5px'><a href='#' onclick='javascript:doPostDelete("+post.id+");' title='Eliminar Post'><span><b>X</b></span></a></td></tr></table>" ;  
		  }
		  
		  htmlPostBody = htmlPostBody+"</td></tr><tr><td class='form-actions'>";
		  htmlPostBody = htmlPostBody+"<div id='post-child-body-"+post.id+"'>";
		  jQuery.each(post.postChilds,function (j, child) {
			  htmlPostBody = htmlPostBody+buildPostChilds(child);
		  });
		  htmlPostBody = htmlPostBody+"</div>";
		  htmlPostBody = htmlPostBody+"</td></tr><tr><td class='form-actions'>";
		  //htmlPostBody = htmlPostBody+"<textarea id = 'post_child_text_"+post.id+"' name = 'post_child_text_"+post.id+"' placeholder='Haz un comentario' style='width: 300px;height: 20px;'></textarea> <button class='btn' id='defaultActionButton' onclick=\"doPostChild('"+post.id+"')\"><span>Comentar</span></button>";
		  htmlPostBody = htmlPostBody+"<input type='text' id = 'post_child_text_"+post.id+"' name = 'post_child_text_"+post.id+"' placeholder='Haz un comentario' style='width: 300px;height: 20px;' onkeypress='submitWhenIPressEnter(event);'> ";
		  htmlPostBody = htmlPostBody+"</td></tr></table>";
//		  htmlPostBody = htmlPostBody + createHTMLPost(post);
	  });
	  return htmlPostBody;
}

//function createHTMLPost(post){
//	var htmlPostBody ="";
//	htmlPostBody = htmlPostBody+"<table width='100%' class='table table-bordered table-condensed' id='o-tb_"+post.id+"'>";
//	  htmlPostBody = htmlPostBody+"<td rowspan='3' width='50'><img src='"+post.player.pictureSquare+"' width='50'/></td><td>" ;
//	  
//	  //htmlPostBody = htmlPostBody+"<button class='link'><span><b>"+post.player.fullName+"</b></span></button>";
//	  htmlPostBody = htmlPostBody+"<a href='#' onclick='javascript:viewPlayerProfileFromWallPost("+post.player.id+");'><span><b>"+post.player.fullName+"</b></span></a>";
//	  if(post.publisher.publisherType.typeCode == 'PT_MATCH'){
//		  var profileUrl = contexPath + "/match/detail"+post.publisher.referenceEntityId+"";
//		  htmlPostBody = htmlPostBody+" <i class='icon-chevron-right'></i> ";
//		  htmlPostBody = htmlPostBody+"<a href='"+profileUrl+"'><span><b>"+post.publisher.referenceEntityDescription+"</b></span></a>";
//	  }
//	  if(post.publisher.publisherType.typeCode == 'PT_TEAM'){
//		  var profileUrl = contexPath + "/team/detail"+post.publisher.referenceEntityId+"";
//		  htmlPostBody = htmlPostBody+" <i class='icon-chevron-right'></i> ";
//		  htmlPostBody = htmlPostBody+"<a href='"+profileUrl+"'><span><b>"+post.publisher.referenceEntityDescription+"</b></span></a>";
//	  }
//	  if(post.publisher.publisherType.typeCode == 'PT_FIELD'){
//		  var profileUrl = contexPath + "/field/detail"+post.publisher.referenceEntityId+"";
//		  htmlPostBody = htmlPostBody+" <i class='icon-chevron-right'></i> ";
//		  htmlPostBody = htmlPostBody+"<a href='"+profileUrl+"'><span><b>"+post.publisher.referenceEntityDescription+"</b></span></a>";
//	  }
//	  if(post.publisher.publisherType.typeCode == 'PT_PLAYER'){
//		  if(post.publisher.referenceEntityId != post.player.id){
//			  htmlPostBody = htmlPostBody+" <i class='icon-chevron-right'></i> ";
//			  htmlPostBody = htmlPostBody+"<a href='#' onclick='javascript:viewPlayerProfileFromWallPost("+post.publisher.referenceEntityId+");'><span><b>"+post.publisher.referenceEntityDescription+"</b></span></a>";
//		  }
//	  }
//	  if(post.publisher.publisherType.typeCode == 'PT_TOURNAMENT'){
//		  var profileUrl = contexPath + "/tournament/detail"+post.publisher.referenceEntityId+"";
//		  htmlPostBody = htmlPostBody+" <i class='icon-chevron-right'></i> ";
//		  htmlPostBody = htmlPostBody+"<a href='"+profileUrl+"'><span><b>"+post.publisher.referenceEntityDescription+"</b></span></a>";
//	  }
//	  htmlPostBody = htmlPostBody+"<BR>";
//	  htmlPostBody = htmlPostBody+post.postText;
////	  htmlPostBody = htmlPostBody+"<BR>";
//	  htmlPostBody = htmlPostBody+"<div id='o-post-attachment-body-"+post.id+"'>";
//	  htmlPostBody = htmlPostBody+"</div>";
//	  htmlPostBody = htmlPostBody+"<div id='o-l_"+post.id+"'>";
//	  htmlPostBody = htmlPostBody+buildPostLikeButton(post);
//	  htmlPostBody = htmlPostBody+"</div>";
////	  htmlPostBody = htmlPostBody+"<BR>";
//	  htmlPostBody = htmlPostBody+"<div id='o-ls_"+post.id+"'>";
//	  htmlPostBody = htmlPostBody+buildPostLikeSize(post);
//	  htmlPostBody = htmlPostBody+"</div>";
////	  htmlPostBody = htmlPostBody+"<BR>";
//	  htmlPostBody = htmlPostBody+"<div id='o-cs_"+post.id+"'>";
//	  htmlPostBody = htmlPostBody+buildMessaseToExtendChilds(post);
//	  htmlPostBody = htmlPostBody+"</div>";
//	  htmlPostBody = htmlPostBody+"</td></tr><tr><td class='form-actions'>";
//	  htmlPostBody = htmlPostBody+"<div id='o-post-child-body-"+post.id+"'>";
//	  jQuery.each(post.postChilds,function (j, child) {
//		  htmlPostBody = htmlPostBody+buildPostChilds(child);
//	  });
//	  htmlPostBody = htmlPostBody+"</div>";
//	  htmlPostBody = htmlPostBody+"</td></tr><tr><td class='form-actions'>";
//	  //htmlPostBody = htmlPostBody+"<textarea id = 'post_child_text_"+post.id+"' name = 'post_child_text_"+post.id+"' placeholder='Haz un comentario' style='width: 300px;height: 20px;'></textarea> <button class='btn' id='defaultActionButton' onclick=\"doPostChild('"+post.id+"')\"><span>Comentar</span></button>";
//	  htmlPostBody = htmlPostBody+"<input type='text' id = 'o-post_child_text_"+post.id+"' name = 'post_child_text_"+post.id+"' placeholder='Haz un comentario' style='width: 300px;height: 20px;' onkeypress='submitWhenIPressEnter(event);'> <button class='btn' id='o-post_child_text_"+post.id+"_buttonId' onclick=\"doPostChild('"+post.id+"')\"><span>Comentar</span></button>";
//	  htmlPostBody = htmlPostBody+"</td></tr></table>";
//	  return htmlPostBody;
//}

function buildMessaseToExtendChilds(post){
	if(post.postChildsSize>4){
		 return "<button class='link' onclick = 'doListAllPostChilds("+post.id+")'><span>Ver todos los comentarios.</span></button>";
	}
	return "";
}

function createAttachments(posts,imagesUrl){
	  jQuery.each(posts,function (i, post) {
		  jQuery.each(post.postAttachments,function (k, attach) {
			  if(attach.postAttachmentType.typeCode=="PAT_VIDEO"){
				  getYoutubeInformation(attach.fileObject,"div#post-attachment-body-"+post.id);
			  }else if(attach.postAttachmentType.typeCode=="PAT_PHOTO"){
				 $("div#post-attachment-body-"+post.id).append("<a style='cursor: pointer' onclick='seePostWithPicture("+post.id+")'><img src='"+imagesUrl+attach.fileObject+"' height='200'/></a>");
			  }
		  });
	  });
}

//function seePostWithPicture(postId){
//	$.ajax({  
//		  type: "POST",  
//		  url: contexPath + "/post/postOnly",  
//		  data: "postId=" + postId ,  
//		  success: function(response){
//			  // we have the response 
//			  if(response.status == "SUCCESS"){
//				  $('#postOnly').html(createHTMLPost(response.result.post));
//				  jQuery.each(response.result.post.postAttachments,function (k, attach) {
//					  if(attach.postAttachmentType.typeCode=="PAT_PHOTO"){
//						 $("#pictureOnly").html("<img src='"+response.result.imagesUrl+attach.fileObject+"' style='max-height: 100%; max-width: 100%;vertical-align: middle;display:inline-block;image-rendering:optimizequality;'/>");
//					  }
//				  });
//				  $('#response_message').val('');
//				  
//				  $.blockUI({
//						message:$('#postModal'),
//						overlayCSS:  {
//							opacity:0.9,
//						},
//						css:{
//							top:'100px',
//							left: ($(window).width() - 1000) /2 + 'px',
//							border: 'none', 
//			                backgroundColor: '#fff'
//						}
//						}); 
//				  $('.blockOverlay').attr('title','Click to unblock').click($.unblockUI);
//			  }else{
//				  buildErrorResponseMessage();
//			  }	      
//		  },  
//		  error: function(e){  
////			  alert('Error: ' + e);  
//		  }  
//	  });
//}

function buildPostChilds(child){
	var htmlPostBody = "<table width='100%' class='table-bordered table-condensed' ><tr>" ;
		htmlPostBody = htmlPostBody+"<td rowspan='2' width='30'><img src='"+child.player.pictureSquare+"' width='30'/></td><td>";
	  //htmlPostBody = htmlPostBody+"<button class='link'><span><b>"+child.player.fullName+"</b></span></button> "+child.postText;
	  htmlPostBody = htmlPostBody+"<a href='#' onclick='javascript:viewPlayerProfileFromWallPost("+child.player.id+");'><span><b>"+child.player.fullName+"</b></span></a> <p>"+child.postText+"</p>";
//	  htmlPostBody = htmlPostBody+"<BR>";
	  htmlPostBody = htmlPostBody+"<div id='cls_"+child.id+"'>";
	  htmlPostBody = htmlPostBody+buildPostChildLikeSize(child);
	  htmlPostBody = htmlPostBody+"</div>";
	  htmlPostBody = htmlPostBody+"</td></tr></table>";
	  return htmlPostBody;
}

function buildPostLikeSize(post){
	if(post.postLikesSize>1){
		  return "A "+post.postLikesSize+" personas les gusta esto.";
	  }else if (post.postLikesSize==1){
		  return "A una persona le gusta esto.";
	  }
	
	return "";
}

function buildPostLikeButton(post){
	var like = "";
	var likeFunctionName = "";
	if(post.likedByMe){
		like = "Ya no me gusta";
		likeFunctionName = "doPostUnLike";
	}else{
		like = "Me gusta";
		likeFunctionName = "doPostLike";
	}
	return "<button class='link' onclick=\"javascript:"+likeFunctionName+"('"+post.id+"')\"><span>"+like+"</span></button>" +
//		" * <button class='link' onclick=\"doPostHidde('"+data.id+"')\"><span>Ocultar</span></button>" +
				" . <font color = 'gray' style='font-size: xx-small;'>"+post.postDateCreated+"</font>";
}

function buildPostChildLikeSize(child){
	var like = "";
	var likeFunctionName = "";
	if(child.likedByMe){
		like = "Ya no me gusta";
		likeFunctionName = "doPostChildUnLike";
	}else{
		like = "Me gusta";
		likeFunctionName = "doPostChildLike";
	}
	return "<font color = 'gray' style='font-size: xx-small;'>"+child.postDateCreated+"</font> . <button class='link' onclick=\""+likeFunctionName+"('"+child.id+"')\"><span>"+like+"</span></button> . "+child.postChildLikesSize+"" +
//		" * <button class='link' onclick=\"doPostChildHidde('"+child.id+"')\"><span>ocultar</span></button>" +
		" ";
}

function buildErrorResponseMessage(){
	$('#response_message').html("Sorry, there is some thing wrong with the data provided.");
}

function doPostLike(postId) {  
	$.ajax({  
	    type: "POST",  
	    url: contexPath + "/post/postLikeAction",  
	    data: "postId="+postId,  
	    success: function(response){
	      // we have the response 
	      if(response.status == "SUCCESS"){
	    	  $('#l_'+postId).html(buildPostLikeButton(response.result));
	    	  $('#ls_'+postId).html(buildPostLikeSize(response.result));
	    	  $('#response_message').val('');
	      }else{
	    	  buildErrorResponseMessage();
	      }	      
	    },  
	    error: function(e){  
//	      alert('Error: ' + e);  
	    }  
	  });
}

function doPostUnLike(postId) {  
	$.ajax({  
	    type: "POST",  
	    url: contexPath + "/post/postUnLikeAction",  
	    data: "postId="+postId,  
	    success: function(response){
	      // we have the response 
	      if(response.status == "SUCCESS"){
	    	  $('#l_'+postId).html(buildPostLikeButton(response.result));
	    	  $('#ls_'+postId).html(buildPostLikeSize(response.result));
	    	  $('#response_message').val('');
	      }else{
	    	  buildErrorResponseMessage();
	      }	      
	    },  
	    error: function(e){  
//	      alert('Error: ' + e);  
	    }  
	  });
}

function doPostChild(postId){
	var postText = $('#post_child_text_'+postId).val();
	if(validateField(postText)){
		$.ajax({  
			type: "POST",  
			url: contexPath + "/post/postChildSave",  
			data: "postText=" + postText + "&postId=" + postId,  
			success: function(response){
				if(response.status == "SUCCESS"){
					var htmlPostBody ="";
					jQuery.each(response.result.postChilds,function (j, child) {
						htmlPostBody = htmlPostBody+buildPostChilds(child);
					});
					$('#cs_'+postId).html(buildMessaseToExtendChilds(response.result)).show("slow");
					$('#post-child-body-'+postId).hide();
					$('#post-child-body-'+postId).html(htmlPostBody).show("slow");
					$('#post_child_text_'+postId).val('');
					$('#response_message').val('');
				}else{
					buildErrorResponseMessage();
				}	      
			},  
			error: function(e){  
//				alert('Error: ' + e);  
			}  
		}); 
		
	}
}

function doPostChildLike(postChildId) {  
	$.ajax({  
	    type: "POST",  
	    url: contexPath + "/post/postChildLikeAction",  
	    data: "postChildId="+postChildId,  
	    success: function(response){
	      // we have the response 
	      if(response.status == "SUCCESS"){
	    	  $('#cls_'+postChildId).html(buildPostChildLikeSize(response.result));
	    	  $('#response_message').val('');
	      }else{
	    	  buildErrorResponseMessage();
	      }	      
	    },  
	    error: function(e){  
//	      alert('Error: ' + e);  
	    }  
	  });
}

function doPostChildUnLike(postChildId) {  
	$.ajax({  
	    type: "POST",  
	    url: contexPath + "/post/postChildUnLikeAction",  
	    data: "postChildId="+postChildId,  
	    success: function(response){
	      // we have the response 
	      if(response.status == "SUCCESS"){
	    	  $('#cls_'+postChildId).html(buildPostChildLikeSize(response.result));
	    	  $('#response_message').val('');
	      }else{
	    	  buildErrorResponseMessage();
	      }	      
	    },  
	    error: function(e){  
//	      alert('Error: ' + e);  
	    }  
	  });
}


function doListAllPostChilds(postId){
	$.ajax({  
		type: "POST",  
		url: contexPath + "/post/postAllChildList",  
		data: "postId=" + postId,  
		success: function(response){
			if(response.status == "SUCCESS"){
				var htmlPostBody ="";
				jQuery.each(response.result.postChilds,function (j, child) {
					htmlPostBody = htmlPostBody+buildPostChilds(child);
				});
				$('#cs_'+postId).hide();
				$('#post-child-body-'+postId).hide();
				$('#post-child-body-'+postId).html(htmlPostBody).show("slow");
				$('#response_message').val('');
			}else{
				buildErrorResponseMessage();
			}	      
		},  
		error: function(e){  
//				alert('Error: ' + e);  
		}  
	}); 
}

function buildHTMLExtendPOst(postSize,startNumber){
	if(postSize>9){
		  $('#post-extra').html("<button class='link' onclick='doExpandPosts("+startNumber+",10);'><span>Ver publicaciones anteriores</span></button>"); 
	  }else{
		  $('#post-extra').html("");
	  }
}

function doExpandPosts(pageStart,pageEnd) {  
	  // get the form values  
	  $.ajax({  
		  type: "POST",  
		  url: contexPath + "/post/postListPartOfPost",  
		  data: "pageStart=" + pageStart + "&pageEnd=" + pageEnd,  
		  success: function(response){
			  // we have the response 
			  if(response.status == "SUCCESS"){
				  $('#post-body').append(createHTMLPostBody(response.result)).show("slow");
				  createAttachments(response.result.posts,response.result.imagesUrl);
				  buildHTMLExtendPOst(response.result.postSize, response.result.start);
				  $('#response_message').val('');
			  }else{
				  buildErrorResponseMessage();
			  }	      
		  },  
		  error: function(e){  
//				  alert('Error: ' + e);  
		  }  
	  }); 
}


function doPostDelete(postId) {
		  $.ajax({  
			  type: "POST",  
			  url: contexPath + "/post/postStatusDelete",  
			  data: "postId=" + postId ,  
			  success: function(response){
				  // we have the response 
				  if(response.status == "SUCCESS"){
					  $('#tb_'+postId).hide();
					  $('#response_message').val('');
				  }else{
					  buildErrorResponseMessage();
				  }	      
			  },  
			  error: function(e){  
//				  alert('Error: ' + e);  
			  }  
		  });
	
}

function doPostChildDelete(postChildId) {}

function submitWhenIPressEnter(event){
    if(event.keyCode == 13) {
    	document.getElementById(event.target.id+"_buttonId").click();
        return false;
    }else  {
        return true;
    }
}