import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search, Phone, Mail, Clock } from "lucide-react";

interface FAQSection {
  category: string;
  questions: {
    question: string;
    answer: string;
  }[];
}

const faqData: FAQSection[] = [
  {
    category: "Window Cleaning",
    questions: [
      {
        question: "How often should I have my windows professionally cleaned?",
        answer:
          "For residential properties, we recommend professional cleaning 1-2 times per year. Commercial properties may require more frequent cleaning depending on location and environment.",
      },
      {
        question: "What cleaning solutions do you use?",
        answer:
          "We use dawn dish soap, and other window cleaning soaps as needed. Water fed pole is what we normally use to clean exterior windows.",
      },
      {
        question: "Do you clean screens and tracks as well?",
        answer:
          "Yes, our comprehensive window cleaning service includes cleaning the glass, screens, tracks, and frames to ensure your windows are completely clean.",
      },
      {
        question: "Do you warranty your window cleaning?",
        answer:
          "Yes, we ensure your windows will be clean up to a month. If your exterior windows become dirty within a month of your window cleaning, we will become back and clean them for free.",
      },
    ],
  },
  {
    category: "Gutter Cleaning",
    questions: [
      {
        question: "How often should gutters be cleaned?",
        answer:
          "Gutters should be cleaned at least twice a year - typically in spring and fall. However, if you have many trees near your home, you may need more frequent cleaning.",
      },
      {
        question: "What happens if I don't clean my gutters?",
        answer:
          "Clogged gutters can lead to water damage, foundation problems, roof damage, and create perfect conditions for pest infestations. Regular maintenance prevents these costly issues.",
      },
      {
        question: "What does gutter cleaning include?",
        answer:
          "Gutter cleaning includes removing all debris from the gutters, cleaning and inspecting all down spoutes and rising the gutters out.",
      },
    ],
  },
  {
    category: "Christmas Light Installation",
    questions: [
      {
        question: "When do you start booking holiday light installations?",
        answer:
          "We begin booking installations in early september and recommend scheduling early as spots fill up quickly for the holiday season.",
      },
      {
        question: "Do you provide the lights or do I need to supply them?",
        answer:
          "We can work with either option. We offer professional-grade LED lights for purchase or rental, or we can install your existing lights.",
      },
      {
        question: "When do you take down the lights?",
        answer:
          "We typically schedule removal in January, but we can accommodate your preferred timeline. Give us a call when your ready to take down your lights, and we will take care of it.",
      },
    ],
  },
  {
    category: "Power Washing",
    questions: [
      {
        question: "What surfaces can be power washed?",
        answer:
          "We can safely power wash driveways, sidewalks, decks, patios, fences, siding, and more. Our technicians adjust the pressure based on the surface material.",
      },
      {
        question: "Is power washing safe for all home exteriors?",
        answer:
          "While many surfaces can be safely power washed, some materials require soft washing or alternative cleaning methods. We'll assess your property and recommend the most appropriate cleaning method.",
      },
      {
        question: "How long does power washing take?",
        answer:
          "The duration varies depending on the size of the area and level of dirt/stains. Most residential jobs can be completed in 2-4 hours.",
      },
    ],
  },
  {
    category: "Other Services & General Questions",
    questions: [
      {
        question: "Do you offer solar panel cleaning?",
        answer:
          "Yes, we offer solar panel cleaning, please contact us for a free quote.",
      },
      {
        question: "Are you licensed and insured?",
        answer:
          "Yes, we are fully licensed, bonded, and insured. We carry comprehensive liability insurance and workers' compensation to protect both our clients and employees.",
      },
      {
        question: "Do you offer free estimates?",
        answer:
          "Yes, we provide free estimates for all our services. However, Any clients requesting in-person quotes outside of polk county will be a charged a 25$ non-refundable quote fee.",
      },
      {
        question: "What areas do you service?",
        answer:
          "We service the greater central florida area within a 35 mile radius.",
      },
      {
        question: "Do you offer any discounts or package deals?",
        answer:
          "Yes, we offer discounted rates for some services recurring clients",
      },
    ],
  },
];

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return faqData;

    const query = searchQuery.toLowerCase();
    return faqData
      .map((section) => ({
        category: section.category,
        questions: section.questions.filter(
          (item) =>
            item.question.toLowerCase().includes(query) ||
            item.answer.toLowerCase().includes(query)
        ),
      }))
      .filter((section) => section.questions.length > 0);
  }, [searchQuery]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h1>

      <div className="relative mb-8">
        <Input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      {filteredSections.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No questions found matching your search.
          </p>
        </div>
      ) : (
        filteredSections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{section.category}</h2>
            <Accordion type="single" collapsible className="w-full">
              {section.questions.map((item, qIndex) => (
                <AccordionItem key={qIndex} value={`item-${index}-${qIndex}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))
      )}

      <div className="mt-8 p-6 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Still Have Questions?</h3>
        <p className="mb-4">
          Don't hesitate to reach out to our customer service team. We're here
          to help!
        </p>
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" />
              <p>Phone: 863-712-1858</p>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              <p>Email: contact@centralwindowfloridacleaner.com</p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <p>Hours: Monday-Sunday, 8am-6pm</p>
            </div>
          </div>
          <Link
            to="/contact"
            className="bg-orange-500 quote-button hover:bg-orange-400 text-white px-8 py-3 rounded text-lg font-medium inline-block"
          >
            Contact Us Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
