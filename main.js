let balance = 0;
const balanceEl = document.getElementById('balance')
const historyEl = document.getElementById('history')
const amountInput = document.getElementById('amount')

async function loadBalance() {
  const res = await fetch('/balance');
  const data = await res.json();
  balance = data.balance;
  balanceEl.textContent = balance;
  historyEl.innerHTML = data.history.join("");
}
loadBalance();

async function saveBalance() {
  const history = Array.from(historyEl.children).map(el => el.outerHTML);
  await fetch('/balance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ balance, history })
  });
}

function changeBalance(type) {
  let amount = parseInt(amountInput.value)
  if (isNaN(amount) || amount <= 0) {
    alert("Iltimos tog‘ri summa kiriting")
    return
  }
  if (type === 'plus') {
    balance += amount;
    addHistory(`➕ <span class="in">+${amount}</span>`)
  } else {
    balance -= amount;
    addHistory(`➖ <span class="out">-${amount}</span>`)
  }
  balanceEl.textContent = balance;
  saveBalance();
  amountInput.value = "";
}

function addHistory(text) {
  const div = document.createElement('div');
  div.innerHTML = text;
  historyEl.prepend(div);
}

function clean() {
  balance = 0;
  balanceEl.textContent = balance;
  historyEl.innerHTML = "";
  saveBalance();
}
