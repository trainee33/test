let burger = document.querySelector('.icon-menu');
let headerMenu = document.querySelector('.menu__body');

burger.addEventListener('click', function() {
   burger.classList.toggle('_active');
   headerMenu.classList.toggle('_active');
});