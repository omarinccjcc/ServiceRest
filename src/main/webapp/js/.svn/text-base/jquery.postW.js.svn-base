function seePostWithPicture(postId){
	$.ajax({  
		  type: "POST",  
		  url: contexPath + "/post/postOnly",  
		  data: "postId=" + postId ,  
		  success: function(response){
			  // we have the response 
			  if(response.status == "SUCCESS"){
				  $('#postOnly').html(createHTMLPost(response.result.post));
				  jQuery.each(response.result.post.postAttachments,function (k, attach) {
					  if(attach.postAttachmentType.typeCode=="PAT_PHOTO"){
						 $("#pictureOnly").html("<img src='"+response.result.imagesUrl+attach.fileObject+"' style='max-height: 100%; max-width: 100%;vertical-align: middle;display:inline-block;image-rendering:optimizequality;'/>");
					  }
				  });
				  $('#response_message').val('');
				  
				  $.blockUI({
						message:$('#postModal'),
						overlayCSS:  {
							opacity:0.9
						},
						css:{
							top:'100px',
							left: ($(window).width() - 1000) /2 + 'px',
							border: 'none', 
			                backgroundColor: '#fff'
						}
						}); 
				  $('.blockOverlay').attr('title','Click to unblock').click($.unblockUI);
//				  $("#postOnly").niceScroll();
				  $('#postOnly').perfectScrollbar();
			  }else{
				  buildErrorResponseMessage();
			  }	      
		  },  
		  error: function(e){  
//			  alert('Error: ' + e);  
		  }  
	  });
}

function createHTMLPost(post){
	var htmlPostBody ="";
	htmlPostBody = htmlPostBody+"<table width='100%' class='table table-bordered table-condensed' id='W-tb_"+post.id+"'>";
	  htmlPostBody = htmlPostBody+"<td width='50'><img src='"+post.player.pictureSquare+"' width='50'/></td><td>" ;
	  
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
	  htmlPostBody = htmlPostBody+""+post.postText+"";
//	  htmlPostBody = htmlPostBody+"<BR>";
	  htmlPostBody = htmlPostBody+"<div id='W-post-attachment-body-"+post.id+"'>";
	  htmlPostBody = htmlPostBody+"</div>";
	  htmlPostBody = htmlPostBody+"<div id='W-l_"+post.id+"'>";
	  htmlPostBody = htmlPostBody+WbuildPostLikeButton(post);
	  htmlPostBody = htmlPostBody+"</div>";
//	  htmlPostBody = htmlPostBody+"<BR>";
	  htmlPostBody = htmlPostBody+"<div id='W-ls_"+post.id+"'>";
	  htmlPostBody = htmlPostBody+WbuildPostLikeSize(post);
	  htmlPostBody = htmlPostBody+"</div>";
//	  htmlPostBody = htmlPostBody+"<BR>";
	  htmlPostBody = htmlPostBody+"<div id='W-cs_"+post.id+"'>";
	  htmlPostBody = htmlPostBody+WbuildMessaseToExtendChilds(post);
	  htmlPostBody = htmlPostBody+"</div>";
	  htmlPostBody = htmlPostBody+"</td></tr><tr><td class='form-actions' colspan='2'>";
	  htmlPostBody = htmlPostBody+"<div id='W-post-child-body-"+post.id+"'>";
	  jQuery.each(post.postChilds,function (j, child) {
		  htmlPostBody = htmlPostBody+WbuildPostChilds(child);
	  });
	  htmlPostBody = htmlPostBody+"</div>";
	  htmlPostBody = htmlPostBody+"</td></tr><tr><td class='form-actions' colspan='2'>";
	  //htmlPostBody = htmlPostBody+"<textarea id = 'post_child_text_"+post.id+"' name = 'post_child_text_"+post.id+"' placeholder='Haz un comentario' style='width: 300px;height: 20px;'></textarea> <button class='btn' id='defaultActionButton' onclick=\"doPostChild('"+post.id+"')\"><span>Comentar</span></button>";
	  htmlPostBody = htmlPostBody+"<input type='text' id = 'W-post_child_text_"+post.id+"' name = 'post_child_text_"+post.id+"' placeholder='Haz un comentario' style='width: 300px;height: 20px;' onkeypress='submitWhenIPressEnter(event);'>";
	  htmlPostBody = htmlPostBody+"</td></tr></table>";
	  return htmlPostBody;
}

function WbuildMessaseToExtendChilds(post){
	if(post.postChildsSize>4){
		 return "<button class='link' onclick = 'WdoListAllPostChilds("+post.id+")'><span>Ver todos los comentarios.</span></button>";
	}
	return "";
}

function WbuildPostChilds(child){
	var htmlPostBody = "<table width='100%' class='table-bordered table-condensed' ><tr>" ;
		htmlPostBody = htmlPostBody+"<td rowspan='2' width='30'><img src='"+child.player.pictureSquare+"' width='30'/></td><td>";
	  //htmlPostBody = htmlPostBody+"<button class='link'><span><b>"+child.player.fullName+"</b></span></button> "+child.postText;
	  htmlPostBody = htmlPostBody+"<a href='#' onclick='javascript:viewPlayerProfileFromWallPost("+child.player.id+");'><span><b>"+child.player.fullName+"</b></span></a> "+child.postText+"";
//	  htmlPostBody = htmlPostBody+"<BR>";
	  htmlPostBody = htmlPostBody+"<div id='W-cls_"+child.id+"'>";
	  htmlPostBody = htmlPostBody+WbuildPostChildLikeSize(child);
	  htmlPostBody = htmlPostBody+"</div>";
	  htmlPostBody = htmlPostBody+"</td></tr></table>";
	  return htmlPostBody;
}

