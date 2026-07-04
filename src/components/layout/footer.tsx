import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-forest-900 text-white mt-16">
      {/* Trust badges */}
      <div className="border-b border-forest-700">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-honey-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">100% Pure</h4>
              <p className="text-xs text-forest-200 mt-1">Natural Products</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-honey-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Free Shipping</h4>
              <p className="text-xs text-forest-200 mt-1">Orders above ₹500</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-honey-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Secure Payments</h4>
              <p className="text-xs text-forest-200 mt-1">UPI, Cards & More</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-honey-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Easy Returns</h4>
              <p className="text-xs text-forest-200 mt-1">7-Day Return Policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logos/grabway-logo.png"
                alt="GrabWay"
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-sm text-forest-200 mb-4">
              Bringing nature&apos;s finest honey and home essentials to your doorstep.
              Pure, authentic, and crafted with care.
            </p>
            <div className="flex items-start gap-2 text-sm text-forest-200">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>1/178C, MeenKarai Road, Near Eruttu Pallam Bus Stop, Eruttu Pallam, Pollachi. 642103</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-forest-200 mt-2">
              <Phone className="h-4 w-4" />
              <a href="tel:9500779790" className="hover:text-honey-400 transition-colors">9500779790</a>
            </div>
            <div className="flex items-center gap-2 text-sm text-forest-200 mt-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:grabway.in@gmail.com" className="hover:text-honey-400 transition-colors">grabway.in@gmail.com</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-forest-200">
              <li><Link href="/products" className="hover:text-honey-400 transition-colors">All Products</Link></li>
              <li><Link href="/naturals" className="hover:text-honey-400 transition-colors">Grabway Naturals</Link></li>
              <li><Link href="/essentials" className="hover:text-honey-400 transition-colors">Grabway Essentials</Link></li>
              <li><Link href="/about" className="hover:text-honey-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-honey-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold mb-4">Information</h4>
            <ul className="space-y-2 text-sm text-forest-200">
              <li><Link href="/terms" className="hover:text-honey-400 transition-colors">Terms &amp; Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-honey-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-honey-400 transition-colors">Refund &amp; Returns Policy</Link></li>
              <li><Link href="/orders" className="hover:text-honey-400 transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Connected</h4>
            <p className="text-sm text-forest-200 mb-4">
              Subscribe to get special offers, free giveaways, and health tips.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-forest-800 border border-forest-600 rounded-md text-sm text-white placeholder:text-forest-400 focus:outline-none focus:ring-2 focus:ring-honey-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-honey-500 hover:bg-honey-600 rounded-md text-sm font-medium transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-forest-700">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-forest-300">
          <p>&copy; {new Date().getFullYear()} GrabWay. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>We accept:</span>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-forest-800 rounded text-[10px]">UPI</span>
              <span className="px-2 py-1 bg-forest-800 rounded text-[10px]">VISA</span>
              <span className="px-2 py-1 bg-forest-800 rounded text-[10px]">MC</span>
              <span className="px-2 py-1 bg-forest-800 rounded text-[10px]">COD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
