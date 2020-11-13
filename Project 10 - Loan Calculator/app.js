const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', function(e) {

    document.querySelector('.loan__calculator-results').style.display = 'none';
    document.querySelector('#loading').style.display = 'block';
    setTimeout(calculateResults, 500);
    e.preventDefault();
});



function calculateResults() {

    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value); 
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2); 
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        document.querySelector('.loan__calculator-results').style.display = 'block';
        document.querySelector('#loading').style.display = 'none';
    } else {
        showError('Please check your numbers!');
    }
}



function showError(error) {
    document.querySelector('.loan__calculator-results').style.display = 'none';
    document.querySelector('#loading').style.display = 'none';
    const errorDiv = document.createElement('div');

    const loanCalculator = document.querySelector('.loan__calculator');
    const heading = document.querySelector('.loan__calculator-heading');

    errorDiv.className = 'alert';
    errorDiv.appendChild(document.createTextNode(error));
    loanCalculator.insertBefore(errorDiv, heading);
    setTimeout(clearError, 1500);
}

function clearError() {
    document.querySelector('.alert').remove();
};