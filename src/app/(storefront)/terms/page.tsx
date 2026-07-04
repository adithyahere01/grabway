import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto prose prose-forest">
        <h1 className="text-3xl md:text-4xl font-bold text-forest-900 mb-4">Terms &amp; Conditions</h1>

        <p className="text-forest-600 leading-relaxed">
          Welcome to GrabWay Naturals. By accessing our website and purchasing our products, you agree to the
          following Terms &amp; Conditions. Please read them carefully before using our website.
        </p>

        <h2 className="text-xl font-bold text-forest-900 mt-8 mb-3">Overview</h2>
        <p className="text-forest-600 leading-relaxed">
          This website is operated by GrabWay Naturals. Throughout the site, the terms &ldquo;we&rdquo;,
          &ldquo;us&rdquo;, and &ldquo;our&rdquo; refer to GrabWay Naturals. By visiting our site and/or
          purchasing something from us, you engage in our &ldquo;Service&rdquo; and agree to be bound by
          these Terms &amp; Conditions.
        </p>

        <h2 className="text-xl font-bold text-forest-900 mt-8 mb-3">Products &amp; Information</h2>
        <p className="text-forest-600 leading-relaxed">
          We strive to ensure that all product descriptions, images, pricing, and other information displayed
          on our website are accurate and up to date. However, we do not guarantee that all information is
          completely error-free.
        </p>
        <p className="text-forest-600 leading-relaxed mt-3">
          Natural products such as honey may vary slightly in:
        </p>
        <ul className="list-disc pl-6 text-forest-600 space-y-1 mt-2">
          <li>Color</li>
          <li>Taste</li>
          <li>Texture</li>
          <li>Crystallization</li>
        </ul>
        <p className="text-forest-600 leading-relaxed mt-3">
          These are natural characteristics and not defects.
        </p>

        <h2 className="text-xl font-bold text-forest-900 mt-8 mb-3">Product Usage</h2>
        <p className="text-forest-600 leading-relaxed">
          Our products are intended for personal use only. Customers are advised to:
        </p>
        <ul className="list-disc pl-6 text-forest-600 space-y-1 mt-2">
          <li>Use products as directed</li>
          <li>Store products properly</li>
          <li>Consult a healthcare professional before use if allergic or under medical treatment</li>
        </ul>
        <p className="text-forest-600 leading-relaxed mt-3">
          We do not make medical or disease cure claims regarding any of our products.
        </p>

        <h2 className="text-xl font-bold text-forest-900 mt-8 mb-3">Pricing &amp; Payments</h2>
        <p className="text-forest-600 leading-relaxed">
          All prices listed on the website are in INR (&pound;) unless otherwise stated.
        </p>
        <p className="text-forest-600 leading-relaxed mt-3">We reserve the right to:</p>
        <ul className="list-disc pl-6 text-forest-600 space-y-1 mt-2">
          <li>Modify product prices</li>
          <li>Discontinue products</li>
          <li>Change offers or promotions at any time without prior notice</li>
        </ul>
        <p className="text-forest-600 leading-relaxed mt-3">
          Payments must be completed through approved payment methods available on the website.
        </p>

        <h2 className="text-xl font-bold text-forest-900 mt-8 mb-3">Shipping &amp; Delivery</h2>
        <p className="text-forest-600 leading-relaxed">
          We aim to process and dispatch orders as quickly as possible. Delivery timelines may vary depending on:
        </p>
        <ul className="list-disc pl-6 text-forest-600 space-y-1 mt-2">
          <li>Location</li>
          <li>Courier availability</li>
          <li>Weather or unforeseen circumstances</li>
        </ul>
        <p className="text-forest-600 leading-relaxed mt-3">
          We are not responsible for delays caused by third-party courier services.
        </p>

        <h2 className="text-xl font-bold text-forest-900 mt-8 mb-3">Returns &amp; Refunds</h2>
        <p className="text-forest-600 leading-relaxed">
          Please refer to our{" "}
          <Link href="/refund-policy" className="text-honey-700 hover:text-honey-800 underline">
            Refund &amp; Returns Policy
          </Link>{" "}
          for detailed information regarding refund eligibility, damaged products, exchanges, and return conditions.
        </p>

        <h2 className="text-xl font-bold text-forest-900 mt-8 mb-3">Intellectual Property</h2>
        <p className="text-forest-600 leading-relaxed">
          All content on this website including:
        </p>
        <ul className="list-disc pl-6 text-forest-600 space-y-1 mt-2">
          <li>Logo</li>
          <li>Brand name</li>
          <li>Images</li>
          <li>Product descriptions</li>
          <li>Graphics</li>
          <li>Website content</li>
        </ul>
        <p className="text-forest-600 leading-relaxed mt-3">
          belongs to GrabWay Naturals and may not be copied, reproduced, or used without written permission.
        </p>

        <h2 className="text-xl font-bold text-forest-900 mt-8 mb-3">Prohibited Activities</h2>
        <p className="text-forest-600 leading-relaxed">Users must not:</p>
        <ul className="list-disc pl-6 text-forest-600 space-y-1 mt-2">
          <li>Misuse the website</li>
          <li>Attempt unauthorized access</li>
          <li>Upload malicious content</li>
          <li>Use our content for illegal or fraudulent activities</li>
        </ul>

        <h2 className="text-xl font-bold text-forest-900 mt-8 mb-3">Limitation of Liability</h2>
        <p className="text-forest-600 leading-relaxed">GrabWay Naturals shall not be held liable for:</p>
        <ul className="list-disc pl-6 text-forest-600 space-y-1 mt-2">
          <li>Indirect or incidental damages</li>
          <li>Allergic reactions due to undisclosed sensitivities</li>
          <li>Delays caused by courier partners</li>
          <li>Misuse of products</li>
        </ul>
        <p className="text-forest-600 leading-relaxed mt-3">
          Customers are responsible for checking ingredient suitability before use.
        </p>

        <h2 className="text-xl font-bold text-forest-900 mt-8 mb-3">Privacy</h2>
        <p className="text-forest-600 leading-relaxed">
          Your personal information submitted through the website is protected and handled according to our{" "}
          <Link href="/privacy-policy" className="text-honey-700 hover:text-honey-800 underline">
            Privacy Policy
          </Link>.
        </p>

        <h2 className="text-xl font-bold text-forest-900 mt-8 mb-3">Changes to Terms</h2>
        <p className="text-forest-600 leading-relaxed">
          We reserve the right to update or modify these Terms &amp; Conditions at any time without prior notice.
          Continued use of the website after changes constitutes acceptance of those changes.
        </p>

        <h2 className="text-xl font-bold text-forest-900 mt-8 mb-3">Contact Us</h2>
        <p className="text-forest-600 leading-relaxed">
          For any questions regarding these Terms &amp; Conditions, please contact us:
        </p>
        <p className="text-forest-600 mt-3">
          <a href="mailto:grabway.in@gmail.com" className="text-honey-700 hover:text-honey-800">grabway.in@gmail.com</a>
        </p>
        <p className="text-forest-600 mt-2">
          1/178C, Meenkarai Rd, Near Eruttu Pallam Bus Stop, Eruttu Pallam, Pollachi, Tamil Nadu 642103
        </p>
      </div>
    </div>
  );
}
