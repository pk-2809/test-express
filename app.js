const express = require('express');
const cors = require('./cors');

const app = express();

app.use(cors);

// Define the employee data (replace with database connection if needed)
const employees = [
    { id: 1, name: 'John Doe', department: 'Engineering' },
    { id: 2, name: 'Jane Smith', department: 'Marketing' },
    { id: 3, name: 'Mike Lee', department: 'Sales' },
    { id: 4, name: 'Alice Brown', department: 'Human Resources' },
    { id: 5, name: 'David Johnson', department: 'IT' },
];

// GET route to retrieve employee information
app.get('/employees', (req, res) => {
    res.json(employees);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
