document.addEventListener("DOMContentLoaded", function () {
  const toggleThemeBtn = document.getElementById("toggleTheme");
  const body = document.body;
  const calculateBalanceBtn = document.getElementById("calculateBalance");
  const balanceOutput = document.getElementById("balanceOutput");
  const netSalaryInput = document.getElementById("netSalary");
  const expenseInputs = document.getElementsByClassName("expense");
  const creditFields = document.getElementById("creditFields");

  toggleThemeBtn.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
  });

  for (let i = 0; i < 10; i++) {
    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = `Credit Repayment ${i + 1}`;
    input.classList.add("expense");
    creditFields.appendChild(input);
  }

  calculateBalanceBtn.addEventListener("click", () => {
    const netSalary = parseFloat(netSalaryInput.value) || 0;
    let totalExpenses = 0;

    Array.from(expenseInputs).forEach(input => {
      totalExpenses += parseFloat(input.value) || 0;
    });

    const remaining = netSalary - totalExpenses;
    balanceOutput.textContent = remaining.toFixed(2);
  });
});