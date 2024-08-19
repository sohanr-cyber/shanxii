import BASE_URL from '@/config'
import {
  bg,
  buttonBg,
  buttonC,
  companyName,
  borderColor,
  outerBg,
  themeC,
  support_number,
  support_mail
} from './const'

const navbar = `  <div
style="
  background-color: rgb(8, 78, 67,0.1);
  padding: 10px;

"
>
<div style ="font-weight: bold;font-size: 200%;color:${themeC};">${companyName}</div>
</div>`

const footer = data => {
  return `<div style ="padding:0 10px">
<div>If you have any questions or need further assistance, please do not hesitate to contact our customer support team at ${support_mail} or ${support_number}.</div>
<p>Warm regards,</p>

<div>Quince Shop</div>
<div>House 41(meena bazar, lift 4), Gareeb-e-Newaz Avenue Road, Sector 11, Uttara, Dhaka</div>
</div>`
}

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

const products = data => {
  console.log(data)
  return ` <div style ="margin-top:10px" >
            ${data.items.map(
              (
                i,
                index
              ) => `  <div style ="display:flex;align-items:flex-start;border:1px solid ${borderColor};background:white;border-radius: 5px;margin-bottom:-10px;">
            <img src="${i.product.thumbnail}" width="140px" height="100px" alt="Product" style="object-fit: cover;aspect-ratio: 1/1;"/>
            <div style ="margin-left:10px">
             <p>${i.product.name} </p>
             <p>Tk ${i.product.priceWithDiscount} X ${i.quantity}</p>
            
            </div>
           </div>`
            )}
            
            </div>`
}

const orderDetails = data => {
  return `<h3 style ="color:${themeC}">Order Items</h3>
<hr style="border-top: 1px solid ${themeC};" />  ${products(data)}
 
  `
}

const orderTotal = data => {
  return `
  <h3 style ="color:${themeC}">Order Summary</h3>
<hr style="border-top: 1px solid ${themeC};" />  <div>
        <table style="width: 100%; margin: 10px 0;">
  <tr>
    <td><b>Cart Total</b></td>
    <td style="text-align: right;">Tk ${data.subtotal}</td>
  </tr>
</table>
<table style="width: 100%; margin: 10px 0;">
  <tr>
    <td><b>Shipping</b></td>
    <td style="text-align: right;">Tk ${data.shippingCost}</td>
  </tr>
</table>
<table style="width: 100%; margin: 10px 0;">
  <tr>
    <td><b>Discount</b></td>
    <td style="text-align: right;">-Tk ${data.discount}</td>
  </tr>
</table>
<table style="width: 100%; margin: 10px 0;">
  <tr>
    <td><b>Total</b></td>
    <td style="text-align: right;">
    <b>Tk ${data.total}</b></td>
  </tr>
</table>

        </div>`
}

const deliveryDetails = data => {
  return `          <h3 style ="color:${themeC}">Delivery Details</h3>
<hr style="border-top: 1px solid ${themeC};" /><table style="width: 100%; margin: 10px 0;">
  <tr>
    <td><b>Name</b></td>
    <td style="text-align: right;">${data.name}</td>
  </tr>
</table>
<table style="width: 100%; margin: 10px 0;">
  <tr>
    <td><b>Email</b></td>
    <td style="text-align: right;">
    ${data.email}</td>
  </tr>
</table>
<table style="width: 100%; margin: 10px 0;">
  <tr>
    <td><b>Shipping Address</b></td>
    <td style="text-align: right;">
    ${data.address}</td>
  </tr>
</table>
<table style="width: 100%; margin: 10px 0;">
  <tr>
    <td><b>Payment Method</b></td>
    <td style="text-align: right;">${
      data.paymentMethod ? data.paymentMethod : 'Cash On Delivery(COD)'
    }</td>
  </tr>
</table>
<table style="width: 100%; margin: 10px 0;">
  <tr>
    <td><b>Payment Status</b></td>
    <td style="text-align: right;">
    ${data.paymentStatus}</td>
  </tr>
</table>
`
}

const orderCancelMessage = data => {
  return `<h3>Your Order Has been cancelled</h3>
  <p>Hi  ${data.name}</p>
  <p>We are sorry that item from order <b>${data.orderId} </b>has been cancelled .</p>
  <p>If you have prepaid for the order , the amount will be refunded back to you.</p>
  <p>
    <button style = "padding:7px; background:${buttonBg}; border:none;font-weight: bold;border-radius: 5px;">
    <a href="${BASE_URL}/order/${data.orderId}" style="text-decoration:none; color:${buttonC}">View My Order</a>
    </button>
  </p>`
}

