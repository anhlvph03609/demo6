<?php require "header.php"; ?>

<div class="group-box">
	<div align="center">
	<div class="title">SINH VIÊN</div>
	<div class="group-box-content">
		
	<?php 
		// kiểm tra xóa nhiều dòng
		/* if (isset($_POST["btnXoaTatCa"]) && isset($_POST["chkmasv"])){
			$in = "''"; 
			foreach($_POST["chkmasv"] as $val){				
				$in .= ",'".$val."'";			 
			}
			$sql = "DELETE FROM dbo_sinhvien WHERE MaSV IN(".$in.")";
			
			$result = $db->query($sql);
			if ($result && $db->affected_rows > 0){ 
				echo "<div class='success'>Đã xóa thành công</div>";
			}else{
				echo "<div class='error'>Có lỗi xảy ra khi xóa.</div>";
			}		
		} */
		
			
	?>
		<form method="post" name="frmSV" action="<?php echo $_SERVER["PHP_SELF"];?>">			
			<label>Chọn lớp:</label>
			<select name="MaLop" id="svDSLop" >
				<option value="">--chọn--</option>
				<?php 
				// IN danh sách lớp
				$sql ="SELECT * FROM tbl_lop ORDER BY MaLop";
				$result = $db->query($sql);
				if ($result){
					while($row = $result->fetch_array()){
						echo "<option value='".$row["MaLop"]."' >".$row["TenLop"]."</option>";
					}
				}
				$result->free();
				?>							
			</select> &nbsp;&nbsp;	
				<button type="button" name="addLop" id="addLop" class="btnAdd" >Thêm sinh viên</button>
			<span id="divImg" ></span>
			<br />			
			<hr>
			 
			<div id="divDSSV" >
			
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
		
		<div id="dialogAddSV">
				<p id="infor"></p>
				
				<label for="txtMaLop">Mã Lớp:</label>
				<input type="text" id="txtMaLop" name="txtMaLop"  /> <br />
				
				<label for="txtMa">Mã SV:</label>
				<input type="text" id="txtMa" name="txtMa" /> <br />
				
				<label for="txtTen">Họ và tên:</label>
				<input type="text" id="txtTen" name="txtTen" /> <br />
				
				<label for="txtNgaySinh">Ngày Sinh:</label>
				<input type="text" id="txtNgaySinh" name="txtNgaySinh" /> <br />
				
				<label for="rdoGT">Giới tính:</label>
				 
				<input type="radio" id="Nam" name="rdoGioiTinh[]" value="Nam" checked />
					<span>Nam</span>
				<input type="radio" id="Nu" name="rdoGioiTinh[]" value="Nu" /> 
					<span>Nữ</span>
				<p></p>  								   
				  
				 <label for="txtQue">Quê Quán:</label>
				<input  type="text" id="txtQue" name="txtQue" cols="40" rows="4"></input> <br />
				
				
				<label for="txtEmailz">Email:</label>				
				<input type="text" id="txtEmail" name="txtEmail" /> <br />
				
			</div>
		<div id="dialogUpdateSV">
				<p id="info"></p>
				
				<label for="txtUpdateMaLop">Mã Lớp:</label>
				<input type="text" id="txtUpdateMaLop" name="txtUpdateMaLop" disabled /> <br />
				
				<label for="txtUpdateMaSV">Mã SV:</label>
				<input type="text" id="txtUpdateMaSV" name="txtUpdateMaSV" disabled /> <br />
				
				<label for="txtUpdateTen">Tên:</label>
				<input type="text" id="txtUpdateTen" name="txtUpdateTen" /> <br />
				
				<label for="txtUpdateNgaySinh">Ngày Sinh:</label>
				<input type="text" id="txtUpdateNgaySinh" name="txtUpdateNgaySinh" /> <br />
				
				<label for="rdoUpdateGioiTinh">Giới tính:</label>
				 
				<input type="radio" id="rdoUpdateNam" name="rdoGioiTinh[]" value="Nam" checked />
					<span>Nam</span>
				<input type="radio" id="rdoUpdateNu" name="rdoGioiTinh[]" value="Nu" /> 
					<span>Nữ</span>
				<p></p>  								   
				  
				 <label for="txtUpdateQue">Quê Quán:</label>
				<input  type="text" id="txtUpdateQue" name="txtUpdateQue" cols="40" rows="4"></input> <br />
				
				
				<label for="txtUpdateEmail">Email:</label>				
				<input type="text" id="txtUpdateEmail" name="txtUpdateEmail" /> <br />
				
			</div>
	 <p> </p>
	 </div>
	 </div>
</div>		
<?php require "footer.php"; ?>