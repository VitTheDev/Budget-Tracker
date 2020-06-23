const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const getTransactionsFromLocalStorage = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null
    ? getTransactionsFromLocalStorage
    : [];

const addTransaction = (e) => {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    text.value = '';
    amount.value = '';
  }
};

const generateId = () => {
  return Math.floor(Math.random() * 100000000);
};

const addTransactionDOM = (transaction) => {
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
  ${transaction.text} <span>${Math.abs(transaction.amount)}</span>
  <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;

  list.appendChild(item);
};

const updateValues = () => {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `£${total}`;
  moneyPlus.innerHTML = `£${income}`;
  moneyMinus.innerHTML = `£${expense}`;
  updateLocalStorage();
};

const removeTransaction = (id) => {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();
  init();
};

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

const init = () => {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
};

init();

form.addEventListener('submit', addTransaction);
