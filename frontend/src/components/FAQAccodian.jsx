import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does this platform work?",
    answer:
      "Recruiters can create tasks, candidates solve them, and everything is reviewed in one place with ease.",
  },
  {
    question: "Can I track submissions in real-time?",
    answer:
      "Yes, all candidate submissions are tracked in real-time and can be reviewed directly from your dashboard.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Absolutely! You can try out the platform for free before deciding on a paid plan.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-8 px-6 max-w-3xl mx-auto font-chewy">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 text-left font-medium text-lg"
            >
              {faq.question}
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="p-4 pt-0 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
