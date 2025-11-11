"use client";
import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="container py-10 px-4 md:px-20 text-gray-800 leading-relaxed">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Terms & Conditions
      </h1>

      <p className="mb-4">
        Welcome to <strong>BearBenz</strong>. By accessing or using our website
        (<a href="https://bearbenz.com" className="text-blue-600 underline">
          bearbenz.in
        </a>), you agree to comply with and be bound by the following Terms and
        Conditions. Please read them carefully before using our platform.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. General Information</h2>
      <p className="mb-4">
        BearBenz is a men’s fashion brand specializing in premium shirts and
        t-shirts. By using our services, you confirm that you are at least 18
        years old or have parental consent to use this website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Product Information</h2>
      <p className="mb-4">
        We strive to ensure all product details, images, and prices displayed
        on our website are accurate. However, minor variations in color or
        design may occur due to screen differences or photography lighting.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Orders & Payments</h2>
      <p className="mb-4">
        All orders are subject to availability and acceptance. Once an order is
        placed, you’ll receive a confirmation email. Payment must be made using
        the available payment gateways on our website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Shipping & Delivery</h2>
      <p className="mb-4">
        Orders are shipped within the estimated time mentioned during checkout.
        Delivery times may vary depending on your location and external
        logistics factors. BearBenz is not responsible for delays caused by
        courier partners.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Returns & Exchanges</h2>
      <p className="mb-4">
        We offer returns or exchanges within 7 days of delivery, provided the
        item is unused, unwashed, and in its original packaging. To initiate a
        return, please contact our support team with your order details.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Pricing & Offers</h2>
      <p className="mb-4">
        All prices listed are inclusive of applicable taxes unless stated
        otherwise. Promotional offers or discounts cannot be combined unless
        explicitly mentioned.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Intellectual Property</h2>
      <p className="mb-4">
        All logos, images, designs, and content displayed on BearBenz are the
        intellectual property of BearBenz. Unauthorized use, reproduction, or
        distribution is strictly prohibited.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Privacy Policy</h2>
      <p className="mb-4">
        Your personal data is handled securely and in accordance with our
        <a
          href="/privacy-policy"
          className="text-blue-600 underline ml-1"
        >
          Privacy Policy
        </a>
        . We do not sell or share your personal information with third parties
        without your consent.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Limitation of Liability</h2>
      <p className="mb-4">
        BearBenz shall not be liable for any indirect, incidental, or
        consequential damages arising from your use of our website or products.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">10. Changes to Terms</h2>
      <p className="mb-4">
        We reserve the right to update or modify these Terms & Conditions at any
        time. Changes will take effect immediately upon posting on our website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">11. Contact Us</h2>
      <p className="mb-8">
        For any questions or concerns regarding these Terms & Conditions, feel
        free to reach out to us:
        <br />
        📧 <a href="mailto:support@bearbenz.in" className="text-blue-600 underline">support@bearbenz.com</a>
        <br />
        📍 Surat, Gujarat, India
      </p>

      <p className="text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} BearBenz. All Rights Reserved.
      </p>
    </div>
  );
};

export default TermsAndConditions;
