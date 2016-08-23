<?php 
	require_once("config.php");
	
	// kiểm tra trường hợp lấy thông tin SV
	
	if (isset($_REQUEST["Type"])){
		if ($_REQUEST["Type"]== "getInfo"){
			$macn = $_REQUEST["MaCN"];
			$sql = "SELECT * FROM tbl_chuyennganh WHERE MaCN='".$macn."'";
			$result = $db->query($sql);
			if ($result){
				echo  json_encode($result->fetch_array());
			}else{
				echo  json_encode(null);
			}
			
			exit();
		}
		if ($_REQUEST["Type"]== "Add"){
			$macn = $_REQUEST["MaCN"];
			$manganh = $_REQUEST["MaNganh"];
			$ten = $_REQUEST["TenCN"];
			
			
			$sql = "INSERT Into tbl_chuyennganh (MaCN,TenCN,MaNganh) VALUES ('".$macn."','".$ten."','".$manganh."')";
			 
			$result = $db->query($sql);
			
			if ($result && $db->affected_rows > 0){
				echo "OK";
			}else{
				echo "ERROR";
			}
			
			exit();
		}
		if ($_REQUEST["Type"]== "Update"){
			
			$macn = $_REQUEST["MaCN"];
			$manganh = $_REQUEST["MaNganh"];
			$ten = $_REQUEST["TenCN"];
			
			
			$sql = "UPDATE tbl_chuyennganh SET MaNganh='".$manganh."', TenCN='".$ten."' WHERE MaCN='".$macn."'";
			 
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
	if (isset($_REQUEST["MaCN"])){
		$macn = $_REQUEST["MaCN"];
		$sql = "DELETE FROM tbl_chuyennganh WHERE MaCN='".$macn."'";
		$result = $db->query($sql);
		if ($result && $db->affected_rows > 0){
			echo "OK";
		}else{
			echo "ERROR";
		}
		
		exit();
	}
	
	$maNganh="";
	// lấy mã lớp chọn từ DropDownList
	if (isset($_REQUEST["MaNganh"])){
		  $maNganh= $_REQUEST["MaNganh"];
	}
	 
	$limit = 10;
	$last = $limit;
	if (isset($_POST["Last"])){
		$last= $_POST["Last"]+$limit;
	}
	
	 
	$sql = "SELECT COUNT(*) FROM tbl_chuyennganh WHERE MaNganh='".$maNganh."'";
	$result = $db->query($sql);
	$total_row = 0;
	if ($result){
		$row = $result->fetch_array();
		$total_row = $row[0];
	}
	
	
	$sql = "SELECT * FROM tbl_chuyennganh WHERE MaNganh='".$maNganh."' LIMIT 0, $last";
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
					<th>Mã chuyên ngành</th>
					<th>Tên chuyên ngành</th>
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
					echo "<td><input name='chkmacn[]'  value='" . $row ["MaCN"] . "' class='chkmacn' type='checkbox'/> </td>";
					echo "<td class='stt'>" . ++ $i . "</td>";
					echo "<td>" . $row ["MaCN"] . "</td>";
					echo "<td>" . $row ["TenCN"] . " </td>";
					echo "<td>";
					echo "<button  class='btnSua3' name='MaNganh' value='" . $row ["MaCN"] . "'><span class='ui-icon ui-icon-pencil' ></span></button>";
					echo "<button name='btnXoa' class='btnXoa' value='" . $row ["MaCN"] . "' ><span class='ui-icon ui-icon-trash'  ></span> </button>";
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
  	echo "<div class='success'> Không có sv nào. </div>";
  }
?>