
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
	 $(document).on("change",".chkmalop", function(){
		$(this).parent().parent().toggleClass("selected");
	 }); 
	
	// check nút chọn tất cả 
	 $(document).on("change","#checkAll", function(){
		var val = $(this).prop("checked");
		$(".chkmalop").prop("checked",val);		 
		if (val){
			$(".trsv").addClass("selected");
		}else{
			$(".trsv").removeClass("selected");
		}
	 }); 
	 
	 // xử lý sự kiện chọn lớp 
	 
	 $("#svDSCN").change(function(){
			var url = "ajax_lop.php";
			var macn = $(this).val();		 
			var param = {"MaCN":macn};		
			$.ajax({
				url:url,
				type: "POST",
				data: param,
				dataType: "HTML",			
				error: function(xhr,status,errmgs){
					$("#divDSLop").html("<div class='error'>Có lỗi xảy ra: " + errmgs + "</div>");
				},
				beforeSend: function(){
					$("#divImg").html("<img id='imgLoading' src='images/ajax_loading.gif' width='22' height='22'  />");
				},
				complete: function(){
					$("#divImg").html("");
				},
				success: function(data){
					$("#divDSLop").html(data);
					$(".btnXoaLop, .btnSua2").hide();
					 
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
		 
		 	var url = "ajax_lop.php";
			var macn = $("#svDSCN").val();			 
			var last = $("#btnLast").val().toString();	
			
			var param = {"MaCN" : macn , "Last" : last};
			 
			$.ajax({
				url:url,
				type: "POST",
				data: param,
				dataType: "HTML",			
				error: function(xhr,status,errmgs){
					$("#divDSCN").html("<div class='error'>Có lỗi xảy ra: " + errmgs + "</div>");
				},
				beforeSend: function(){
					$("#divThemImg").html("<img id='imgLoading' src='images/more_loading.gif' width='22' height='22'  />");
				},
				complete: function(){
					//$("#divThemImg").html(divInnerHTML);
				},
				success: function(data){
					$("#divDSCN").html(data);
					$(".btnXoaLop, .btnSua4").hide();
				}
				
			});
		 }
		 
	 }
	 
	 
	 function reLoad(){
		 
		 	var url = "ajax_lop.php";
			var malop = $("#txtMaLop").val();			 
			var last = $("#btnLast").val().toString();	
			
			var param = {"MaLop" : malop , "Last" : last};
			 
			$.ajax({
				url:url,
				type: "POST",
				data: param,
				dataType: "HTML",			
				error: function(xhr,status,errmgs){
					$("#divDSLop").html("<div class='error'>Có lỗi xảy ra: " + errmgs + "</div>");
				},
				beforeSend: function(){
					$("#divThemImg").html("<img id='imgLoading' src='images/more_loading.gif' width='22' height='22'  />");
				},
				complete: function(){
					$("#divThemImg").html(divInnerHTML);
				},
				success: function(data){
					$("#divDSLop").html(data);
					$(".btnXoaLop, .btnSua4").hide();
				}
				
			});
		  
	 }
	 //xử lý nút thêm
	 $(document).on("click",".btnAdd",function(event){
		var dialog = $("#dialogAddLop");
		
		var button = $(this);
		var malop = $(button).val() ;		 
		var url = "ajax_lop.php";
		var imgEdit = $(button).html();
		var param = {"MaLop" : malop , "Type" : "getInfo"};
		 
		$.ajax({
			url:url,
			
			success: function(data){
				if (data){
					 $(dialog).find("#txtML").val();
					 $(dialog).find("#txtMaCN").val();
					 $(dialog).find("#txtKhoa").val();
					 $(dialog).find("#txtTenLop").val();
					 $(dialog).dialog("open");	
					
				 
				}else{
					showError("có lỗi.");
				}
				
				 
				 
			}
			
		});
		
		
		 event.preventDefault();
		
	});
	 // xử lý nút xóa
	 $(document).on("click",".btnXoaLop",function(event){
		 var button = $(this);
		 var malop = $(button).val() ;
		 
		 var x = "Có chắc bạn muốn xóa " + malop + " không?";
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
				 		var url = "ajax_lop.php";							 			
						var param = {"DelMaLop":malop};		
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
									var err = "Không thể xóa lop " + malop;
									showError(data);
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
				 
				 title: "Thông báo lỗi  ",
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
	$(document).on("click",".btnSua4",function(event){
		var dialog = $("#dialogUpdateLop");
		
		var button = $(this);
		var malop = $(button).val() ;		 
		var url = "ajax_lop.php";
		var imgEdit = $(button).html();
		var param = {"MaLop" : malop , "Type" : "getInfo"};
		 
		$.ajax({
			url:url,
			type: "POST",
			data: param,
			dataType: "JSON",			
			error: function(xhr,status,errmgs){
				var err = "Có lỗi xảy ra khi lấy thông tin nganh " + manganh + " " + errmgs;
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
					 $(dialog).find("#txtUpdateMaLop").val(data.MaLop);
					 $(dialog).find("#txtUpdateMaCN").val(data.MaCN);
					 $(dialog).find("#txtUpdateKhoa").val(data.Khoa);
					 $(dialog).find("#txtUpdateTenLop").val(data.TenLop);
					 $(dialog).dialog("open");					 
					
				}else{
					showError("Nganh không tồn tại.");
				}
				
				 
				 
			}
			
		});
		
		
		 event.preventDefault();
		
	});
	 
	 $(document).on("mouseover",".ds tr",function(event){
		 $(this).find(".btnXoaLop").show();
		 $(this).find(".btnSua4").show();
	 });
	 
	 $(document).on("mouseout",".ds tr",function(){
		 $(this).find(".btnXoaLop").hide();
		 $(this).find(".btnSua4").hide();
	 });
	  
	
   
   $("#leftSide").sortable({
	   axis: "y",
	   revert: 500,
	   handle:".title",
	   curosr: "move"
   }).disableSelection();
   
   $("#dialogAddLop").dialog({
	   autoOpen:false,
	   closeOnEscape: true,
	   closeText: "Đóng",
	   resizable: false,
	   title: "Thêm Lớp",
	   show: {effect: "drop", duration: 200, direction: "up"},
	   hide: "slide",
	   modal: true,
	   width: 550,
	   height: 600,
	   buttons: [
		 	       {
		 	    	  text:"Thêm Lớp",
		 	    	  id: "btnAdd",
				 	  click: function(){
				 	 		//$("#btnAdd").hide().before("<span id='spanUpdateLoading'><img src='images/more_loading.gif' width='26' height='18'  />  &nbsp; &nbsp; &nbsp;</span>");
				 	 		
				 	 		var malop = $("#txtML").val();
							var macn = $("#txtMaCN").val();
				 	 		var tenlop = $("#txtTenLop").val();
				 	 		var khoa = $("#txtKhoa").val();
				 	 		var param = {
				 	 				Type: "Add",
				 	 				MaLop : malop,
									TenLop: tenlop,
									Khoa: khoa,
									MaCN:macn,
				 	 				
				 	 		};
				 	 		var url = "ajax_lop.php";
				 	 		
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
										$("#dialogAddLop").dialog("close");										
										
									}else{
										var err = "Không thể thêm lớp";
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
   
   $("#dialogUpdateLop").dialog({
	   autoOpen:false,
	   closeOnEscape: true,
	   closeText: "Đóng",
	   resizable: false,
	   title: "Cập nhật thông tin",
	   show: {effect: "drop", duration: 200, direction: "up"},
	   hide: "slide",
	   modal: true,
	   width: 450,
	   height: 500,
	   buttons: [
		 	       {
		 	    	  text:"Lưu",
		 	    	  id: "btnLuu",
				 	  click: function(){
				 	 		//$("#btnLuu").hide().before("<span id='spanUpdateLoading'><img src='images/more_loading.gif' width='26' height='18'  />  &nbsp; &nbsp; &nbsp;</span>");
				 	 		var malop = $("#txtUpdateMaLop").val();
							var macn = $("#txtUpdateMaCN").val();
				 	 		var khoa =$("#txtUpdateKhoa").val();
							var tenlop = $("#txtUpdateTenLop").val();
				 	 		
				 	 		var param = {
				 	 				Type: "Update",
				 	 				MaLop : malop,
									MaCN : macn,
									TenLop: tenlop,
									Khoa : khoa
									
				 	 		};
				 	 		var url = "ajax_lop.php";
				 	 		
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
									$("#btnLuu2").show();
									
								},
								beforeSend: function(){ 
								},
								success: function(data){
									if (data == "OK"){	
										reLoad();
										$("#dialogUpdateLop").dialog("close");	
										
										
									}else{
										var err = "Không thể cập nhật ngành " + masv;
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

