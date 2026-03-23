document.addEventListener("DOMContentLoaded", ()=>{
    const navOpen = document.querySelector(".fa-bars");
  const navClose = document.querySelector(".fa-xmark");

  navOpen.addEventListener("click", () => {
    document.querySelector(".navbar").classList.add("navbar-in");
  });

  navClose.addEventListener("click", () => {
    document.querySelector(".navbar").classList.remove("navbar-in");
  });
})