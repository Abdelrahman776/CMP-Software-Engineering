const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// Implementing deleteEmployee function
exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params;
  const index = employee.findIndex(emp => emp.id === id);
  
  if (index !== -1) {
    employee.splice(index, 1);
    return res.status(200).json({ message: 'Employee deleted successfully' });
  }
  
  res.status(404).json({ message: 'Employee not found' });
};

// Implementing createEmployee function
exports.createEmployee = async (req, res, next) => {
  const { id, name } = req.body;
  
  // Check if employee with same ID already exists
  if (employee.some(emp => emp.id === id)) {
    return res.status(400).json({ message: 'Employee with this ID already exists' });
  }

  employee.push({ id, name });
  res.status(201).json({ message: 'Employee created successfully' });
};
