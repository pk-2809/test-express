import { CourierClient } from "@trycourier/courier";
import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET',
    allowedHeaders: ['Content-Type', 'Authorization']
}));

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
        const courier = new CourierClient({ authorizationToken: "pk_prod_BDF878SPXPMDR1KHA20DB23RZVYA" });
        const { requestId } = await courier.send({
            message: {
                to: {
                    data: {
                        name: "Marty",
                    },
                    email: "prnvkatiyar@gmail.com",
                },
                content: {
                    title: "Back to the Future",
                    body: "Oh my darling, we need 1.21 Gigawatts!",
                },
                routing: {
                    method: "single",
                    channels: ["email"],
                },
            },
        });
        res.send("Notification Sent", requestId);
    } catch (error) {
        res.status(500).send(error);
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
