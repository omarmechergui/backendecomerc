const accountSid = '...............................';
const authToken = '.............................';
const client = require('twilio')(accountSid, authToken);
const sendsms = async (req, res) => {
    try {
        const { msg, phone } = req.body;

        await client.messages
            .create({
                body: msg,
                from: '+1***********',
                to: phone,

            })
        res.status(200).send({ msg: "sms sent successfully" });
    } catch (error) {
        res.status(500).send({ msg: "failed to send sms",error });
    }

}

module.exports = sendsms;
