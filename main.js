let balance = parseInt(localStorage.getItem('balance')) || 0;
const balanceEl = document.getElementById('balance');
const historyEl = document.getElementById('history');
const amountInput = document.getElementById('amount');

balanceEl.textContent = balance;

// Tarixni yuklash
if (localStorage.getItem('history')) {
  historyEl.innerHTML = localStorage.getItem('history');
}

function changeBalance(type) {
  let amount = parseInt(amountInput.value);
  if (isNaN(amount) || amount <= 0) {
    alert("Iltimos to‘g‘ri summa kiriting");
    return;
  }

  if (type === 'plus') {
    balance += amount;
    addHistory(`➕ <span class="in">+${amount}</span>`);
  } else {
    balance -= amount;
    addHistory(`➖ <span class="out">-${amount}</span>`);
  }

  balanceEl.textContent = balance;
  localStorage.setItem('balance', balance);
  amountInput.value = "";
}

function addHistory(text) {
  const div = document.createElement('div');
  div.innerHTML = text;
  historyEl.prepend(div);
  localStorage.setItem('history', historyEl.innerHTML);
}

function clean() {
  balance = 0;
  balanceEl.textContent = balance;
  historyEl.innerHTML = "";
  localStorage.setItem('balance', balance);
  localStorage.removeItem('history');
}

