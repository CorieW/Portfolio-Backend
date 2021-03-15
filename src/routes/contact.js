const router = require('express').Router()
const nodemailer = require('nodemailer')

const messages = require('../utils/messages')
const contactSchema = require('../validation/schemas/Contact')

router.post('', async (req, res) =>
{
    const data = {
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    }

    // Email validation
    try {
        await contactSchema.validateAsync(data);
    }
    catch (err) { 
        return res.status(200).send({ message: err.details[0].message, error: 'InvalidInput' })
    }

    const {
        TRANSPORT_USER,
        TRANSPORT_PASSWORD
    } = process.env;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: TRANSPORT_USER,
          pass: TRANSPORT_PASSWORD
        }
    });

    transporter.verify(function(error, success) {
        if (error) return res.status(500).send({ message: messages.serverDownOrBusy })

        const mailOptions = {
            from: 'Portfolio Contact',
            to: data.email,
            subject: data.subject,
            text: data.message
        };
    
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error)
                return res.status(500).send({ message: messages.errorMessage })
            } else {
                console.log("status")
                return res.status(200).send({ message: messages.contactSuccess })
            }
        });
    });
})

module.exports = router