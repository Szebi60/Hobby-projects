let calculation = localStorage.getItem('calculation') || '';

displayCalculation();      

function updateCalculation(button) {
  calculation += button;
  
  displayCalculation();
  
  saveCalculation();
}
  
function saveCalculation() {
  localStorage.setItem('calculation', calculation);
}
  
function displayCalculation() {
  document.querySelector('.js-calculation')
  .innerHTML = calculation;
}
