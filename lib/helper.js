import emailjs from "@emailjs/browser";

export const sendOrderConfirmation = async (order) => {
  try {
    console.log("📧 Sending order confirmation:", order);

    const itemsHtml = order.productDetails
      ? order.productDetails
          .map(
            (p, idx) => `
  <tr>
    <td style="padding: 10px; width: 70px;">
      <img src="${p.imageUrl}" alt="${
              p.title
            }" style="width: 60px; height: auto; border-radius: 4px;" />
    </td>
    <td style="padding: 10px; font-family: Arial, sans-serif; font-size: 14px; color: #333;">
      <div style="font-weight: 500; margin-bottom: 4px;">${p.title}</div>
${
  p.size
    ? `<div style="color: #555; font-size: 13px;">Size: ${p.size}</div>`
    : ""
}
    </td>
    <td style="padding: 10px; text-align: center; font-family: Arial, sans-serif; font-size: 14px; color: #333;">
      ${p.quantity}
    </td>
    <td style="padding: 10px; text-align: right; font-family: Arial, sans-serif; font-size: 14px; color: #333;">
      ₹${p.price}
    </td>
  </tr>
`
          )
          .join("")
      : "";

    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_SERVICE_ID,
      process.env.NEXT_PUBLIC_TEMPLATE_ID,
      {
        title: "Order Confirmation",
        order_id: order.id,
        user_name: order.userName,
        total_amount: order.finalTotal,
        user_email: order.userEmail,

        items_block: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          @media only screen and (max-width: 678px) {
            .email-container {
              width: 100% !important;
            }
          }
        </style>
      </head>
      <body style="margin:0; padding:0; font-family: Arial, sans-serif; color:#333;">
        <table class="email-container" style="max-width:1500px; width:80%; border-collapse:collapse;">
          <tr>
            <td>
              <h3 style="color: #3e976c; margin-bottom: 10px;">Thank you for your order, ${
                order.userName
              }!</h3>
              <p style="font-size: 14px; margin-bottom: 20px;">Here’s your order summary:</p>

              <!-- Products Table -->
              <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd; margin-bottom: 20px;">
                <thead>
                  <tr style="background-color: #f2f2f2;">
                    <th style="padding: 10px; text-align: left; font-size:14px;">Product</th>
                    <th style="padding: 10px; text-align: left; font-size:14px;"></th>
                    <th style="padding: 10px; text-align: center; font-size:14px;">Qty</th>
                    <th style="padding: 10px; text-align: right; font-size:14px;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <!-- Amount Summary Box -->
              <table style="width: 100%; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #ddd; border-radius: 4px; border-collapse: collapse; margin-bottom:20px;">
                <tr>
                  <td style="padding: 10px;">Subtotal:</td>
                  <td style="padding: 10px; text-align: right;">₹${
                    order.totalAmount
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 10px;">Coupon Discount:</td>
                  <td style="padding: 10px; text-align: right;">- ₹${
                    order.couponDiscount || 0
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 10px;">Shipping Charge:</td>
                  <td style="padding: 10px; text-align: right;">${
                    order.shippingCharge === 0
                      ? "Free Shipping"
                      : `₹${order.shippingCharge}`
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold;">Total:</td>
                  <td style="padding: 10px; text-align: right; font-weight: bold; color: #3e976c;">₹${
                    order.finalTotal
                  }</td>
                </tr>
              </table>

              <!-- Shipping Address -->
              <div style="margin-top: 20px; padding-top: 15px; font-size: 14px;">
                <h3 style="margin: 0 0 10px 0; font-size: 15px; color: #3e976c;">Shipping Address</h3>
                <p style="margin: 0;">
                  ${order.userAddress?.Street || ""}<br/>
                  ${order.userAddress?.city || ""}, ${
          order.userAddress?.country || ""
        } ${order.userAddress?.postcode || ""}<br/>
                </p>
              </div>
            </td>
          </tr>
        </table>
      </body>
      </html>
      `,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );

    console.log("✅ EmailJS result:", result);
    return true;
  } catch (err) {
    console.error("❌ EmailJS failed:", err);
    return false;
  }
};
