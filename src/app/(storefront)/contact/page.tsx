"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container py-12 md:py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-honey-600 uppercase tracking-wider mb-2">Get In Touch</p>
        <h1 className="text-3xl md:text-4xl font-bold text-forest-900">Reach Out To Us Anytime</h1>
      </div>

      {/* Contact Cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
        <div className="bg-white rounded-xl border border-border p-6 text-center">
          <div className="w-12 h-12 bg-honey-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <MapPin className="h-6 w-6 text-honey-600" />
          </div>
          <h3 className="font-semibold text-forest-900 mb-2">Address</h3>
          <p className="text-sm text-forest-600 leading-relaxed">
            1/178C, Meenkarai Road, Near Eruttu Pallam Bus Stop, Eruttu Pallam, Pollachi. 642103
          </p>
        </div>

        <div className="bg-white rounded-xl border border-border p-6 text-center">
          <div className="w-12 h-12 bg-honey-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <Mail className="h-6 w-6 text-honey-600" />
          </div>
          <h3 className="font-semibold text-forest-900 mb-2">E-Mail</h3>
          <a href="mailto:grabway.in@gmail.com" className="text-sm text-forest-600 hover:text-honey-700 transition-colors">
            grabway.in@gmail.com
          </a>
        </div>

        <div className="bg-white rounded-xl border border-border p-6 text-center">
          <div className="w-12 h-12 bg-honey-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <Phone className="h-6 w-6 text-honey-600" />
          </div>
          <h3 className="font-semibold text-forest-900 mb-2">Phone</h3>
          <a href="tel:+919500779790" className="text-sm text-forest-600 hover:text-honey-700 transition-colors">
            +91 9500779790
          </a>
        </div>
      </div>

      {/* Form + Map Section */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold text-forest-900 mb-1">Have Questions?</h2>
          <p className="text-forest-600 mb-6">Send Your Message</p>

          {submitted ? (
            <div className="bg-honey-50 border border-honey-200 rounded-xl p-8 text-center">
              <p className="text-lg font-semibold text-forest-900 mb-2">Thank you!</p>
              <p className="text-forest-600">We&apos;ve received your message and will get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <textarea
                placeholder="Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y"
              />
              <Button type="submit" variant="outline" className="border-red-400 text-red-500 hover:bg-red-50 uppercase tracking-wider text-sm font-semibold">
                Send Message
              </Button>
            </form>
          )}
        </div>

        {/* Map */}
        <div className="rounded-xl overflow-hidden border border-border h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d980.331279625684!2d76.9133626845053!3d10.631830973195202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba83f05cd84f337%3A0xcbdaeec2e7f6992a!2sGrabWay%20Naturals!5e0!3m2!1sen!2sin!4v1782039847838!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="GrabWay Naturals Location"
          />
        </div>
      </div>

      {/* Back link */}
      <div className="mt-12 text-center">
        <Link href="/" className="text-honey-700 hover:text-honey-800 font-medium transition-colors">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}
