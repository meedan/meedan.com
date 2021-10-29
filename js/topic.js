const select = document.querySelector(".select-topic");
const options = document.querySelectorAll(".select-topic option");
 
// 1
select.addEventListener("change", function() {
  const url = this.options[this.selectedIndex].dataset.url;
  if(url) {
    location.href = url;
  }
});
 
// 2
for(const option of options) {
  const url = option.dataset.url;
  console.log(location.href);
  if(location.href.includes(url)) {
    
    option.setAttribute("selected", "");
    break;
  }
}