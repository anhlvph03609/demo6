<?php require "header.php"; ?>

<div class="group-box">
	<div align="center">
	<div class="title">Chuyên ngành</div>
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
		<form method="post" name="frmCN" action="<?php echo $_SERVER["PHP_SELF"];?>">			
			<label>Chọn ngành:</label>
			<select name="MaNganh" id="svDSN" >
				<option value="">--chọn--</option>
				<?php 
				// IN danh sách lớp
				$sql ="SELECT * FROM tbl_nganh ORDER BY MaNganh";
				$result = $db->query($sql);
				if ($result){
					while($row = $result->fetch_array()){
						echo "<option value='".$row["MaNganh"]."' >".$row["TenNganh"]."</option>";
					}
				}
				$result->free();
				?>							
			</select> &nbsp;&nbsp;	
				<button type="button" name="addCN" id="addCN" class="btnAdd" >Thêm Chuyên ngành</button>
			<span id="divImg" ></span>
			<br />			
			<hr>
			 
			<div id="divDSCN" >
			
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
		
		
		<div id="dialogAddCN">
				<p id="infor"></p>
				
				<label for="txtMaNganh">Mã Ngành:</label>
				<input type="text" id="txtMaNganh" name="txtMaNganh"  /> <br />
				
				<label for="txtMaCN">Mã Chuyên ngành:</label>
				<input type="text" id="txtMaCN" name="txtMaCN" /> <br />
				
				<label for="txtTenCN">Tên chuyên ngành:</label>
				<input type="text" id="txtTenCN" name="txtTenCN" /> <br />
				
				
				
			</div>
		<div id="dialogUpdateCN">
				<p id="info"></p>
				
				<label for="txtUpdateMaNganh">Mã Ngành:</label>
				<input type="text" id="txtUpdateMaNganh" name="txtUpdateMaNganh"  /> <br />
				
				<label for="txtUpdateMaCN">Mã Chuyên ngành:</label>
				<input type="text" id="txtUpdateMaCN" name="txtUpdateMaCN" /> <br />
				
				<label for="txtUpdateTenCN">Tên chuyên ngành:</label>
				<input type="text" id="txtUpdateTenCN" name="txtUpdateTenCN" /> <br />
				
			</div>
	 <p> </p>
	 </div>
	 </div>
</div>		
<?php require "footer.php"; ?>