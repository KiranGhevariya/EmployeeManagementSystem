document.addEventListener('DOMContentLoaded', () => {
    let employees = [
        { id: 1, name: "John Doe", role: "Developer", email: "john@example.com", contact: "123-456-7890" },
        { id: 2, name: "Jane Smith", role: "Manager", email: "jane@example.com", contact: "987-654-3210" }
    ];

    // Load employees from the array and populate the table
    function loadEmployees() {
        const tableBody = document.querySelector('#employeeTable tbody');
        tableBody.innerHTML = ''; // Clear the existing table rows
        employees.forEach(employee => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.role}</td>
                <td>${employee.email}</td>
                <td>${employee.contact}</td>
                <td>
                    <button class="btn btn-success btn-sm" onclick="editEmployee(${employee.id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${employee.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Email and Contact validation functions
    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }

    function validateContact(contact) {
        const contactPattern = /^\d{3}-\d{3}-\d{4}$/;  // Format: xxx-xxx-xxxx
        return contactPattern.test(contact);
    }

    // Add a new employee to the list
    document.getElementById('employeeForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('employeeName').value;
        const role = document.getElementById('employeeRole').value;
        const email = document.getElementById('employeeEmail').value;
        const contact = document.getElementById('employeeContact').value;

        // Validate email and contact
        if (!validateEmail(email)) {
            alert("Invalid email format.");
            return;
        }

        if (!validateContact(contact)) {
            alert("Invalid contact number format. Use xxx-xxx-xxxx.");
            return;
        }

        if (name && role && email && contact) {
            const newEmployee = {
                id: employees.length + 1,  // simple ID generation
                name: name,
                role: role,
                email: email,
                contact: contact
            };
            employees.push(newEmployee);
            loadEmployees();

            // Show success message
            alert("Employee added successfully!");

            // Clear the form fields after submission
            document.getElementById('employeeName').value = '';
            document.getElementById('employeeRole').value = '';
            document.getElementById('employeeEmail').value = '';
            document.getElementById('employeeContact').value = '';
        } else {
            alert("Please fill all the fields.");
        }
    });

    // Edit employee
    window.editEmployee = function(id) {
        const employee = employees.find(emp => emp.id === id);

        // Fill the update form with employee details
        document.getElementById('updateEmployeeName').value = employee.name;
        document.getElementById('updateEmployeeRole').value = employee.role;
        document.getElementById('updateEmployeeEmail').value = employee.email;
        document.getElementById('updateEmployeeContact').value = employee.contact;

        // Display the update form
        const updateForm = new bootstrap.Collapse(document.getElementById('updateEmployeeForm'), { toggle: true });

        // On form submit, update the employee details
        document.getElementById('updateEmployeeFormContent').addEventListener('submit', function(e) {
            e.preventDefault();

            const updatedName = document.getElementById('updateEmployeeName').value;
            const updatedRole = document.getElementById('updateEmployeeRole').value;
            const updatedEmail = document.getElementById('updateEmployeeEmail').value;
            const updatedContact = document.getElementById('updateEmployeeContact').value;

            // Validate email and contact for update
            if (!validateEmail(updatedEmail)) {
                alert("Invalid email format.");
                return;
            }

            if (!validateContact(updatedContact)) {
                alert("Invalid contact number format. Use xxx-xxx-xxxx.");
                return;
            }

            employee.name = updatedName;
            employee.role = updatedRole;
            employee.email = updatedEmail;
            employee.contact = updatedContact;

            loadEmployees();

            // Show success message
            alert("Employee updated successfully!");

            // Hide the update form after submission
            updateForm.hide();
        });
    };

    // Delete employee
    window.deleteEmployee = function(id) {
        employees = employees.filter(employee => employee.id !== id);
        loadEmployees();

        // Show success message
        alert("Employee deleted successfully!");
    };

    loadEmployees(); // Initial load of employees
});
