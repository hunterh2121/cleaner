import React, { useState } from "react";
import { Phone, Mail, Clock } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  requestType: "contact" | "quote";
  message: string;
}

const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1323810570067251273/9qZ222LdbWKOfWd23oj-E0nX4IgXWjylW4z-X28pQ9gQlgX22KQ8QJ7tEBTFAgy862SI"; // Replace with your webhook URL

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    service: "window-cleaning",
    requestType: "contact",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendToDiscord = async () => {
    const timestamp = new Date().toLocaleString();

    const embedColor = formData.requestType === "quote" ? 3447003 : 10181046; // Blue for quote, Purple for contact

    const discordMessage = {
      embeds: [
        {
          title: `New ${
            formData.requestType === "quote" ? "Quote Request" : "Contact Form"
          } Submission`,
          color: embedColor,
          fields: [
            {
              name: "Name",
              value: formData.name,
              inline: true,
            },
            {
              name: "Email",
              value: formData.email,
              inline: true,
            },
            {
              name: "Phone",
              value: formData.phone,
              inline: true,
            },
            {
              name: "Service",
              value: formData.service
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" "),
              inline: true,
            },
            {
              name: "Request Type",
              value:
                formData.requestType.charAt(0).toUpperCase() +
                formData.requestType.slice(1),
              inline: true,
            },
            {
              name: "Message",
              value: formData.message,
            },
          ],
          footer: {
            text: `Submitted at ${timestamp}`,
          },
        },
      ],
    };

    try {
      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(discordMessage),
      });

      if (!response.ok) {
        throw new Error("Failed to send to Discord");
      }
    } catch (error) {
      console.error("Error sending to Discord:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await sendToDiscord();
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "window-cleaning",
          requestType: "contact",
          message: "",
        });
      } catch (error) {
        alert("There was an error submitting your message. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Get in touch with us for all your cleaning and maintenance needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-blue-600 mt-1" />
                <div className="ml-4">
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">863-712-1858</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="w-6 h-6 text-blue-600 mt-1" />
                <div className="ml-4">
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">
                    contact@centralfloridawindowcleaner.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-6 h-6 text-blue-600 mt-1" />
                <div className="ml-4">
                  <p className="font-medium text-gray-900">Business Hours</p>
                  <p className="text-gray-600">
                    Monday-Sunday: 8:00 AM-6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            {isSubmitted ? (
              <div className="text-center py-12">
                <h3 className="text-2xl font-semibold text-green-600 mb-4">
                  Thank you for contacting us!
                </h3>
                <p className="text-gray-600">
                  We'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-medium text-gray-900 mb-3">
                    What would you like?
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="quote"
                        name="requestType"
                        value="quote"
                        checked={formData.requestType === "quote"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="quote"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        Get a Quote
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="contact"
                        name="requestType"
                        value="contact"
                        checked={formData.requestType === "contact"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="contact"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        General Contact/Question
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      errors.name ? "border-red-500" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Service Needed
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="window-cleaning">Window Cleaning</option>
                    <option value="gutter-cleaning">Gutter Cleaning</option>
                    <option value="christmas-lights">
                      Christmas Lights Installation
                    </option>
                    <option value="pressure-washing">Pressure Washing</option>
                    <option value="other">Other Services</option>
                    {formData.requestType === "quote" && (
                      <option value="multiple">
                        Multiple Services (specify in message)
                      </option>
                    )}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      errors.message ? "border-red-500" : ""
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
