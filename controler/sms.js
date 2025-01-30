const accountSid = 'ACc81767f1b930a689a156edd05b86aa71';
const authToken = 'fa08315d91ee30dc9a823a572f328e6b';
const client = require('twilio')(accountSid, authToken);
const sendsms = async (req, res) => {
    try {
        const { msg, phone } = req.body;

        await client.messages
            .create({
                body: msg,
                from: '+13203733927',
                to: phone,

            })
        res.status(200).send({ msg: "sms sent successfully" });
    } catch (error) {
        res.status(500).send({ msg: "failed to send sms",error });
    }

}

module.exports = sendsms;