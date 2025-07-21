// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const netSalaryInput = document.getElementById("netSalary");
  const expenseInputs = document.querySelectorAll(".expense");
  const balanceOutput = document.getElementById("balanceOutput");
  const calculateBtn = document.getElementById("calculateBalance");

  // Load saved data on page load
  loadData();

  calculateBtn.addEventListener("click", () => {
    const netSalary = parseFloat(netSalaryInput.value) || 0;
    let totalExpenses = 0;

    expenseInputs.forEach(input => {
      totalExpenses += parseFloat(input.value) || 0;
    });

    const remainingBalance = netSalary - totalExpenses;
    balanceOutput.textContent = remainingBalance.toFixed(2);

    saveData(netSalary, totalExpenses, remainingBalance);
  });

  function saveData(net, expenses, balance) {
    const data = {
      netSalary: net,
      totalExpenses: expenses,
      remainingBalance: balance,
      timestamp: new Date().toISOString(),
      individualExpenses: {}
    };

    // Save each input's value
    expenseInputs.forEach(input => {
      data.individualExpenses[input.id] = parseFloat(input.value) || 0;
    });

    localStorage.setItem("smartcentsBudget", JSON.stringify(data));
  }

  function loadData() {
    const savedData = JSON.parse(localStorage.getItem("smartcentsBudget"));
    if (!savedData) return;

    netSalaryInput.value = savedData.netSalary || 0;

    expenseInputs.forEach(input => {
      if (savedData.individualExpenses && savedData.individualExpenses[input.id] !== undefined) {
        input.value = savedData.individualExpenses[input.id];
      }
    });

    balanceOutput.textContent = (savedData.remainingBalance || 0).toFixed(2);
  }
});
