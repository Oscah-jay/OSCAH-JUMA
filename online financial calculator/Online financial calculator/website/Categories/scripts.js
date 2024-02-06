function submitForm() {
    // Get form elements
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    // Validate form inputs
    if (!validateInput(nameInput) || !validateInput(emailInput) || !validateInput(messageInput)) {
        // Validation failed
        alert("Please fill out all fields.");
        return;
    }

    // If validation passed, submit the form (you need to replace '#' with your actual form submission endpoint)
    document.getElementById("contactForm").action = "submit_contact_form.php"; // Replace with your actual endpoint
    document.getElementById("contactForm").submit();
}

function validateInput(input) {
    // Check if the input value is not empty
    return input.value.trim() !== "";
}


function calculateMortgage() {
    // Get input values
    const loanAmount = document.getElementById('loanAmount').value;
    const interestRate = document.getElementById('interestRate').value / 100 / 12; // Monthly interest rate
    const loanTerm = document.getElementById('loanTerm').value * 12; // Monthly loan term

    // Mortgage calculation logic (example)
    const monthlyPayment = (loanAmount * interestRate) / (1 - Math.pow(1 + interestRate, -loanTerm));
    const totalInterest = (monthlyPayment * loanTerm) - loanAmount;

    // Display results
    document.getElementById('monthlyPayment').innerText = `Monthly Payment: $${monthlyPayment.toFixed(2)}`;
    document.getElementById('totalInterest').innerText = `Total Interest Paid: $${totalInterest.toFixed(2)}`;
}

function calculate() {
    // Get input values
    var amount = parseFloat(document.getElementById('amount').value);
    var exchangeRate = parseFloat(document.getElementById('exchangeRate').value);

    // Check if input is valid
    if (isNaN(amount) || isNaN(exchangeRate)) {
        alert('Please enter valid numbers.');
        return;
    }

    // Calculate conversion
    var result = amount * exchangeRate;

    // Display result
    document.getElementById('result').innerHTML = 'Result: ' + result.toFixed(2);
}


