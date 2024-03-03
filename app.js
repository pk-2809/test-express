const express = require('express');
const cors = require('./cors');
const notificationapi = require('notificationapi-node-server-sdk').default;
const app = express();

app.use(cors);
notificationapi.init(
    '2d60t1vfbmkm9d4p1jfpr35m1m', // clientId
    '138n9ka0aadurtjkfnsv1qm549abq9jjgsc5kdp2jtdrtn52pk62'// clientSecret
)
const employees = [
    { id: 1, name: 'John Doe', department: 'Engineering' },
    { id: 2, name: 'Jane Smith', department: 'Marketing' },
    { id: 3, name: 'Mike Lee', department: 'Sales' },
    { id: 4, name: 'Alice Brown', department: 'Human Resources' },
    { id: 5, name: 'David Johnson', department: 'IT' },
];

app.get('/employees', (req, res) => {
    res.json(employees);
});

app.get('/send', async (req, res) => {
    try {
        const response = await notificationapi.send({
            notificationId: 'your_manager',
            user: {
                id: "root.ap.11@gmail.com",
                email: "apeksha16verma@gmail.com",
                number: "+917668804527"
            },
            mergeTags: {
                item: 'Stagger',
                address: 'Awas Vikas',
                orderId: '1234567890'
            }
        })
        res.send('Notification sent (or success message)', response);
    } catch (error) {
        res.status(500).send(error);
    }
})

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});