const stripe = require("stripe");
const secretky ="sk_test_51QUmEbDZERtyZuoCymo8OuIy2pAKYXV8PywYPGmp2myEBPCNcIremMTpHH5MW6yXlgknXxa8xNeEOP2OZl2OQJDS00fiOm02ga";
const Stripe = stripe(secretky);
const payment = async (req, res) => {
    try {
        const cart = req.body.cart;
        const line_items = cart.map(prodacte => {
            return{
                price_data:{
                    currency:"USD",
                    product_data:{
                        name:prodacte.prodact.name,
                        description:prodacte.prodact.discription,
                        images:[prodacte.prodact.img],
                        metadata:{
                            id:prodacte.prodact._id
                        }
                    },
                    unit_amount:prodacte.prodact.price*100,
                },
                quantity:prodacte.quantity
            }
        })
        const session = await Stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url:"http://localhost:5000/successpayment",
            cancel_url:"http://localhost:5000/cancelpayment"
        })
        res.status(200).send({msg:"click to the link",url:session.url});
    } catch (error) {
        res.status(500).send({msg:"payment failed",error});
    }
}
const successpayment = async(req, res) => {
    res.status(200).send({msg:"thank you for your order"})
}
const cancelpayment = async(req, res) => {
    res.status(400).send({msg:"payment failed"})
}


module.exports = {payment,successpayment,cancelpayment}