const orderCanceled = data => {
  return `
 <div style = "padding:10px"> ${orderCancelMessage(data)}
 ${orderDetails(data)}
  ${orderTotal(data)}
 ${deliveryDetails(data)}
</div> `
}

const orderDeliveredMessage = data => {
  return `
  <p>Dear  ${data.name}</p>
  <p>We are delighted to inform you that your order has been successfully delivered!</p>
`
}

const orderDelivered = data => {
  return `
 <div style = "padding:10px"> ${orderDeliveredMessage(data)}
 ${orderDetails(data)}
 ${orderTotal(data)}
 ${deliveryDetails(data)}
</div> `
}

const orderConfirmationMessage = data => {
  return `
  <p>Hi  ${data.name}</p>
  <p>We are excited to inform you that your order has been successfully confirmed! </b></p>
  <p>
    <button style = "padding:7px; background:${buttonBg}; border:none;font-weight: bold;border-Track My Order</a>
    </button>
  </p>`
}
const orderConfirmed = data => {
  return `
 <div style = "padding:10px"> ${orderProcessingMessage(data)}
 ${orderDetails(data)}
 ${orderTotal(data)}
 ${deliveryDetails(data)}
 <p>Our team is now preparing your items for shipment. You will receive another email once your order has been dispatched, including tracking information so you can monitor its progress</p>
</div> `
}

const orderProcessingMessage = data => {
  return `
  <p>Dear ${data.name}</p>
  <p>Thank you for your recent order with <b>${companyName} </b></p>
  <p>We are pleased to inform you that we have received your order and it is currently being processed. Our team is working diligently to ensure that everything is prepared and delivered to you as quickly as possible.</p>
  <p>
    <button style = "padding:7px; background:${buttonBg}; border:none;font-weight: bold;border-radius: 5px;">
    <a href="${BASE_URL}/order/${data.orderId}" style="text-decoration:none; color:${buttonC}">View My Order</a>
    </button>
  </p>`
}

const orderProcessing = data => {
  return `
 <div style = "padding:10px"> ${orderProcessingMessage(data)}
 ${orderDetails(data)}
 ${orderTotal(data)}
 ${deliveryDetails(data)}
 <p>You will receive another email once your order has been confirmed.</p>
</div> `
}

const orderFailedMessage = data => {
  return `
  <p>Hi  ${data.name}</p>
  <p>We regret to inform you that your order has been Failed.</p>
  <p>
    <button style = "padding:7px; background:${buttonBg}; border:none;font-weight: bold;border-radius: 5px;">
    <a href="${BASE_URL}/order/${data.orderId}" style="text-decoration:none; color:${buttonC}">View My Order</a>
    </button>
  </p>`
}

const orderFailed = data => {
  return `
 <div style = "padding:10px"> ${orderFailedMessage(data)}
 ${orderDetails(data)}
 ${orderTotal(data)}
 ${deliveryDetails(data)}
 <p>We understand that this news may be disappointing, and we sincerely apologize for any inconvenience this may cause.</p>
 <p>Thank you for your understanding and patience.</p>
</div> `
}

const sendMessage = data => {
  return `<div style='padding:10px'> ${data.content} </div>`
}

const template = data => {
  console.log('A mail going to ', data.to, '-->', data.for)
  return `
    <div
    style="
      min-height: 100vh;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      font-family: 'Ubuntu', sans-serif;
      background:${outerBg};

    "
  >
 <table style = "width:100%;height:100%;">
 <tr >
 <td align="center">   <div
 style="
   max-width: 570px;
   min-width: 320px;
   width: 100%;
   min-height: 100vh;
   text-align:left;
   background:${bg};
   padding-bottom:15px;

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
    : data.for == 'orderFailed'
    ? orderFailed(data)
    : data.for == 'orderConfirmed'
    ? orderConfirmed(data)
    : data.for == 'orderProcessing'
    ? orderProcessing(data)
    : data.for == 'orderDelivered'
    ? orderDelivered(data)
    : data.for == 'message'
    ? sendMessage(data)
    : resetPassword(data)
}
${footer(data)}
</div></td>
 </tr>
 </table>
  </div>
    `
}

export { template }
