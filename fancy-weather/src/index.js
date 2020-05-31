import model from './model/Model';
import View from './view/View';

// document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';

// const overlay = document.querySelector('.overlay');

// window.addEventListener('load', () => {
// 	overlay.style.display = 'none';
// });

new View();
model.init();
