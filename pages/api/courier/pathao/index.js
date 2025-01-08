import nc from 'next-connect'
const handler = nc()

const base_url = "https://courier-api-sandbox.pathao.com"
const client_id = process.env.pathao_client_id
const client_secret = process.env.pathao_client_secret
const client_email = "sohanur25800@gmail.com"
const client_password = "Pathao//329811"
// const client_password = "M6?DxmR9"

const grant_type = "password"

import axios from 'axios'
console.log({ client_id, client_secret })
handler.get(async (req, res) => {
    try {
        const { data } = await axios.post(`${base_url}/aladdin/api/v1/issue-token`, {
            client_id,
            client_secret,
            username: client_email,
            password: client_password,
            grant_type
        }, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
            }
        })
        console.log('Token Response:', data);
        return res.status(200).send(data)
    } catch (error) {
        console.log(error)
        return res.status(200).send(error)

    }

})

export default handler