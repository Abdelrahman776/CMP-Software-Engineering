function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'deletebtn');
        deleteButton.onclick = () => deleteEmployee(item.id);
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
document.getElementById("submitbtn").addEventListener('click', createEmployee)

// TODO
// add event listener to delete button
// document.getElementById("deletebtn").addEventListener('click', deleteEmployee)
// document.getElementsByClassName("btn-sm").addEventListener('click', deleteEmployee)

// TODO
function createEmployee() {
  const name = document.getElementById('name').value;
  const id = document.getElementById('id').value;

  // Prepare the data to be sent to the backend
  const employeeData = {
    name: name,
    id: id
  };

  // Send data to the backend
  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employeeData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(() => {
    // Clear input fields
    document.getElementById('name').value = '';
    document.getElementById('id').value = '';
    // Refresh the employee list
    fetchEmployees();
  })
  .catch(error => console.error('Error:', error));
}

// Modify the deleteEmployee function to accept an id parameter
function deleteEmployee(id) {
  // If no id is provided, get it from the input field
  if (!id) {
    id = document.getElementById('id').value;
  }

  if (!id) {
    alert('Please provide an employee ID');
    return;
  }

  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Clear the input field
    document.getElementById('id').value = '';
    // Refresh the employee list
    fetchEmployees();
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error deleting employee');
  });
}

// Prevent form submission default behavior
document.getElementById('employeeForm').addEventListener('submit', function(e) {
  e.preventDefault();
  createEmployee();
});

fetchEmployees()
