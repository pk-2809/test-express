import { CourierClient } from "@trycourier/courier";
import express from 'express';
import cors from './cors';
const app = express();
app.use(cors);

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
        const courier = CourierClient({
            authorizationToken: process.env.COURIER_API_KEY || "pk_prod_BDF878SPXPMDR1KHA20DB23RZVYA"
        });
        const { requestId } = await courier.send({
            message: {
                content: {
                    title: "Welcome to Courier!",
                    body: "Want to hear a joke?"
                },
                data: {
                    joke: "Why was the JavaScript developer sad? Because they didn't Node how to Express themselves"
                },
                to: {
                    email: "prnvkatiyar@gmail.com"
                }
            }
        });
        console.log(requestId);
        res.send("Notification Sent");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error sending notification");
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
