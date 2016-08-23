<?php 
	require_once("config.php");
	
	// kiểm tra trường hợp lấy thông tin SV
	
	if (isset($_REQUEST["Type"])){
		if ($_REQUEST["Type"]== "getInfo"){
			$maNganh = $_REQUEST["MaNganh"];
			$sql = "SELECT * FROM tbl_nganh WHERE MaNganh='".$maNganh."'";
			$result = $db->query($sql);
			if ($result){
				echo  json_encode($result->fetch_array());
			}else{
				echo  json_encode(null);
			}
			
			exit();
		}
		if ($_REQUEST["Type"]== "Add"){
			$maNganh = $_REQUEST["MaNganh"];
			$tenNganh = $_REQUEST["TenNganh"];
			
			
			$sql = "INSERT Into tbl_nganh (MaNganh,TenNganh) VALUES ('".$maNganh."','".$tenNganh."')";
			 
			$result = $db->query($sql);
			
			if ($result && $db->affected_rows > 0){
				echo "OK";
			}else{
				echo "ERROR";
			}
			
			exit();
		}
		if ($_REQUEST["Type"]== "Update"){
			$maNganh = $_REQUEST["MaNganh"];
			$tenNganh = $_REQUEST["TenNganh"];
			
			
			
			$sql = "UPDATE tbl_nganh SET  
					 	TenNganh='".$tenNganh."' WHERE MaNganh='".$maNganh."'" ;
			 
			$result = $db->query($sql);
			
			if ($result && $db->affected_rows > 0){
				echo "OK";
			}else{
				echo "ERROR";
			}
			
			exit();
		}
		
	}
	
	//kiểm tra trường hợp xóa 1 dòng
	if ($_REQUEST["DelMaNganh"]){
		$manganh = $_REQUEST["DelMaNganh"];
		$sql = "DELETE FROM tbl_nganh WHERE MaNganh='".$manganh."'";
		$result = $db->query($sql);
		if ($result && $db->affected_rows > 0){
			echo "OK";
		}else{
			echo "ERROR";
		}
		
		exit();
	}
	
	$maLop="";
	// lấy mã lớp chọn từ DropDownList
	if (isset($_REQUEST["MaLop"])){
		  $maLop= $_REQUEST["MaLop"];
	}
	 
	$limit = 10;
	$last = $limit;
	if (isset($_POST["Last"])){
		$last= $_POST["Last"]+$limit;
	}
	
	 
	$sql = "SELECT COUNT(*) FROM dbo_sinhvien WHERE MaLop='".$maLop."'";
	$result = $db->query($sql);
	$total_row = 0;
	if ($result){
		$row = $result->fetch_array();
		$total_row = $row[0];
	}
	
	
	$sql = "SELECT * FROM tbl_nganh  ";
	$result = $db->query($sql);
	// nếu có dữ liệu thì hiển thị danh sách
		
	if ($result && $result->num_rows>0){
	?>
	
	<table class="ds" style='width:100%'>
			<!-- in tiêu đề danh sách -->
			<thead>
				<tr class="ui-widget-header">
					<th><input type="checkbox" id="checkAll" style="float:left"/></th>
					<th>STT</th>
					<th>Mã Ngành</th>
					<th>Tên Ngành</th>
					<th></th>
				</tr>
			</thead>
			<!-- end in tiêu đề-->
			<!-- inh danh dánh -->
			<tbody>
				<?php
				$i = 0;
				while ( $row = $result->fetch_array () ) {
					echo "<tr class='trsv'  >";
					echo "<td><input name='chkmanganh[]'  value='" . $row ["MaNganh"] . "' class='chkmanganh' type='checkbox' style=''/> </td>";
					echo "<td class='stt'>" . ++ $i . "</td>";
					echo "<td>" . $row ["MaNganh"] . "</td>";
					echo "<td>" . $row ["TenNganh"] .  "</td>";
					echo "<td>";
					echo "<button  class='btnSua2' name='MaNganh' value='" . $row ["MaNganh"] . "'><span class='ui-icon ui-icon-pencil' ></span></button>";
					echo "<button name='btnXoaNganh' class='btnXoaNganh' value='" . $row ["MaNganh"] . "' ><span class='ui-icon ui-icon-trash'  ></span> </button>";
					echo "</td>";
					echo "</tr>";
				}
				$result->free ();
				?>
			</tbody>
			<!--  end in danh sách-->
		
			<!-- in footer của danh sách -->
			<tfoot>
				<tr>
					<td colspan="8"  >
						<div id="divThemImg" align="center" >
							<button id="btnLast"  style="display: none;" data-finish="
										<?php
											if ($last >= $total_row) {
												echo 1;
											}else{
												echo 0;
											}							
										?>
										"  value="<?php echo $last;?>" >
							</button>
						</div>
		
		
					</td>
				</tr>
			</tfoot>
			<!--  end in footer của danh sách -->
		</table>

<?php 
  }else{
  	echo "<div class='success'> Không có ngành nào. </div>";
  }
?>