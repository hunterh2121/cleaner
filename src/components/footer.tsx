import {
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const services = [
    "Window Cleaning",
    "Gutter Cleaning",
    "Pressure Washing",
    "Solar Panel Cleaning",
    "Christmas Lights Installation",
    "Commercial Services",
    "Residential Services",
  ];

  const contactInfo = {
    phone: "863-712-1858",
    email: "contact@centralfloridawindowcleaner.com",
    hours: "Monday-Sunday: 8AM-6PM",
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      // Replace this URL with your Discord webhook URL
      const webhookUrl =
        "https://discord.com/api/webhooks/1324196746170994798/pdSvh2m_cYV92Kmskyg-Jtj2vWkpl-Ypwzjjm6G4FC6tXO59XaIEul0-UeNhfuN9i560";

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: `New newsletter subscription: ${email}`,
          embeds: [
            {
              title: "Newsletter Subscription",
              description: `Email: ${email}`,
              color: 3447003, // Blue color
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setEmail("");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-slate-900 text-white pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Central Florida Window Cleaners
            </h3>
            <p className="text-slate-300 mb-4">
              Professional cleaning services for your home and business.
              Licensed, bonded, and insured.
            </p>
            <div className="flex space-x-4">
              <a target="_blank" href="https://www.facebook.com/cfwc2023">
                <Facebook className="w-6 h-6 text-slate-300 hover:text-white cursor-pointer" />
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/centralfloridawindowcleaners"
              >
                <Instagram className="w-6 h-6 text-slate-300 hover:text-white cursor-pointer" />
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/central-florida-window-cleaners-24a72b296"
              >
                <Linkedin className="w-6 h-6 text-slate-300 hover:text-white cursor-pointer" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li
                  key={index}
                  className="text-slate-300 hover:text-white cursor-pointer"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-slate-300" />
                <span className="text-slate-300">{contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-slate-300" />
                <span className="text-slate-300">{contactInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-slate-300" />
                <span className="text-slate-300">{contactInfo.hours}</span>
              </div>
            </div>
          </div>

          {/* Newsletter Signup with Discord Webhook */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-slate-300 mb-4">
              Subscribe to our newsletter for tips and special offers!
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-slate-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
              {submitStatus === "success" && (
                <p className="text-green-400 text-sm">
                  Successfully subscribed!
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-400 text-sm">
                  Something went wrong. Please try again later.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-300 text-sm">
              © {currentYear} Central Florida Window Cleaners. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