document.addEventListener('DOMContentLoaded', function () {
    // Get form and set up event listener for the "Calculate" button
    var debtForm = document.getElementById('debtPaydownForm');
    var calculateButton = document.getElementById('calculateButton');
    calculateButton.addEventListener('click', calculateDebtPaydown);

    function calculateDebtPaydown() {
        // Get the selected method (snowball or avalanche)
        var selectedMethod = document.querySelector('input[name="paydownMethod"]:checked').value;

        // Get debt details
        var debts = [];
        var debtElements = document.querySelectorAll('.debt-entry');
        debtElements.forEach(function (debtElement) {
            var balance = parseFloat(debtElement.querySelector('.balance').value);
            var interestRate = parseFloat(debtElement.querySelector('.interest-rate').value);
            var minPayment = parseFloat(debtElement.querySelector('.min-payment').value);

            debts.push({ balance: balance, interestRate: interestRate, minPayment: minPayment });
        });

        // Perform calculations based on the selected method
        if (selectedMethod === 'snowball') {
            // Implement snowball method logic here
            // Sort debts by balance in ascending order
            debts.sort(function (a, b) {
                return a.balance - b.balance;
            });
        } else if (selectedMethod === 'avalanche') {
            // Implement avalanche method logic here
            // Sort debts by interest rate in descending order
            debts.sort(function (a, b) {
                return b.interestRate - a.interestRate;
            });
        }

        // Display the debt paydown plan or visualization
        displayDebtPaydownPlan(debts);
    }

    function displayDebtPaydownPlan(debts) {
        // Implement logic to display the debt paydown plan or visualization
        // This could involve updating HTML elements to show the plan or a graph
        var resultElement = document.getElementById('result');
        resultElement.innerHTML = 'Your customized debt paydown plan will be displayed here.';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('investmentRetirementForm');
    var calculateButton = document.getElementById('calculateButton');
    calculateButton.addEventListener('click', calculateInvestment);

    function calculateInvestment() {
        // Get input values
        var initialInvestment = parseFloat(document.getElementById('initialInvestment').value);
        var annualContribution = parseFloat(document.getElementById('annualContribution').value);
        var annualReturn = parseFloat(document.getElementById('annualReturn').value);
        var years = parseInt(document.getElementById('years').value);

        // Check if input is valid
        if (isNaN(initialInvestment) || isNaN(annualContribution) || isNaN(annualReturn) || isNaN(years)) {
            alert('Please enter valid numbers.');
            return;
        }

        // Calculate future value using compound interest formula
        var futureValue = initialInvestment * Math.pow(1 + (annualReturn / 100), years) + (annualContribution * ((Math.pow(1 + (annualReturn / 100), years) - 1) / (annualReturn / 100)));

        // Display the result
        document.getElementById('result').textContent = futureValue.toFixed(2);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Get elements
    var slider = document.querySelector('.slider');
    var choiceMarker = document.getElementById('choiceMarker');
    var choiceText = document.getElementById('choiceText');

    // Add event listener for dragging the choice marker
    choiceMarker.addEventListener('mousedown', startDragging);

    // Function to handle the dragging of the choice marker
    function startDragging(e) {
        e.preventDefault();

        // Get initial mouse position
        var startX = e.clientX;

        // Get initial marker position
        var startMarkerPosition = choiceMarker.offsetLeft;

        // Add event listeners for moving and stopping the drag
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDragging);

        // Function to handle the dragging movement
        function drag(e) {
            // Calculate the new position of the marker
            var newMarkerPosition = startMarkerPosition + e.clientX - startX;

            // Ensure the marker stays within the slider boundaries
            newMarkerPosition = Math.max(0, Math.min(newMarkerPosition, slider.offsetWidth - choiceMarker.offsetWidth));

            // Update the marker position
            choiceMarker.style.left = newMarkerPosition + 'px';

            // Calculate the percentage position within the slider
            var percentage = (newMarkerPosition / (slider.offsetWidth - choiceMarker.offsetWidth)) * 100;

            // Update the choice text
            choiceText.textContent = 'Choice: ' + percentage.toFixed(0) + '%';
        }

        // Function to handle the end of dragging
        function stopDragging() {
            // Remove the event listeners for moving and stopping the drag
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', stopDragging);
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('taxCalculatorForm');
    var calculateButton = document.getElementById('calculateButton');
    calculateButton.addEventListener('click', calculateTax);

    function calculateTax() {
        // Get input values
        var taxType = document.getElementById('taxType').value;
        var income = parseFloat(document.getElementById('income').value);
        var deductions = parseFloat(document.getElementById('deductions').value);
        var credits = parseFloat(document.getElementById('credits').value);

        // Check if input is valid
        if (isNaN(income) || isNaN(deductions) || isNaN(credits)) {
            alert('Please enter valid numbers.');
            return;
        }

        // Perform tax calculation based on tax type
        var estimatedTax = 0;

        if (taxType === 'individual') {
            // Implement individual tax calculation logic
            estimatedTax = income * 0.2 - deductions + credits;
        } else if (taxType === 'business') {
            // Implement business tax calculation logic
            estimatedTax = income * 0.15 - deductions + credits;
        }

        // Display the result
        document.getElementById('result').textContent = '$' + estimatedTax.toFixed(2);
    }
});

  function validateLogin() {
    console.log('Login button clicked!')
    // Replace this with server-side authentication logic
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Example: Check if the username and password are not empty
    if (username.trim() === '' || password.trim() === '') {
      alert('Please enter both username and password.');
    } else {
      // For this example, simulate a successful login
      if (username === 'ossy' && password === 'ossy') {
        alert('Login successful! Redirecting to index...');
        // Replace the next line with the actual redirect logic
        window.location.href = 'index.html';
      } else {
        alert('Invalid username or password.');
      }
    }
  }


  function validateSignUp() {
    console.log('Sign Up button clicked!');
    // Replace this with server-side registration logic
    var newUsername = document.getElementById('new-username').value;
    var newPassword = document.getElementById('new-password').value;
    var confirmPassword = document.getElementById('confirm-password').value;

    // Example: Check if the username and passwords are not empty and match
    if (newUsername.trim() === '' || newPassword.trim() === '' || confirmPassword.trim() === '') {
      alert('Please fill in all fields.');
    } else if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
    } else {
      //  simulate a successful registration
      alert('Registration successful! Redirecting to login...');
      // Replace the next line with the actual redirect logic
      window.location.href = 'login.html';
    }
  }
