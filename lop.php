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
			<button type="button" name="addSV" id="addLop" class="btnAdd" >Thêm Lớp</button>
			<span id="divImg" ></span>
			<br />			
			<hr>
			 
			<div id="divDSLop" >
			
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
		
		
		<div id="dialogAddLop">
				<p id="infor"></p>
				
				<label for="txt">Mã Lớp:</label>
				<input type="text" id="txtML" name="txtML"  /> <br />
				
				<label for="txtMaCN">Mã Chuyên ngành:</label>
				<input type="text" id="txtMaCN" name="txtMaCN" /> <br />
				
				<label for="txtKhoa">Khóa: </label>
				<input type="text" id="txtKhoa" name="txtKhoa" /> <br />
				
				<label for="txtTenLop">Tên lớp: </label>
				<input type="text" id="txtTenLop" name="txtTenLop" /> <br />
				
				
			</div>
		<div id="dialogUpdateLop">
				<p id="info"></p>
				
				<label for="txtUpdateMaLop">Mã Lớp:</label>
				<input type="text" id="txtUpdateMaLop" name="txtUpdateMaLop"  /> <br />
				
				<label for="txtUpdateMaCN">Mã Chuyên ngành:</label>
				<input type="text" id="txtUpdateMaCN" name="txtUpdateMaCN" /> <br />
				
				<label for="txtUpdateKhoa">Khóa: </label>
				<input type="text" id="txtUpdateKhoa" name="txtUpdateKhoa" /> <br />
				
				<label for="txtUpdateTenLop">Tên lớp: </label>
				<input type="text" id="txtUpdateTenLop" name="txtUpdateTenLop" /> <br />
				
			</div>
	 <p> </p>
	 </div>
	 </div>
</div>		
<?php require "footer.php"; ?>