import nc from 'next-connect'
import axios from 'axios'
const handler = nc()
const base_url = "https://portal.packzy.com/api/v1"
const steadfast_api_key = process.env.steadfast_api_key
const steadfast_secret_key = process.env.steadfast_secret_key


handler.get(async (req, res) => {
    try {
        const { data } = await axios.post(`${base_url}/create_order`, {
            invoice: "2523523",
            recipient_name: "Test user",
            recipient_phone: "01744229811",
            recipient_address: "Fla# A1,House# 17/1, Road# 3/A, Dhanmondi,Dhaka-1209",
            cod_amount: "1060",
            note: "This is for testing"

        }, {
            headers: {
                "Api-Key": steadfast_api_key,
                "Secret-Key": steadfast_secret_key,
                "Content-Type": "application/json"
            }
        })

        return res.status(200).send(data)
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
})


export default handler