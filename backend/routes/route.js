import nodemailer from 'nodemailer';
import express from "express";
import FormData from '../model.js';

const router = express.Router();


router.post('/sendEmail', async (req, res) => {

    // console.log(selectedItemsData)
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD,
        },
    });
    const selectedItemsData = req.body;
    const message = {
        from: {
            name: 'Sarthak Vaish',
            address: process.env.USER
        },
        to: ['sarthavkumar@gmail.com', 'sarthakvkumar@gmail.com'],
        subject: 'Selected Items Data',
        text: selectedItemsData.map(item => `Name: ${item.name}, Phone Number: ${item.phoneNumber}, Email: ${item.email}, Hobbies: ${item.hobbies}`).join('\n\n')
    };

    try {
        await transporter.sendMail(message);
        res.status(200).send('Email sent successfully');

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

router.post('/createNew', async (req, res) => {
    const { name, phoneNumber, email, hobbies } = req.body;

    try {
        const newFormData = new FormData({ name, phoneNumber, email, hobbies });
        await newFormData.save();
        res.status(201).json({ message: 'Form data saved successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to save form data', error: err.message });
    }
});

router.get('/getAll', async (req, res) => {
    try {
        const formData = await FormData.find();
        res.status(200).json(formData);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch form data', error: err.message });
    }
});

router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, phoneNumber, email, hobbies } = req.body;

    try {
        const formData = await FormData.findByIdAndUpdate(id, { name, phoneNumber, email, hobbies }, { new: true });
        res.status(200).json(formData);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update form data', error: err.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await FormData.findByIdAndDelete(id);
        res.status(200).json({ message: 'Form data deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete form data', error: err.message });
    }
});


export default router;