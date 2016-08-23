<?php require "header.php"; ?>

<div class="group-box">
	<div align="center">
	<div class="title">Ngành đào tạo</div>
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
		
				<button type="button" name="addSV" id="addNganh" class="btnAdd" >Thêm ngành</button>
			<span id="divImg" ></span>
			<br />			
			<hr>
			 
			<div id="divDSN" >
			
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
		
		<div id="dialogAddNganh">
				<p id="infor"></p>
				
				<label for="txtMaNganh">Mã Ngành:</label>
				<input type="text" id="txtMaNganh" name="txtMaNganh"  /> <br />
				
				<label for="txtTenNganh">Tên Ngành:</label>
				<input type="text" id="txtTenNganh" name="txtTenNganh" /> <br />
				
			</div>
		<div id="dialogUpdateNganh">
				<p id="infor"></p>
				<label for="txtMN">Mã Ngành:</label>
				<input type="text" id="txtMN" name="txtUpdateMN"  /> <br />
				
				<label for="txtTN">Tên Ngành:</label>
				<input type="text" id="txtTN" name="txtUpdateTN" /> <br />
				
			</div>
	 <p> </p>
	 </div>
	 </div>
</div>		
<?php require "footer.php"; ?>