function WbuildPostLikeSize(post){
	if(post.postLikesSize>1){
		  return "A "+post.postLikesSize+" personas les gusta esto.";
	  }else if (post.postLikesSize==1){
		  return "A una persona le gusta esto.";
	  }
	
	return "";
}

function WbuildPostLikeButton(post){
	var like = "";
	var likeFunctionName = "";
	if(post.likedByMe){
		like = "Ya no me gusta";
		likeFunctionName = "WdoPostUnLike";
	}else{
		like = "Me gusta";
		likeFunctionName = "WdoPostLike";
	}
	return "<button class='link' onclick=\"javascript:"+likeFunctionName+"('"+post.id+"')\"><span>"+like+"</span></button>" +
//		" * <button class='link' onclick=\"doPostHidde('"+data.id+"')\"><span>Ocultar</span></button>" +
				" . <font color = 'gray' style='font-size: xx-small;'>"+post.postDateCreated+"</font>";
}

function WbuildPostChildLikeSize(child){
	var like = "";
	var likeFunctionName = "";
	if(child.likedByMe){
		like = "Ya no me gusta";
		likeFunctionName = "WdoPostChildUnLike";
	}else{
		like = "Me gusta";
		likeFunctionName = "WdoPostChildLike";
	}
	return "<font color = 'gray' style='font-size: xx-small;'>"+child.postDateCreated+"</font> . <button class='link' onclick=\""+likeFunctionName+"('"+child.id+"')\"><span>"+like+"</span></button> . "+child.postChildLikesSize+"" +
//		" * <button class='link' onclick=\"doPostChildHidde('"+child.id+"')\"><span>ocultar</span></button>" +
		" ";
}

function WdoPostLike(postId) {  
	$.ajax({  
	    type: "POST",  
	    url: contexPath + "/post/postLikeAction",  
	    data: "postId="+postId,  
	    success: function(response){
	      // we have the response 
	      if(response.status == "SUCCESS"){
	    	  $('#W-l_'+postId).html(WbuildPostLikeButton(response.result));
	    	  $('#W-ls_'+postId).html(WbuildPostLikeSize(response.result));
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

function WdoPostUnLike(postId) {  
	$.ajax({  
	    type: "POST",  
	    url: contexPath + "/post/postUnLikeAction",  
	    data: "postId="+postId,  
	    success: function(response){
	      // we have the response 
	      if(response.status == "SUCCESS"){
	    	  $('#W-l_'+postId).html(WbuildPostLikeButton(response.result));
	    	  $('#W-ls_'+postId).html(WbuildPostLikeSize(response.result));
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

function WdoPostChild(postId){
	var postText = $('#W-post_child_text_'+postId).val();
	if(validateField(postText)){
		$.ajax({  
			type: "POST",  
			url: contexPath + "/post/postChildSave",  
			data: "postText=" + postText + "&postId=" + postId,  
			success: function(response){
				if(response.status == "SUCCESS"){
					var htmlPostBody ="";
					jQuery.each(response.result.postChilds,function (j, child) {
						htmlPostBody = htmlPostBody+WbuildPostChilds(child);
					});
					$('#W-cs_'+postId).html(WbuildMessaseToExtendChilds(response.result)).show("slow");
					$('#W-post-child-body-'+postId).hide();
					$('#W-post-child-body-'+postId).html(htmlPostBody).show("slow");
					$('#W-post_child_text_'+postId).val('');
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

function WdoPostChildLike(postChildId) {  
	$.ajax({  
	    type: "POST",  
	    url: contexPath + "/post/postChildLikeAction",  
	    data: "postChildId="+postChildId,  
	    success: function(response){
	      // we have the response 
	      if(response.status == "SUCCESS"){
	    	  $('#W-cls_'+postChildId).html(WbuildPostChildLikeSize(response.result));
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

function WdoPostChildUnLike(postChildId) {  
	$.ajax({  
	    type: "POST",  
	    url: contexPath + "/post/postChildUnLikeAction",  
	    data: "postChildId="+postChildId,  
	    success: function(response){
	      // we have the response 
	      if(response.status == "SUCCESS"){
	    	  $('#W-cls_'+postChildId).html(WbuildPostChildLikeSize(response.result));
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


function WdoListAllPostChilds(postId){
	$.ajax({  
		type: "POST",  
		url: contexPath + "/post/postAllChildList",  
		data: "postId=" + postId,  
		success: function(response){
			if(response.status == "SUCCESS"){
				var htmlPostBody ="";
				jQuery.each(response.result.postChilds,function (j, child) {
					htmlPostBody = htmlPostBody+WbuildPostChilds(child);
				});
				$('#W-cs_'+postId).hide();
				$('#W-post-child-body-'+postId).hide();
				$('#W-post-child-body-'+postId).html(htmlPostBody).show("slow");
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
