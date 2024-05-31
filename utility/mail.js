const navbar = `  <div
style="
  background-color: rgb(8, 78, 67,0.1);
  padding: 10px;

"
>
<div style ="font-weight: bold;font-size: 200%;color:rgb(8, 78, 67);">Quince</div>
</div>`

const footer = `<div style ="padding:0 10px">
<p>Warm regards,</p>
</p>
<div>Quince Shop</div>
<div>House 41(meena bazar, lift 4), Gareeb-e-Newaz Avenue Road, Sector 11, Uttara, Dhaka</div>
</div>`

const mailVerification = data => {
  return `    <div style="padding: 10px;">
  <p>To Verify Your Account , Please use the following code bellow</p>
  <p>
    <div style ="background:rgb(8, 78, 67);text-align: center; font-size: 150%;font-weight: bolder;padding:15px;color:white">${data.code}</div>
  </p>
  <div>This will expire in 5 minutes</div>
</div>`
}

const resetPassword = data => {
  return `    <div style="padding: 10px;">
    <p>To Reset Your Account Password , Please use the following code bellow</p>
    <p>
      <div style ="background:rgb(8, 78, 67);text-align: center; font-size: 150%;font-weight: bolder;padding:15px;color:white">${data.code}</div>
    </p>
    <div>This will expire in 5 minutes</div>
  </div>`
}

const orderCancelMessage = data => {
  return `<h3>Your Order Has been cancelled</h3>
  <p>Hi , ${data.name}</p>
  <p>We are sorry that item from order <b>${data.orderId} </b>has been cancelled .</p>
  <p>If you have prepaid for the order , the amount will be refunded back to you.</p>
  <p>
    <button style = "padding:10px 25px; background:rgb(7, 93, 54); border:none;color:white;font-weight: bold;border-radius: 5px;">View My Order</button>
  </p>`
}

const products = data => {
  return ` <div>
            ${[1, 2, 2].map(
              (
                i,
                index
              ) => `  <div style ="display:flex;align-items:flex-start;border:1px solid rgb(200, 200, 200);background:white;border-radius: 5px;">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCnTzKMUC_kbG03XZZ4IeuDS8WBJJL1ESOxw&s" width="150px" height="130px" alt="Product" style="object-fit: cover;aspect-ratio: 1/1;"/>
            <div style ="margin-left:10px">
             <p>Almond & Avocado Products .. - 17 ml</p>
             <p>Tk 183 X 1</p>
            </div>
           </div>`
            )}
            
            </div>`
}

const orderDetails = data => {
  return `<h3>Order Details</h3>
  ${products(data)}
  
  `
}

const orderCanceled = data => {
  return `
 <div style = "padding:10px"> ${orderCancelMessage(data)}
 ${orderDetails(data)}
</div> `
}

const template = data => {
  return `
    <div
    style="
      min-height: 100vh;
      min-width:100vw;
      background-color: rgb(255, 6, 255);
      display: flex;
      align-items: flex-start;
      justify-content: center;
      font-family: 'Ubuntu', sans-serif;
    "
  >
    <div
      style="
        background-color:aliceblue;
        max-width: 570px;
        min-width: 320px;
        width: 100%;
        min-height: 100vh;
      "
    >
    ${navbar}
    ${
      data.for == 'verification'
        ? mailVerification(data)
        : data.for == 'reset'
        ? resetPassword(data)
        : data.for == 'orderCanceled'
        ? orderCanceled(data)
        : resetPassword(data)
    }
   ${footer}
    </div>
  </div>
    `
}

export { template }
