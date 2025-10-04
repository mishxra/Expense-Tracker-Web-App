let expenses = [];
let totalExpenses = 0;

const categorySelect = document.getElementById('Category-Selection');
const amountInput = document.getElementById('Amount-Input');
const dateInput = document.getElementById('Date-Input');
const addbtn = document.getElementById('Add-Expense-Button');
const ExpensetableBody = document.getElementById('Expenses-Table-Body');
const totalAmountCell = document.getElementById('Total-Amount');

// Initialize total display
totalAmountCell.textContent = totalExpenses;

addbtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;
    
    if (category === '') {
        alert('Please select a category.');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }
    if (date === '') {
        alert('Please select a date.');
        return;
    }
    
    expenses.push({ category, amount, date });
    totalExpenses += amount;
    totalAmountCell.textContent = totalExpenses;
    
    const newrow = ExpensetableBody.insertRow();
    const categoryCell = newrow.insertCell(0);
    const amountCell = newrow.insertCell(1);
    const dateCell = newrow.insertCell(2);
    const deleteCell = newrow.insertCell(3);
    
    // Create a new delete button for this row
    const deletebtn = document.createElement('button');
    deletebtn.textContent = 'Delete';
    deletebtn.classList.add('delete-button');
    
    // Get the current expense object
    const currentExpense = expenses[expenses.length - 1];
    categoryCell.textContent = currentExpense.category;
    amountCell.textContent = currentExpense.amount;
    dateCell.textContent = currentExpense.date;
    deleteCell.appendChild(deletebtn);
    
    // Add event listener to the new button
    deletebtn.addEventListener('click', function() {
        const index = expenses.indexOf(currentExpense);
        if (index > -1) {
            totalExpenses -= currentExpense.amount;
            totalAmountCell.textContent = totalExpenses;
            expenses.splice(index, 1);
            newrow.remove();
        }
    });
    
    // Clear the input fields after adding
    categorySelect.value = '';
    amountInput.value = '';
    dateInput.value = '';
});

// Remove the broken for loop entirely, as it's unnecessary for an initially empty expenses array
// and was causing errors (undefined variables, shadowing, etc.).
