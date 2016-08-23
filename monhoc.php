<?php require "header.php"; ?>

<div class="group-box">
	<div align="center">
	<div class="title">Chuyên ngành</div>
	<div class="group-box-content">
		
	
		<form method="post" name="frmCN" action="<?php echo $_SERVER["PHP_SELF"];?>">			
			<label>Chọn ngành:</label>
			<select name="MaCN" id="svDSCN" >
				<option value="">--chọn--</option>
				<?php 
				// IN danh sách lớp
				$sql ="SELECT * FROM tbl_chuyennganh ORDER BY MaCN";
				$result = $db->query($sql);
				if ($result){
					while($row = $result->fetch_array()){
						echo "<option value='".$row["MaCN"]."' >".$row["TenCN"]."</option>";
					}
				}
				$result->free();
				?>							
			</select> &nbsp;&nbsp;	
			<button type="button" name="addSV" id="addLop" class="btnAddMon" >Thêm môn học</button>
			<span id="divImg" ></span>
			<br />			
			<hr>
			 
			<div id="divDSMH" >
			
			</div>
			
			<div id="delDialog">
				<p> </p>
			</div>
			
			<div id="errDialog">
				<p> </p>
			</div>
			
			
		<!--  form này không có tác dụng gì, chỉ dùng để chỉ ra nút Sửa ở cột bên phải bảng
		thuộc về form này, mục đích là không cho post dữ liệu dư thừa khi nhấn nút Sửa, vì chỉ cần giá trị
		trong thuộc tính value của nút Sửa sử dụng tag <button>  -->	
		</form>
		<form id="frmNoAction">
		</form>
		
		
		<div id="dialogAddMon">
				<p id="infor"></p>
				
				<label for="txtMMH">Mã môn học:</label>
				<input type="text" id="txtMMH" name="txtMMH"  /> <br />
				
				<label for="txtMaCN">Mã Chuyên ngành:</label>
				<input type="text" id="txtMaCN" name="txtMaCN" /> <br />
				
				<label for="txtTenMH">Tên môn học : </label>
				<input type="text" id="txtTenMH" name="txtTenMH" /> <br />
				
				<label for="txtSoTC">Số tín chỉ: </label>
				<input type="text" id="txtSoTC" name="txtSoTC" /> <br />
				
				<label for="txtSoTiet">Số tiết: </label>
				<input type="text" id="txtSoTiet" name="txtSoTiet" /> <br />
				
			</div>
		<div id="dialogUpdateMon">
				<p id="info"></p>
				
				<label for="txtUpdateMMH">Mã môn học:</label>
				<input type="text" id="txtUpdateMMH" name="txtUpdateMMH"  /> <br />
				
				<label for="txtUpdateMaCN">Mã Chuyên ngành:</label>
				<input type="text" id="txtUpdateMaCN" name="txtUpdateMaCN" /> <br />
				
				<label for="txtUpdateTenMH">Tên môn học : </label>
				<input type="text" id="txtUpdateTenMH" name="txtUpdateTenMH" /> <br />
				
				<label for="txtUpdateSoTC">Số tín chỉ: </label>
				<input type="text" id="txtUpdateSoTC" name="txtUpdateSoTC" /> <br />
				
				<label for="txtUpdateSoTiet">Số tiết: </label>
				<input type="text" id="txtUpdateSoTiet" name="txtUpdateSoTiet" /> <br />
				
			</div>
	 <p> </p>
	 </div>
	 </div>
</div>		
<?php require "footer.php"; ?>