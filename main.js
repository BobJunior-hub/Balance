let balance = 0;
const balanceEl = document.getElementById('balance');
const historyEl = document.getElementById('history');
const amountInput = document.getElementById('amount');

function changeBalance(type) {
  let amount = parseInt(amountInput.value)
  if (isNaN(amount) || amount <= 0) {
    alert("Iltimos togri suma kiriting")
  return;
  }

  if (type === 'plus') {
    balance += amount;addHistory(`➕ <span class="in">+${amount}</span>`)
  } else {
    balance -= amount;addHistory(`➖ <span class="out">-${amount}</span>`)
  }

  balanceEl.textContent = balance;
  amountInput.value = "";
}

function addHistory(text) {
  const div = document.createElement('div')
  div.innerHTML = text;
  historyEl.prepend(div)}
