const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$(".tab-item");
const panes = $$(".tab-pane");

const tabActive = $(".tab-item.active");
const line = $(".tabs .line");

line.style.left = tabActive.offsetLeft + "px";
line.style.width = tabActive.offsetWidth + "px";


  tabs.forEach((tab, index) => {
    const pane = panes[index];
  
    tab.onclick = function () {
      var dk=document.getElementById("id_SV").innerHTML;
      if (dk!==""){
            $(".tab-item.active").classList.remove("active");
            $(".tab-pane.active").classList.remove("active");
        
            line.style.left = this.offsetLeft + "px";
            line.style.width = this.offsetWidth + "px";
        
            this.classList.add("active");
            pane.classList.add("active");
      }
    };
  });




// sự kiện hiện form đăng nhập

function openForm() {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("overlay").style.display = "block";
    document.getElementById("myForm_tb_error").style.display = "none";
  }
  
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("myForm_tb").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  }
function closeForm_tb() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("myForm_tb").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    document.getElementById("id_SV").style.display = "block";
    document.getElementById("lbl_SV").style.display = "block";
    document.getElementById("btn_dx").style.display="flex";

}
function openDN(){
   document.getElementById("btn_dn").style.display="none";
   document.getElementById("myForm").style.display = "none";
   document.getElementById("myForm_tb").style.display = "block";

}
function returnDN(){
  document.getElementById("id_SV").style.display = "none";
  document.getElementById("lbl_SV").style.display = "none";
  document.getElementById("btn_dx").style.display="none";
  document.getElementById("btn_dn").style.display="flex";
  document.getElementById("id_SV").innerHTML="";
  // trờ về trang chủ
  $(".tab-item.active").classList.remove("active");
  $(".tab-pane.active").classList.remove("active");

  line.style.left = tabs[0].offsetLeft + "px";
  line.style.width = tabs[0].offsetWidth + "px";

  tabs[0].classList.add("active");
  panes[0].classList.add("active");
}

// Restricts input for the given textbox to the given inputFilter.
function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}


// Install input filters.
// setInputFilter(document.getElementById("M1_CC"), function(value) {
//   return /^-?\d*[.,]?\d*$/.test(value); });
//   setInputFilter(document.getElementById("M1_QT"), function(value) {
//     return /^-?\d*[.,]?\d*$/.test(value); });
//     setInputFilter(document.getElementById("M1_HK"), function(value) {
//       return /^-?\d*[.,]?\d*$/.test(value); });
// setInputFilter(document.getElementById("M2_CC"), function(value) {
//   return /^-?\d*[.,]?\d*$/.test(value); });
//   setInputFilter(document.getElementById("M2_QT"), function(value) {
//     return /^-?\d*[.,]?\d*$/.test(value); });
//     setInputFilter(document.getElementById("M2_HK"), function(value) {
//        return /^-?\d*[.,]?\d*$/.test(value); });

//thêm bảng cột điểm học kỳ
function themMH(){
  var tableRef = document.getElementById('myTable');
  // Insert a row in the table at row index 0
  
  var row=tableRef.rows.length;
  var a1=document.getElementById("id_MH").value;
  var b1=document.getElementsByClassName("Id_MH_Show");
  var kt=true;
  for (var i=0;i<b1.length;i++){
    if (a1===b1[i].innerHTML) {
        alert("Môn học đã được thêm, Chọn Môn Khác");
        kt=false;
      }
  }
  if (a1!=="" && kt){
      var MMH=a1;
      if (row <= 49){
        var newRow   = tableRef.insertRow(tableRef.rows.length);
        row=tableRef.rows.length-1;
        // Insert a cell in the row at index 0
        var newCell  = newRow.insertCell(0);
        var newCell1 = newRow.insertCell(1);
        var newCell2 = newRow.insertCell(2);
        var newCell3 = newRow.insertCell(3);
        var newCell4 = newRow.insertCell(4);

        // Tạo biến lấy mã môn học sẽ thêm
        
        // Append a text node to the cell
        var newText  = document.createElement("p")
        newText.innerHTML=MMH;
        newText.className="Id_MH_Show";
        //Thêm ô input
        var newIp1 = document.createElement("input");
        var newIp2 = document.createElement("input");
        var newIp3 = document.createElement("input");
        var newBtn = document.createElement("button");
        newIp1.id=MMH+'_CC';
        newIp2.id=MMH+'_QT';
        newIp3.id=MMH+'_HK';
        newBtn.id=row;
        newIp1.className='diem';
        newIp2.className='diem';
        newIp3.className='diem';
        newBtn.className='btn';
        newBtn.innerHTML='Xóa';
        newBtn.onclick=function(){
          var id_xoa=newBtn.id;
          console.log("id_xoa: "+id_xoa)
          tableRef.deleteRow(newBtn.id);
          
          for (var i = 1, row1; row1 = tableRef.rows[i]; i++) {
            var x=document.getElementById('myTable').rows[i].getElementsByClassName('btn');
            console.log(x.length);
            if (x[0].id-id_xoa>0) {
              console.log("cu: "+x[0].id); 
              x[0].id-=1;
              console.log("moi:"+x[0].id); 
            }
          }
        };
        setInputFilter(newIp1, function(value) {
          return /^-?\d*[.,]?\d*$/.test(value); });
          setInputFilter(newIp2, function(value) {
            return /^-?\d*[.,]?\d*$/.test(value); });
            setInputFilter(newIp3, function(value) {
              return /^-?\d*[.,]?\d*$/.test(value); });
        newCell.appendChild(newText);
        newCell1.appendChild(newIp1);
        newCell2.appendChild(newIp2);
        newCell3.appendChild(newIp3);
        newCell4.appendChild(newBtn);
      }
   }
}