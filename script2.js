document.addEventListener("DOMContentLoaded", () => {
  const navOpen = document.querySelector(".fa-bars");
  const navClose = document.querySelector(".fa-xmark");

  navOpen.addEventListener("click", () => {
    document.querySelector(".navbar").classList.add("navbar-in");
  });

  navClose.addEventListener("click", () => {
    document.querySelector(".navbar").classList.remove("navbar-in");
  });

  const applyFilterBtn = document.querySelector("#apply-filter");

  //edit model
  const newDate = document.querySelector("#edit-date");
  const newCategory = document.querySelector("#edit-category");
  const newAmount = document.querySelector("#edit-amount");
  const editDescription = document.querySelector("#edit-description");

  const tBody = document.querySelector("#Transaction-body");

  let currentIndex = null;

  function loadData(data) {
    tBody.innerHTML = "";

    data.forEach((item, index) => {
      let newTr = document.createElement("tr");

      newTr.innerHTML = `
       <td>${item.date}</td>
       <td>${item.category}</td>
       <td>${item.amount}</td>
       <td>${item.type}</td>
       <td><button class="remove" data-index="${index}">Remove</button><button class="edit" data-index="${index}">Edit</button></td>
       `;
      tBody.appendChild(newTr);
    });
  }

  function getAllData (){
    return JSON.parse(localStorage.getItem("transaction")) || [];
  }

  loadData(getAllData());

  document.addEventListener("click", (e) => {
    const data = JSON.parse(localStorage.getItem("transaction")) || [];

    if (e.target.classList.contains("edit")) {
      currentIndex = Number(e.target.dataset.index);

      document
        .querySelector(".edit-transaction")
        .classList.remove("display-none");
      const item = data[currentIndex];

      newDate.value = item.date;
      newCategory.value = item.category;
      newAmount.value = item.amount;
      editDescription.value = item.description || "";
    }

    if (e.target.classList.contains("remove")) {
      const index = Number(e.target.dataset.index);

      data.splice(index, 1);

      localStorage.setItem("transaction", JSON.stringify(data));
      loadData(data);
    }
  });

  document.querySelector(".cross-mark").addEventListener("click", () => {
    document.querySelector(".edit-transaction").classList.add("display-none");
  });

  document.querySelector("#cancel").addEventListener("click", () => {
    document.querySelector(".edit-transaction").classList.add("display-none");
  });

  document.querySelector("#save-change").addEventListener("click", () => {
    const data = JSON.parse(localStorage.getItem("transaction")) || [];
    if (currentIndex === null || !data[currentIndex]) return;
    const selectedType = document.querySelector('input[name="type"]:checked');

    if (!selectedType) {
      alert("Select Income or Expense");
      return;
    }

    data[currentIndex] = {
      ...data[currentIndex],
      date: newDate.value,
      category: newCategory.value,
      amount: Number(newAmount.value),
      type: selectedType.value,
    };

    document.querySelector(".edit-transaction").classList.add("display-none");

    localStorage.setItem("transaction", JSON.stringify(data));
    loadData(data);
  });

  applyFilterBtn.addEventListener("click", () => {
    const filterCategory = document.querySelector("#filter-by-category").value;
    const filterDate = document.querySelector("#filter-by-date").value;
    const filterType = document.querySelector("#filter-by-type").value;
    const filterAmount = document.querySelector("#filter-by-amount").value;

    const data = getAllData();

    const filterData = data.filter(item => {
      return (
        (filterCategory === "" || item.category === filterCategory) &&
        (filterDate === "" || item.date === filterDate) &&
        (filterType === "" || item.type === filterType) &&
        (filterAmount === "" || item.amount === Number(filterAmount))
      );
    });
    loadData(filterData)
  });
});
