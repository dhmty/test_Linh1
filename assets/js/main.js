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
    $(".tab-item.active").classList.remove("active");
    $(".tab-pane.active").classList.remove("active");

    line.style.left = this.offsetLeft + "px";
    line.style.width = this.offsetWidth + "px";

    this.classList.add("active");
    pane.classList.add("active");
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
}
