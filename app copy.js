import { CourierClient } from "@trycourier/courier";
import { notificationapi } from 'notificationapi-node-server-sdk'
import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET',
    allowedHeaders: ['Content-Type', 'Authorization']
}));
const courier = new CourierClient({ authorizationToken: "pk_prod_BDF878SPXPMDR1KHA20DB23RZVYA" });

const notify = new notificationapi();
notify.init(
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

app.get('/send-email', async (req, res) => {
    try {
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

app.get('/sms', async (req, res) => {
    try {
        const response = await notify.send({
            notificationId: 'order_tracking',
            user: {
                id: "root.ap.11@gmail.com",
                email: "root.ap.11@gmail.com",
                number: "+918009225514"
            },
            mergeTags: {
                item: 'Krabby Patty Burger',
                address: '124 Conch Street',
                orderId: '1234567890'
            }
        })
        res.send('Notification sent (or success message)')
    } catch (error) {
        res.status(500).send(error);
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
