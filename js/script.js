
// ############ jQuery  ############

$(document).ready(function(){
	
// logout	
	$("#aLogout").click(function(event){
		var x = confirm("Có chắc là bạn muốn thoát?");
		if (!x){			 
			event.preventDefault();
		}
	
	});
	
 	
// #############  sinhvien.php ###########################
	 
	//check 1 dòng
	 $(document).on("change",".chkmasv", function(){
		$(this).parent().parent().toggleClass("selected");
	 }); 
	
	// check nút chọn tất cả 
	 $(document).on("change","#checkAll", function(){
		var val = $(this).prop("checked");
		$(".chkmasv").prop("checked",val);		 
		if (val){
			$(".trsv").addClass("selected");
		}else{
			$(".trsv").removeClass("selected");
		}
	 }); 
	 
	 // xử lý sự kiện chọn lớp 
	 $("#svDSLop").change(function(){
			var url = "ajax_sinhvien.php";
			var malop = $(this).val();		 
			var param = {"MaLop":malop};		
			$.ajax({
				url:url,
				type: "POST",
				data: param,
				dataType: "HTML",			
				error: function(xhr,status,errmgs){
					$("#divDSSV").html("<div class='error'>Có lỗi xảy ra: " + errmgs + "</div>");
				},
				beforeSend: function(){
					$("#divImg").html("<img id='imgLoading' src='images/ajax_loading.gif' width='22' height='22'  />");
				},
				complete: function(){
					$("#divImg").html("");
				},
				success: function(data){
					$("#divDSSV").html(data);
					$(".btnXoaSV, .btnSua").hide();
					 
				}
				
			});
		});
	 
	
	 // xử lý cuộn màn hình load thêm danh sách
	 $(window).scroll(function(){		 
		 loadMore();
		
	 });
	 
	 function loadMore(){
		 var lastPos = 0;
		 var isLoaded = false;
		 
		 try{
			 lastPos = $("#btnLast").offset().top ;
			 isLoaded = true;
			 
		 }catch(e){
			 isLoaded = false; 
		 }
		 
		 var finish = 0;
		 try{
			 finish = parseInt($("#btnLast").data("finish"));
		 }catch(e){
			 finish = 0;
		 }
		 		 
		 var top = ( $(window).scrollTop()  +  $(window).height());
		 
		 
		 if  ( isLoaded && top >= lastPos && !finish){
		 
		 	var url = "ajax_sinhvien.php";
			var malop = $("#svDSLop").val();			 
			var last = $("#btnLast").val().toString();	
			
			var param = {"MaLop" : malop , "Last" : last};
			 
			$.ajax({
				url:url,
				type: "POST",
				data: param,
				dataType: "HTML",			
				error: function(xhr,status,errmgs){
					$("#divDSSV").html("<div class='error'>Có lỗi xảy ra: " + errmgs + "</div>");
				},
				beforeSend: function(){
					$("#divThemImg").html("<img id='imgLoading' src='images/more_loading.gif' width='22' height='22'  />");
				},
				complete: function(){
					//$("#divThemImg").html(divInnerHTML);
				},
				success: function(data){
					$("#divDSSV").html(data);
					$(".btnXoaSV, .btnSua").hide();
				}
				
			});
		 }
		 
	 }
	 
	 
	 function reLoad(){
		 
		 	var url = "ajax_sinhvien.php";
			var malop = $("#svDSLop").val();			 
			var last = $("#btnLast").val().toString();	
			
			var param = {"MaLop" : malop , "Last" : last};
			 
			$.ajax({
				url:url,
				type: "POST",
				data: param,
				dataType: "HTML",			
				error: function(xhr,status,errmgs){
					$("#divDSSV").html("<div class='error'>Có lỗi xảy ra: " + errmgs + "</div>");
				},
				beforeSend: function(){
					$("#divThemImg").html("<img id='imgLoading' src='images/more_loading.gif' width='22' height='22'  />");
				},
				complete: function(){
					//$("#divThemImg").html(divInnerHTML);
				},
				success: function(data){
					$("#divDSSV").html(data);
					$(".btnXoaSV, .btnSua").hide();
				}
				
			});
		  
	 }
	 //xử lý nút thêm
	 $(document).on("click",".btnAdd",function(event){
		var dialog = $("#dialogAddSV");
		
		var button = $(this);
		var masv = $(button).val() ;		 
		var url = "ajax_sinhvien.php";
		var imgEdit = $(button).html();
		var param = {"MaSV" : masv , "Type" : "getInfo"};
		 
		$.ajax({
			url:url,
			
			success: function(data){
				if (data){
					
					 $(dialog).dialog("open");					 
				 
				}else{
					showError("SV không tồn tại.");
				}
				
				 
				 
			}
			
		});
		
		
		 event.preventDefault();
		
	});
	 // xử lý nút xóa
	 $(document).on("click",".btnXoaSV",function(event){
		 var button = $(this);
		 var masv = $(button).val() ;
		 
		 var x = "Có chắc bạn muốn xóa " + masv + " không?";
		 var dialog = $("#delDialog");
		 $(dialog).find("p").text(x);
		 
		 $(dialog).dialog({
			 closeOnEscape: true,
			 closeText: "Đóng",
			 resizable: false,
			 title: "Xác nhận",
			 show: {effect: "drop", duration: 200, direction: "up"},
		 	 hide: "slide",
		 	 modal: true,
		 	 buttons: [
				{
				 	html:"<span class='ui-icon ui-icon-trash'></span>",
				 	title: "Xóa",
				 	click: function(){
				 		$(dialog).dialog("close");	
				 		var url = "ajax_sinhvien.php";							 			
						var param = {"MaSV":masv};		
						$.ajax({
							url:url,
							type: "POST",
							data: param,
							dataType: "HTML",			
							error: function(xhr,status,errmgs){
								var err = "Có lỗi xảy ra: " + errmgs;
								showError(err);
								$(dialog).dialog("close");								
							},							 
							complete: function(){
								
							},
							success: function(data){
								if (data == "OK"){						 
									 $(button).parent().parent().remove();
									 $(".stt").each(function(index){
										 $(this).text(index + 1);
										
									 });
								}else{
									var err = "Không thể xóa SV " + masv;
									showError(err);
								}
							}
							
						});
							
					}
				},
		 		{
			 	 	html:"<span class='ui-icon ui-icon-cancel'></span>",
			 	 	title: "Hủy",
			 	 	id: "btnClose",
			 	 	click: function(){
						$(this).dialog("close");
				 	}
				}
			]
			 
		 });
		 event.preventDefault(); 
	 });
	 
		function showError(err){
			$("#errDialog").find("p").text(err);
			$("#errDialog").dialog({
				closeOnEscape: true,
				 closeText: "Đóng",
				 resizable: false,
				 
				 title: "Thông báo lỗi",
				 show: {effect: "drop", duration: 200, direction: "up"},
			 	 hide: "bounce",
			 	 buttons: [
			 	       {
			 	    	  text:"Đóng",					 	 	 
					 	 	click: function(){
								$(this).dialog("close");
						 	}
			 	       }    
			 	  ]
			});
		}
		
	// xử lý nút Sửa		
	$(document).on("click",".btnSua",function(event){
		var dialog = $("#dialogUpdateSV");
		
		var button = $(this);
		var masv = $(button).val() ;		 
		var url = "ajax_sinhvien.php";
		var imgEdit = $(button).html();
		var param = {"MaSV" : masv , "Type" : "getInfo"};
		 
		$.ajax({
			url:url,
			type: "POST",
			data: param,
			dataType: "JSON",			
			error: function(xhr,status,errmgs){
				var err = "Có lỗi xảy ra khi lấy thông tin SV " + masv + " " + errmgs;
 				showError(err);
			},
			beforeSend: function(){
				$(button).html("<img id='imgLoading' src='images/more_loading.gif' width='20' height='14'  />");			 
			},
			complete: function(){
				$(button).html(imgEdit);
			},
			success: function(data){
				if (data){
					
					 $(dialog).find("#txtUpdateMaSV").val(data.MaSV);
					 $(dialog).find("#txtUpdateMaLop").val(data.MaLop);
					 $(dialog).find("#txtUpdateTen").val(data.HoTen);
					
					 $(dialog).find("#txtUpdateNgaySinh").val(data.NgaySinh);
					 if (data.GioiTinh=="Nam"){
						 $("#rdoUpdateNam").prop("checked",true);
						 
					 }else{
						 $("#rdoUpdateNu").prop("checked",true); 
					 }
					 
					 $(dialog).find("#txtUpdateQue").val(data.QueQuan);
				
					 $(dialog).find("#txtUpdateEmail").val(data.Email);
					 $(dialog).dialog("open");					 
				 
				}else{
					showError("SV không tồn tại.");
				}
				
				 
				 
			}
			
		});
		
		
		 event.preventDefault();
		
	});
	 
	 $(document).on("mouseover",".ds tr",function(event){
		 $(this).find(".btnXoaSV").show();
		 $(this).find(".btnSua").show();
	 });
	 
	 $(document).on("mouseout",".ds tr",function(){
		 $(this).find(".btnXoaSV").hide();
		 $(this).find(".btnSua").hide();
	 });
	  
	 $( ".group-box" ).addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
     	.find( ".title" ).addClass( "ui-widget-header ui-corner-all" )
     	.prepend( "<span class='ui-icon ui-icon-triangle-1-s'></span>");

   $( ".group-box .ui-icon" ).click(function() {
     $( this ).toggleClass( "ui-icon-triangle-1-s" )
     	.toggleClass( "ui-icon-triangle-1-w" );
     $( this ).parents(".group-box").find( ".group-box-content" )
     	.slideToggle();
   });
   
   $("#leftSide").sortable({
	   axis: "y",
	   revert: 500,
	   handle:".title",
	   curosr: "move"
   }).disableSelection();
   
   $("#dialogAddSV").dialog({
	   autoOpen:false,
	   closeOnEscape: true,
	   closeText: "Đóng",
	   resizable: false,
	   title: "Thêm sinh viên",
	   show: {effect: "drop", duration: 200, direction: "up"},
	   hide: "slide",
	   modal: true,
	   width: 550,
	   height: 600,
	   buttons: [
		 	       {
		 	    	  text:"Thêm SV",
		 	    	  id: "btnAdd",
				 	  click: function(){
				 	 		$("#btnAdd").hide().before("<span id='spanUpdateLoading'><img src='images/more_loading.gif' width='26' height='18'  />  &nbsp; &nbsp; &nbsp;</span>");
				 	 		
				 	 		var masv = $("#txtMa").val();
							var malop = $("#txtMaLop").val();
				 	 		var hoten = $("#txtTen").val();
				 	 		
				 	 		var ngaysinh = $("#txtNgaySinh").val();
				 	 		
				 	 		var gioitinh = "Nữ";
				 	 		
				 	 		if ($("#Nam").prop("checked")){
				 	 			gioitinh = "Nam";
				 	 		}
				 	 		var quequan = $("#txtQue").val();
				 	 		
				 	 		var email = $("#txtEmail").val();
				 	 		
				 	 		var param = {
				 	 				Type: "Add",
				 	 				MaSV : masv,
									MaLop: malop,
				 	 				HoTen: hoten,
				 	 				NgaySinh: ngaysinh,
				 	 				GioiTinh: gioitinh,
				 	 				QueQuan: quequan,
				 	 				
				 	 				Email: email
				 	 		};
				 	 		var url = "ajax_sinhvien.php";
				 	 		
				 	 		$.ajax({
								url:url,
								type: "POST",
								data: param,
								dataType: "HTML",			
								error: function(xhr,status,errmgs){
									var err = "Có lỗi xảy ra: " + errmgs;
									$(this).dialog("close");
									showError(err);									 							
								},							 
								complete: function(){
									$("#spanUpdateLoading").remove();
									$("#btnAdd").show();
									
								},
								beforeSend: function(){ 
								},
								success: function(data){
									if (data == "OK"){	
										reLoad();
										$("#dialogAddSV").dialog("close");										
										
									}else{
										var err = "Không thể thêm sinh viên";
										showError(data);
									}
								}
								
							});
				 	 	 
				 	 	}
		 	       },
		 	      {
		 	    	  text:"Đóng",					 	 	 
				 	 	click: function(){
				 	 		$(this).dialog("close");
				 	 	}
			 	  }
		 	  ]
   });
   
   $("#dialogUpdateSV").dialog({
	   autoOpen:false,
	   closeOnEscape: true,
	   closeText: "Đóng",
	   resizable: false,
	   title: "Cập nhật thông tin",
	   show: {effect: "drop", duration: 200, direction: "up"},
	   hide: "slide",
	   modal: true,
	   width: 550,
	   height: 600,
	   buttons: [
		 	       {
		 	    	  text:"Lưu",
		 	    	  id: "btnLuu",
				 	  click: function(){
				 	 		//$("#btnLuu").hide().before("<span id='spanUpdateLoading'><img src='images/more_loading.gif' width='26' height='18'  />  &nbsp; &nbsp; &nbsp;</span>");
				 	 		
				 	 		var masv = $("#txtUpdateMaSV").val();
				 	 		
				 	 		var ten = $("#txtUpdateTen").val();
				 	 		var ngaysinh = $("#txtUpdateNgaySinh").val();
				 	 		
				 	 		var gioitinh = "Nữ";
				 	 		
				 	 		if ($("#rdoUpdateNam").prop("checked")){
				 	 			gioitinh = "Nam";
				 	 		}
				 	 		var quequan = $("#txtUpdateQue").val();
				 	 		var malop = $("#txtUpdateMaLop").val();
				 	 		var email = $("#txtUpdateEmail").val();
				 	 		
				 	 		var param = {
				 	 				Type: "Update",
				 	 				MaSV : masv,
				 	 				MaLop:malop,
				 	 				HoTen: ten,
				 	 				NgaySinh: ngaysinh,
				 	 				GioiTinh: gioitinh,
				 	 				QueQuan: quequan,
				 	 				Email: email
				 	 		};
				 	 		var url = "ajax_sinhvien.php";
				 	 		
				 	 		$.ajax({
								url:url,
								type: "POST",
								data: param,
								dataType: "HTML",			
								error: function(xhr,status,errmgs){
									var err = "Có lỗi xảy ra: " + errmgs;
									$(this).dialog("close");
									showError(err);									 							
								},							 
								complete: function(){
									$("#spanUpdateLoading").remove();
									$("#btnLuu").show();
									
								},
								beforeSend: function(){ 
								},
								success: function(data){
									if (data == "OK"){	
										reLoad();
										$("#dialogUpdateSV").dialog("close");										
										
									}else{
										var err = "Không thể cập nhật SV " + masv;
										showError(err);
									}
								}
								
							});
				 	 	 
				 	 	}
		 	       },
		 	      {
		 	    	  text:"Đóng",					 	 	 
				 	 	click: function(){
				 	 		$(this).dialog("close");
				 	 	}
			 	  }
		 	  ]
   });
   
   $("#txtNgaySinh").datepicker({
	   dateFormat: "yy-mm-dd",
	   
   });
   
   
	 
});// ready()

