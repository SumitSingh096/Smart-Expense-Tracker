document.addEventListener("DOMContentLoaded", () => {
  const navOpen = document.querySelector(".fa-bars");
  const navClose = document.querySelector(".fa-xmark");

  navOpen.addEventListener("click", () => {
    document.querySelector(".navbar").classList.add("navbar-in");
  });

  navClose.addEventListener("click", () => {
    document.querySelector(".navbar").classList.remove("navbar-in");
  });

  const totalIncome = document.querySelector("#amount");
  const totalExpense = document.querySelector("#amount2");
  const totalBalance = document.querySelector("#amount3");
  const amountName = document.querySelector("#Amount-name");
  const inputAmount = document.querySelector("#main-amount");
  const category = document.querySelector("#category");

  const date = document.querySelector("#date");
  const description = document.querySelector("#description");
  const btn = document.querySelector("#add-transaction");

  let income = 0;
  let expense = 0;
  let balance = 0;

  btn.addEventListener("click", () => {
    const selected = document.querySelector('input[name="category"]:checked');
    const amountValue = Number(inputAmount.value);
    if (!selected) {
      alert("Please select Inconme or Expense");
      return;
    }

    if (!amountValue) {
      alert("Please enter valid amount");
      return;
    }

    const transaction = {
      title: amountName.value,
      amount: amountValue,
      type: selected.value,
      category: category.value,
      date: date.value,
      description: description.value,
    };

    //get old data
    let data = JSON.parse(localStorage.getItem("transaction")) || [];

    //add new
    data.push(transaction);

    //save
    localStorage.setItem("transaction", JSON.stringify(data));

    //update UI
    updateLocal();
    clearInputs();

    alert("Transaction Added");
  });

  function clearInputs(){
   amountName.value = "";
  inputAmount.value = "";
  category.value = "Other"; // reset dropdown
  date.value = "";
  description.value = "";

  // clear radio buttons
  const radios = document.querySelectorAll('input[name="category"]');
  radios.forEach(radio => radio.checked = false);
  }

  function updateLocal() {
    const data = JSON.parse(localStorage.getItem("transaction")) || [];

    let income = 0;
    let total = 0;

    data.forEach((item) => {
      if (item.type === "Income") {
        income += item.amount;
      } else {
        expense += item.amount;
      }
    });

    const balance = income - expense;

    totalIncome.innerText = `+ $${income.toLocaleString()}`
    totalExpense.innerText = `- $${expense.toLocaleString()}`
    
     if (balance >= 0) {
        totalBalance.style.color = "green"
        totalBalance.innerText = `+ $${balance.toLocaleString()}`

    } else {
         totalBalance.style.color = "red"
         totalBalance.innerText = `- $${Math.abs(balance).toLocaleString()}`
    }
  }
  updateLocal()
});
