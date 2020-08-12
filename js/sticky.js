// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the header
var header = document.getElementById("pageNav");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}


// ScrollSpy that highlights the navigation item based on which section is in view
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    
    if (entry.intersectionRatio > 0) {
      document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.add('active');
    } else {
      document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.remove('active');
    }
  });
});

// Track all sections that have an `id` applied
document.querySelectorAll('section[id]').forEach((section) => {
  observer.observe(section);
});