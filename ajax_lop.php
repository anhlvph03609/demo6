<?php 
	require_once("config.php");
	
	// kiểm tra trường hợp lấy thông tin SV
	
	if (isset($_REQUEST["Type"])){
		if ($_REQUEST["Type"]== "getInfo"){
			$malop = $_REQUEST["MaLop"];
			$sql = "SELECT * FROM tbl_lop WHERE MaLop='".$malop."'";
			$result = $db->query($sql);
			if ($result){
				echo  json_encode($result->fetch_array());
			}else{
				echo  json_encode(null);
			}
			
			exit();
		}
		if ($_REQUEST["Type"]== "Add"){
			$malop = $_REQUEST["MaLop"];
			$macn = $_REQUEST["MaCN"];
			$ten = $_REQUEST["TenLop"];
			$khoa = $_REQUEST["Khoa"];
			
			$sql = "INSERT Into tbl_lop (MaLop,Khoa,TenLop,MaCN) VALUES ('".$malop."','".$khoa."','".$ten."','".$macn."')";
			 
			$result = $db->query($sql);
			
			if ($result && $db->affected_rows > 0){
				echo "OK";
			}else{
				echo "ERROR";
			}
			
			exit();
		}
		if ($_REQUEST["Type"]== "Update"){
			
			$malop = $_REQUEST["MaLop"];
			$macn = $_REQUEST["MaCN"];
			$ten = $_REQUEST["TenLop"];
			$khoa = $_REQUEST["Khoa"];
			
			
			$sql = "UPDATE tbl_lop SET MaCN='".$macn."', 
					 	TenLop='".$ten."',Khoa='".$khoa."'
					 WHERE MaLop='".$malop."'";
			 
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
	if (isset($_REQUEST["DelMaLop"])){
		$malop = $_REQUEST["DelMaLop"];
		$sql = "DELETE FROM tbl_lop WHERE MaLop='".$malop."'";
		$result = $db->query($sql);
		if ($result && $db->affected_rows > 0){
			echo "OK";
		}else{
			echo "ERROR";
		}
		
		exit();
	}
	
	$maCN="";
	// lấy mã lớp chọn từ DropDownList
	if (isset($_REQUEST["MaCN"])){
		  $maCN= $_REQUEST["MaCN"];
	}
	 
	$limit = 10;
	$last = $limit;
	if (isset($_POST["Last"])){
		$last= $_POST["Last"]+$limit;
	}
	
	 
	$sql = "SELECT COUNT(*) FROM tbl_lop WHERE MaCN='".$maCN."'";
	$result = $db->query($sql);
	$total_row = 0;
	if ($result){
		$row = $result->fetch_array();
		$total_row = $row[0];
	}
	
	
	$sql = "SELECT * FROM tbl_lop WHERE MaCN='".$maCN."' LIMIT 0, $last";
	$result = $db->query($sql);
	// nếu có dữ liệu thì hiển thị danh sách
		
	if ($result && $result->num_rows>0){
	?>
	
	<table class="ds" style="width:100%"> 
			<!-- in tiêu đề danh sách -->
			<thead>
				<tr class="ui-widget-header">
					<th><input type="checkbox" id="checkAll"/></th>
					<th>STT</th>
					<th>Mã lớp</th>
					<th>Mã chuyên ngành</th>
					<th>Khóa</th>
					<th>Tên lớp</th>
					<th></th>
				</tr>
			</thead>
			<!-- end in tiêu đề-->
			<!-- inh danh dánh -->
			<tbody >
				<?php
				$i = 0;
				while ( $row = $result->fetch_array () ) {
					echo "<tr class='trcn' >";
					echo "<td><input name='chkmacn[]'  value='" . $row ["MaLop"] . "' class='chkmacn' type='checkbox'/> </td>";
					echo "<td class='stt'>" . ++ $i . "</td>";
					echo "<td>" . $row ["MaLop"] . "</td>";
					echo "<td>" . $row ["MaCN"] . " </td>";
					echo "<td>" . $row ["Khoa"] . " </td>";
					echo "<td>" . $row ["TenLop"] . " </td>";
					echo "<td>";
					echo "<button  class='btnSua4' name='MaCN' value='" . $row ["MaLop"] . "'><span class='ui-icon ui-icon-pencil' ></span></button>";
					echo "<button name='btnXoa' class='btnXoaLop' value='" . $row ["MaLop"] . "' ><span class='ui-icon ui-icon-trash'  ></span> </button>";
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
  	echo "<div class='success'> Không có lớp  nào. </div>";
  }
?>