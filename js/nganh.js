
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
	 $(document).on("change",".chkmanganh", function(){
		$(this).parent().parent().toggleClass("selected");
	 }); 
	
	// check nút chọn tất cả 
	 $(document).on("change","#checkAll", function(){
		var val = $(this).prop("checked");
		$(".chkmanganh").prop("checked",val);		 
		if (val){
			$(".trsv").addClass("selected");
		}else{
			$(".trsv").removeClass("selected");
		}
	 }); 
	 
	 // xử lý sự kiện chọn lớp 
	 $(document).ready(function(){
			var url = "ajax_nganh.php";
			var manganh = $(this).val();		 
			var param = {"MaNganh":manganh};		
			$.ajax({
				url:url,
				type: "POST",
				data: param,
				dataType: "HTML",			
				error: function(xhr,status,errmgs){
					$("#divDSN").html("<div class='error'>Có lỗi xảy ra: " + errmgs + "</div>");
				},
				beforeSend: function(){
					$("#divImg").html("<img id='imgLoading' src='images/ajax_loading.gif' width='22' height='22'  />");
				},
				complete: function(){
					$("#divImg").html("");
				},
				success: function(data){
					$("#divDSN").html(data);
					$(".btnXoaNganh, .btnSua2").hide();
					 
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
		 
		 	var url = "ajax_nganh.php";
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
					$(".btnXoaNganh, .btnSua2").hide();
				}
				
			});
		 }
		 
	 }
	 
	 
	 function reLoad(){
		 
		 	var url = "ajax_nganh.php";
			var manganh = $("#txtMaNganh").val();			 
			var last = $("#btnLast").val().toString();	
			
			var param = {"MaNganh" : manganh , "Last" : last};
			 
			$.ajax({
				url:url,
				type: "POST",
				data: param,
				dataType: "HTML",			
				error: function(xhr,status,errmgs){
					$("#divDSN").html("<div class='error'>Có lỗi xảy ra: " + errmgs + "</div>");
				},
				beforeSend: function(){
					$("#divThemImg").html("<img id='imgLoading' src='images/more_loading.gif' width='22' height='22'  />");
				},
				complete: function(){
					//$("#divThemImg").html(divInnerHTML);
				},
				success: function(data){
					$("#divDSN").html(data);
					$(".btnXoaNganh, .btnSua2").hide();
				}
				
			});
		  
	 }
	 //xử lý nút thêm
	 $(document).on("click",".btnAdd",function(event){
		var dialog = $("#dialogAddNganh");
		
		var button = $(this);
		var manganh = $(button).val() ;		 
		var url = "ajax_nganh.php";
		var imgEdit = $(button).html();
		var param = {"MaNganh" : manganh , "Type" : "getInfo"};
		 
		$.ajax({
			url:url,
			
			success: function(data){
				if (data){
					 $(dialog).find("#txtMaNganh").val();
					 $(dialog).find("#txtTenNganh").val();
					 $(dialog).dialog("open");	
					
				 
				}else{
					showError("có lỗi.");
				}
				
				 
				 
			}
			
		});
		
		
		 event.preventDefault();
		
	});
	 // xử lý nút xóa
	 $(document).on("click",".btnXoaNganh",function(event){
		 var button = $(this);
		 var manganh = $(button).val() ;
		 
		 var x = "Có chắc bạn muốn xóa " + manganh + " không?";
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
				 		var url = "ajax_nganh.php";							 			
						var param = {"DelMaNganh":manganh};		
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
									var err = "Không thể xóa nganh " + manganh;
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
	$(document).on("click",".btnSua2",function(event){
		var dialog = $("#dialogUpdateNganh");
		
		var button = $(this);
		var manganh = $(button).val() ;		 
		var url = "ajax_nganh.php";
		var imgEdit = $(button).html();
		var param = {"MaNganh" : manganh , "Type" : "getInfo"};
		 
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
					 $(dialog).find("#txtMN").val(data.MaNganh);
					 $(dialog).find("#txtTN").val(data.TenNganh);
					 $(dialog).dialog("open");					 
					
				}else{
					showError("Nganh không tồn tại.");
				}
				
				 
				 
			}
			
		});
		
		
		 event.preventDefault();
		
	});
	 
	 $(document).on("mouseover",".ds tr",function(event){
		 $(this).find(".btnXoaNganh").show();
		 $(this).find(".btnSua2").show();
	 });
	 
	 $(document).on("mouseout",".ds tr",function(){
		 $(this).find(".btnXoaNganh").hide();
		 $(this).find(".btnSua2").hide();
	 });
	  
	
   
   $("#leftSide").sortable({
	   axis: "y",
	   revert: 500,
	   handle:".title",
	   curosr: "move"
   }).disableSelection();
   
   $("#dialogAddNganh").dialog({
	   autoOpen:false,
	   closeOnEscape: true,
	   closeText: "Đóng",
	   resizable: false,
	   title: "Thêm Ngành",
	   show: {effect: "drop", duration: 200, direction: "up"},
	   hide: "slide",
	   modal: true,
	   width: 550,
	   height: 600,
	   buttons: [
		 	       {
		 	    	  text:"Thêm Nganh",
		 	    	  id: "btnAdd",
				 	  click: function(){
				 	 		//$("#btnAdd").hide().before("<span id='spanUpdateLoading'><img src='images/more_loading.gif' width='26' height='18'  />  &nbsp; &nbsp; &nbsp;</span>");
				 	 		
				 	 		var MaNganh = document.getElementById("txtMaNganh").value;
							var TenNganh = $("#txtTenNganh").val();
				 	 		
				 	 		
				 	 		var param = {
				 	 				Type: "Add",
				 	 				MaNganh : MaNganh,
									TenNganh: TenNganh,
				 	 				
				 	 		};
				 	 		var url = "ajax_nganh.php";
				 	 		
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
										$("#dialogAddNganh").dialog("close");										
										
									}else{
										var err = "Không thể thêm ngành";
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
   
   $("#dialogUpdateNganh").dialog({
	   autoOpen:false,
	   closeOnEscape: true,
	   closeText: "Đóng",
	   resizable: false,
	   title: "Cập nhật thông tin",
	   show: {effect: "drop", duration: 200, direction: "up"},
	   hide: "slide",
	   modal: true,
	   width: 350,
	   height: 300,
	   buttons: [
		 	       {
		 	    	  text:"Lưu",
		 	    	  id: "btnLuu2",
				 	  click: function(){
				 	 		//$("#btnLuu").hide().before("<span id='spanUpdateLoading'><img src='images/more_loading.gif' width='26' height='18'  />  &nbsp; &nbsp; &nbsp;</span>");
				 	 		var manganh = $("#txtMN").val();
							var tennganh = $("#txtTN").val();
				 	 		
				 	 		
				 	 		var param = {
				 	 				Type: "Update",
				 	 				MaNganh : manganh,
									TenNganh: tennganh
				 	 		};
				 	 		var url = "ajax_nganh.php";
				 	 		
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
										$("#dialogUpdateNganh").dialog("close");	
										
										
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

