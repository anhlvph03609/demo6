
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
	 $(document).on("change",".chkmacn", function(){
		$(this).parent().parent().toggleClass("selected");
	 }); 
	
	// check nút chọn tất cả 
	 $(document).on("change","#checkAll", function(){
		var val = $(this).prop("checked");
		$(".chkmacn").prop("checked",val);		 
		if (val){
			$(".trcn").addClass("selected");
		}else{
			$(".trcn").removeClass("selected");
		}
	 }); 
	 
	 // xử lý sự kiện chọn lớp 
	 $("#svDSN").change(function(){
			var url = "ajax_chuyennganh.php";
			var manganh = $(this).val();		 
			var param = {"MaNganh":manganh};		
			$.ajax({
				url:url,
				type: "POST",
				data: param,
				dataType: "HTML",			
				error: function(xhr,status,errmgs){
					$("#divDSCN").html("<div class='error'>Có lỗi xảy ra: " + errmgs + "</div>");
				},
				beforeSend: function(){
					$("#divImg").html("<img id='imgLoading' src='images/ajax_loading.gif' width='22' height='22'  />");
				},
				complete: function(){
					$("#divImg").html("");
				},
				success: function(data){
					$("#divDSCN").html(data);
					$(".btnXoa, .btnSua3").hide();
					 
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
		 
		 	var url = "ajax_chuyennganh.php";
			var manganh = $("#svDSN").val();			 
			var last = $("#btnLast").val().toString();	
			
			var param = {"MaNganh" : manganh , "Last" : last};
			 
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
					$(".btnXoa, .btnSua3").hide();
				}
				
			});
		 }
		 
	 }
	 
	 
	 function reLoad(){
		 
		 	var url = "ajax_nganh.php";
			var manganh = $("#svDSCN").val();			 
			var last = $("#btnLast").val().toString();	
			
			var param = {"MaNganh" : manganh , "Last" : last};
			 
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
					$(".btnXoa, .btnSua3").hide();
				}
				
			});
		  
	 }
	 //xử lý nút thêm
	 $(document).on("click",".btnAdd",function(event){
		var dialog = $("#dialogAddCN");
		
		var button = $(this);
		var macn = $(button).val() ;		 
		var url = "ajax_chuyennganh.php";
		var imgEdit = $(button).html();
		var param = {"MaCN" : macn , "Type" : "getInfo"};
		 
		$.ajax({
			url:url,
			
			success: function(data){
				if (data){
					 $(dialog).find("#txtMaNganh").val();
					 $(dialog).find("#txtMaCN").val();
					 $(dialog).find("#txtTenCN").val();
					 
					 $(dialog).dialog("open");					 
				 
				}else{
					showError("SV không tồn tại.");
				}
				
				 
				 
			}
			
		});
		
		
		 event.preventDefault();
		
	});
	 // xử lý nút xóa
	 $(document).on("click",".btnXoa",function(event){
		 var button = $(this);
		 var macn = $(button).val() ;
		 
		 var x = "Có chắc bạn muốn xóa " + macn + " không?";
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
				 		var url = "ajax_chuyennganh.php";							 			
						var param = {"MaCN":macn};		
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
									var err = "Không thể xóa chuyên ngành " + macn;
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
	$(document).on("click",".btnSua3",function(event){
		var dialog = $("#dialogUpdateCN");
		
		var button = $(this);
		var macn = $(button).val() ;		 
		var url = "ajax_chuyennganh.php";
		var imgEdit = $(button).html();
		var param = {"MaCN" : macn , "Type" : "getInfo"};
		 
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
					 $(dialog).find("#txtUpdateMaNganh").val(data.MaNganh);
					 $(dialog).find("#txtUpdateMaCN").val(data.MaCN);
					 $(dialog).find("#txtUpdateTenCN").val(data.TenCN);
					 
					 $(dialog).dialog("open");					 
				 
				}else{
					showError("chuyên ngành không tồn tại.");
				}
				
				 
				 
			}
			
		});
		
		
		 event.preventDefault();
		
	});
	 
	 $(document).on("mouseover",".ds tr",function(event){
		 $(this).find(".btnXoa").show();
		 $(this).find(".btnSua3").show();
	 });
	 
	 $(document).on("mouseout",".ds tr",function(){
		 $(this).find(".btnXoa").hide();
		 $(this).find(".btnSua3").hide();
	 });
	  
	
   
   $("#leftSide").sortable({
	   axis: "y",
	   revert: 500,
	   handle:".title",
	   curosr: "move"
   }).disableSelection();
   
   $("#dialogAddCN").dialog({
	   autoOpen:false,
	   closeOnEscape: true,
	   closeText: "Đóng",
	   resizable: false,
	   title: "Thêm chuyên ngành",
	   show: {effect: "drop", duration: 200, direction: "up"},
	   hide: "slide",
	   modal: true,
	   width: 550,
	   height: 600,
	   buttons: [
		 	       {
		 	    	  text:"Thêm CN",
		 	    	  id: "btnAdd",
				 	  click: function(){
				 	 		//$("#btnAdd").hide().before("<span id='spanUpdateLoading'><img src='images/more_loading.gif' width='26' height='18'  />  &nbsp; &nbsp; &nbsp;</span>");
				 	 		
				 	 		var manganh = $("#txtMaNganh").val();
							var macn = $("#txtMaCN").val();
				 	 		var tencn = $("#txtTenCN").val();
				 	 		
				 	 		
				 	 		var param = {
				 	 				Type: "Add",
				 	 				MaNganh : manganh,
									MaCN: macn,
				 	 				TenCN:tencn
				 	 				
				 	 		};
				 	 		var url = "ajax_chuyennganh.php";
				 	 		
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
										$("#dialogAddCN").dialog("close");										
										
									}else{
										var err = "Không thể thêm chuyên ngành";
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
   
   $("#dialogUpdateCN").dialog({
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
		 	    	  id: "btnLuuCN",
				 	  click: function(){
				 	 	//	$("#btnLuuCN").hide().before("<span id='spanUpdateLoading'><img src='images/more_loading.gif' width='26' height='18'  />  &nbsp; &nbsp; &nbsp;</span>");
				 	 		
				 	 		var manganh = $("#txtUpdateMaNganh").val();
							var macn = $("#txtUpdateMaCN").val();
				 	 		var tencn = $("#txtUpdateTenCN").val();
				 	 		
				 	 		
				 	 		var param = {
				 	 				Type: "Update",
									MaNganh : manganh,
									MaCN: macn,
				 	 				TenCN:tencn
				 	 		};
				 	 		var url = "ajax_chuyennganh.php";
				 	 		
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
									$("#btnLuuCN").show();
									
								},
								beforeSend: function(){ 
								},
								success: function(data){
									if (data == "OK"){	
										reLoad();
										$("#dialogUpdateCN").dialog("close");										
										
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

