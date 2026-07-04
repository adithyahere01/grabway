import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto prose prose-forest">
        <h1 className="text-3xl md:text-4xl font-bold text-forest-900 mb-4">Privacy Policy</h1>

        <p className="text-forest-600 leading-relaxed">
          At GrabWay Naturals, your privacy is important to us. This Privacy Policy explains how we collect,
          use, and protect your personal information when you visit our website or purchase our products.
        </p>
        <p className="text-forest-600 leading-relaxed mt-3">
          By using our website, you agree to the practices described in this policy.
        </p>

        <h2 className="text-xl font-bold text-forest-900 mt-8 mb-3">Information We Collect</h2>
        <p className="text-forest-600 leading-relaxed">
          When you use our website, we may collect the following information:
        </p>

        <h3 className="text-lg font-semibold text-forest-900 mt-5 mb-2">Personal Information</h3>
        <ul className="list-disc pl-6 text-forest-600 space-y-1">
          <li>Name</li>
          <li>Phone number</li>
          <li>Email address</li>
          <li>Shipping &amp; billing address</li>
          <li>Payment details (processed securely through payment providers)</li>
        </ul>

        <h3 className="text-lg font-semibold text-forest-900 mt-5 mb-2">Non-Personal Information</h3>
        <ul className="list-disc pl-6 text-forest-600 space-y-1">
          <li>Browser type</li>
          <li>Device information</li>
          <li>IP address</li>
          <li>Website usage data</li>
          <li>Cookies and analytics data</li>
        </ul>

        <h2 className="text-xl font-bold text-forest-900 mt-8 mb-3">How We Use Your Information</h2>
        <p className="text-forest-600 leading-relaxed">We use your information to:</p>
        <ul className="list-disc pl-6 text-forest-600 space-y-1 mt-2">
          <li>Process and deliver orders</li>
          <li>Provide customer support</li>
          <li>Send order updates and notifications</li>
          <li>Improve our website and services</li>
          <li>Prevent fraud and unauthorized activities</li>
          <li>Send promotional offers or updates (only if you choose to receive them)</li>
        </ul>

        <h2 className="text-xl font-bold text-forest-900 mt-8 mb-3">Payment Security</h2>
        <p className="text-forest-600 leading-relaxed">
          We do not store your card or banking information directly on our servers. Payments are securely
          processed through trusted third-party payment gateways.
        </p>

        <h2 className="text-xl font-bold text-forest-900 mt-8 mb-3">Cookies</h2>
        <p className="text-forest-600 leading-relaxed">Our website may use cookies to:</p>
        <ul className="list-disc pl-6 text-forest-600 space-y-1 mt-2">
          <li>Improve user experience</li>
          <li>Remember preferences</li>
          <li>Analyze website traffic</li>
          <li>Enhance website performance</li>
        </ul>
        <p className="text-forest-600 leading-relaxed mt-3">
          You may choose to disable cookies through your browser settings.
        </p>

        <h2 className="text-xl font-bold text-forest-900 mt-8 mb-3">Sharing of Information</h2>
        <p className="text-forest-600 leading-relaxed">
          We do not sell, trade, or rent your personal information to third parties.
        </p>
        <p className="text-forest-600 leading-relaxed mt-3">
          Your information may only be shared with:
        </p>
        <ul className="list-disc pl-6 text-forest-600 space-y-1 mt-2">
          <li>Delivery and logistics partners</li>
          <li>Payment service providers</li>
          <li>Legal authorities if required by law</li>
        </ul>

        <h2 className="text-xl font-bold text-forest-900 mt-8 mb-3">Data Protection</h2>
        <p className="text-forest-600 leading-relaxed">
          We take reasonable security measures to protect your personal information from:
        </p>
        <ul className="list-disc pl-6 text-forest-600 space-y-1 mt-2">
          <li>Unauthorized access</li>
          <li>Misuse</li>
          <li>Loss</li>
          <li>Disclosure</li>
        </ul>
        <p className="text-forest-600 leading-relaxed mt-3">
          However, no online transmission or storage system can be guaranteed as 100% secure.
        </p>

        <h2 className="text-xl font-bold text-forest-900 mt-8 mb-3">Third-Party Links</h2>
        <p className="text-forest-600 leading-relaxed">
          Our website may contain links to third-party websites. We are not responsible for the privacy
          practices or content of those websites.
        </p>

        <h2 className="text-xl font-bold text-forest-900 mt-8 mb-3">Your Rights</h2>
        <p className="text-forest-600 leading-relaxed">You may request to:</p>
        <ul className="list-disc pl-6 text-forest-600 space-y-1 mt-2">
          <li>Access your personal data</li>
          <li>Correct inaccurate information</li>
          <li>Delete your personal information</li>
          <li>Opt out of promotional communications</li>
        </ul>
        <p className="text-forest-600 leading-relaxed mt-3">
          To make such requests, contact us using the details below.
        </p>

        <h2 className="text-xl font-bold text-forest-900 mt-8 mb-3">Children&apos;s Privacy</h2>
        <p className="text-forest-600 leading-relaxed">
          Our website is not intended for children under the age of 13. We do not knowingly collect personal
          information from children.
        </p>

        <h2 className="text-xl font-bold text-forest-900 mt-8 mb-3">Changes to This Policy</h2>
        <p className="text-forest-600 leading-relaxed">
          GrabWay Naturals reserves the right to update or modify this Privacy Policy at any time. Changes
          will be posted on this page.
        </p>

        <h2 className="text-xl font-bold text-forest-900 mt-8 mb-3">Contact Us</h2>
        <p className="text-forest-600 leading-relaxed">
          For questions regarding this Privacy Policy, please contact us:
        </p>
        <p className="text-forest-600 mt-3">
          <a href="mailto:grabway.in@gmail.com" className="text-honey-700 hover:text-honey-800">grabway.in@gmail.com</a>
        </p>
        <p className="text-forest-600 mt-2">
          1/178C, Meenkarai Rd, Near Eruttu Pallam Bus Stop, Eruttu Pallam, Pollachi, Tamil Nadu 642103
        </p>
        <p className="text-forest-600 mt-6 font-medium">
          Thank you for trusting GrabWay Naturals.
        </p>
      </div>
    </div>
  );
}
