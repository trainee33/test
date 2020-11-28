let userIcon = document.querySelector('.user-header__icon');
let userSelectMenu = document.querySelector('.user-header__menu');
let userSelectItem = document.querySelectorAll('.user-select__item');


userIcon.addEventListener('click', function(e) {
   userSelectMenu.classList.toggle('user-header__menu_active');
});
userSelectItem.forEach(el => {
   el.addEventListener('click', function(e) {
      
      if (e.target.classList.contains('user-select__link')) {
         let text = e.target.textContent;
         let src = e.target.previousElementSibling.querySelector('img').getAttribute('src');
         document.querySelector('.actions-header__active span').textContent = text;
         
         if(document.querySelector('body').classList.contains('webp')){
            document.querySelector('.actions-header__active source').setAttribute('srcset', src);
         } else {
            document.querySelector('.actions-header__active img').setAttribute('src', src);
         }  
      }
   });
});
