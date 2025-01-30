const users = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const valid_email = async (req, res) => {
    try {
        const fond = await users.findOne({ email: req.body.email });
        if (fond) {
            res.status(400).send({ msg: "user already exist" });
        }
        else {
            const secretky = "abc123";
            const token = jwt.sign({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            }, secretky);
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "oo2377107@gmail.com", pass: "cnee pzqq yafd wvha"
                }
            })
            const mailOptions = {
                from: "oo2377107@gmail.com",
                to: req.body.email,
                subject: "Email Verification",
                html: `
            <h1 style="color:blue">Hello ${req.body.name},</h1>
            <p>Click the link below to verify your email address:</p>
            <a href="http://localhost:5000/verify/${token}">click here</a>`
            }
            await transporter.sendMail(mailOptions, (error) => {
                if (error) throw error;
            })
            res.status(200).send({ msg: "verification email sent" });
        }
    } catch (error) {
        res.status(500).send({ msg: "failed to send email" })
    }
}
const singup = async (req, res) => {
    try {
    const token_email = req.params.token;
    const decoded = jwt.verify(token_email, "abc123");
    console.log(decoded);

    const salt = 10;
    const hpassword = bcrypt.hashSync(decoded.password, salt);
    console.log(hpassword);
    const user = new users(decoded);
    user.password = hpassword;
    await user.save();
    const secretky = "abc123";
    const token = jwt.sign({ id: user._id, name: user.name }, secretky, { expiresIn: "30d" });
    res.status(200).send({ msg: "success", user, token });

    } catch (error) {
    res.status(500).send({ msg: "failed to register" });
}
}

const singin = async (req, res) => {
    try {
        const found = await users.findOne({ email: req.body.email });
        if (!found) {
            res.status(400).send({ msg: "user not found" });
        }
        else {
            const match = bcrypt.compareSync(req.body.password, found.password);
            if (!match) {
                res.status(400).send({ msg: "password incorrect" });
            }
            else {
                const secretky = "abc123";
                const token = jwt.sign({ id: found._id, name: found.name }, secretky, { expiresIn: "30d" });
                res.status(200).send({ msg: "success", user: found, token });


            }
        }
    } catch (error) {
        res.status(500).send({ msg: "login failed" });
    }
}

const updateuser =async (req, res) =>{
    try {
        const user= await users.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).send({msg:"user updated",user});
    } catch (error) {
        res.status(500).send({msg:"failed to update user"});
    }
}

module.exports = { singup, singin, valid_email ,updateuser }