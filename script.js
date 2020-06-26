// DOM elements
const select1 = document.querySelector('#currency-1');
const select2 = document.querySelector('#currency-2');
const amount1 = document.querySelector('#amount-one');
const amount2 = document.querySelector('#amount-two');
const swapButton = document.querySelector('#swap');
const rateConversion = document.querySelector('#rate-paragraph');


// Initialize default values
let currency1, currency2, amount;


// Functions
function calculate(currency1, currency2, amount) {
  amount1.value = amount;
  fetch(`https://api.exchangeratesapi.io/latest?base=${currency1}`)
    .then(response => response.json())
    .then(data => data.rates[currency2])
    .then(rate => {
      rateConversion.textContent = `1 ${currency1} = ${rate} ${currency2}`;
      let rateConstant = rate;
      return rateConstant;
    })
    .then(rateConstant => {
      amount2.value = (rateConstant * amount).toFixed(3);
    });
}


// Event Listeners
select1.addEventListener('change', e => {
  currency1 = e.target.value;
  currency2 = select2.value;
  amount = amount1.value;
  calculate(currency1, currency2, amount);
});

select2.addEventListener('change', e => {
  currency1 = select1.value;
  currency2 = e.target.value;
  amount = amount1.value;
  calculate(currency1, currency2, amount);
});

amount1.addEventListener('change', e=> {
  currency1 = select1.value;
  currency2 = select2.value;
  amount = e.target.value;
  calculate(currency1, currency2, amount)
})

swapButton.addEventListener('click', () => {
  [currency1, currency2] = [select1.value, select2.value];

  [select1.value, select2.value] = [`${currency2}`, `${currency1}`];

  calculate(select1.value, select2.value, 1);
});

document.onload = calculate('USD', 'EUR', 1);