// Define your Alpha Vantage API key
const apiKey = 'YOUR_ALPHA_VANTAGE_API_KEY';

function calculate() {
    const calculationType = document.getElementById("calculationType").value;
    const principal = parseFloat(document.getElementById("principal").value);
    const selectedCurrency = document.getElementById("selectedCurrency").value;
    const amountInCurrency = parseFloat(document.getElementById("amountInCurrency").value) || 0;
    const interestRate = parseFloat(document.getElementById("interestRate").value) || 0;
    const stockSymbol = document.getElementById("stockSymbol").value.toUpperCase();
    const time = parseFloat(document.getElementById("time").value);

    // Perform the calculation based on the selected calculation type
    let result;

    switch (calculationType) {
        case 'compoundInterest':
            result = principal * Math.pow(1 + interestRate / 100, time) - principal;
            break;
        case 'currencyExchange':
            // Use the exchange rate logic from the previous example
            // (Assuming currency exchange does not involve interest)
            fetchCurrencyExchange(selectedCurrency, amountInCurrency);
            return;
        case 'stockMarket':
            // Fetch stock market data
            fetchStockMarketData(stockSymbol)
                .then(data => {
                    // Use the stock market data for calculations
                    result = calculateStockMarketResult(principal, data);
                    // Display the result
                    document.getElementById("result").innerHTML = `Stock Market (${stockSymbol}): ${result.toFixed(2)}`;
                })
                .catch(error => {
                    console.error('Error fetching stock market data:', error);
                    document.getElementById("result").innerHTML = 'Error fetching stock market data';
                });
            return;
        // Add cases for other calculations as needed

        default:
            result = 0;
    }

    // Display the result
    document.getElementById("result").innerHTML = `${calculationType}: ${result.toFixed(2)} ${selectedCurrency}`;
}

function fetchCurrencyExchange(selectedCurrency, amountInCurrency) {
    // Implement the logic to fetch currency rates as shown in the previous example
    // Adjust the calculation based on the selected currency and amount
    // Update the result element accordingly
    // ...

    // Example placeholder result (replace this with your actual calculation)
    const exchangeResult = amountInCurrency * 1.2; // Assuming an exchange rate of 1.2
    document.getElementById("result").innerHTML = `Currency Exchange: ${exchangeResult.toFixed(2)} ${selectedCurrency}`;
}

function fetchStockMarketData(stockSymbol) {
    const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${apiKey}`;

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Extract relevant stock market data
            return {
                symbol: data['Global Quote']['01. symbol'],
                price: parseFloat(data['Global Quote']['05. price'])
            };
        });
}

function calculateStockMarketResult(principal, stockData) {
    // Example: Calculate the investment value in the stock market after a given time
    // (Assuming the investment grows based on the stock price)
    return principal * (stockData.price / 100);
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function appendValue(value) {
    document.getElementById('display').value += value;
}

function calculate() {
    try {
        document.getElementById('display').value = eval(document.getElementById('display').value);
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}