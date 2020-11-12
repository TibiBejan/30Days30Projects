const toggle_checkbox = document.getElementById('checkbox');
const body_el = document.querySelector('body');
let isChecked = false;

toggle_checkbox.addEventListener('change', toggleDarkMode);

function toggleDarkMode(){
    if(isChecked){
        body_el.classList.remove('dark-theme');
        isChecked = false;
    } else {
        body_el.classList.add('dark-theme');
        isChecked = true;
    }
}