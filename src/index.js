import template from './scripts/tpl/main.tpl.html';
import img from './images/ArnaudLook.png';

document.querySelector("body").innerHTML = template({
	test: 'mdr trop bien',
	img: img
});