import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How often should I visit the dentist?",
    answer:
      "It is recommended to visit the dentist every six months for a regular check-up and cleaning.",
  },
  {
    question: "What should I do in a dental emergency?",
    answer:
      "Contact your dentist immediately. If unavailable, go to the nearest emergency room.",
  },
  {
    question: "Do you offer services for kids?",
    answer:
      "Yes, we provide pediatric dental services tailored for children of all ages.",
  },
  {
    question: "What are my options for replacing missing teeth?",
    answer:
      "Options include dental implants, bridges, and dentures. Consult your dentist to find the best solution for you.",
  },
  {
    question: "Is teeth whitening safe?",
    answer:
      "Yes, when performed under professional supervision, teeth whitening is a safe procedure.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h4 className=" text-blue-600 font-bold text-md lg:text-lg sm:text-base mb-2 text-left">
            EVERYTHING YOU NEED TO KNOW 
          </h4>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1d42] leading-tight">
            Frequently Asked <br className="hidden sm:block" /> Questions
          </h2>
        </motion.div>

        <motion.div
          className="bg-white lg:p-4 md:p-6 rounded-2xl shadow-sm"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {faqs.map((faq, index) => (
            <div key={index} className="border-b">
              <button
                onClick={() => toggle(index)}
                className="w-full text-left flex justify-between items-center pb-8 text-[#0a1d42] font-medium text-base sm:text-lg"
              >
                {faq.question}
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-500 ease-out transform ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="pb-4 text-gray-600 text-sm sm:text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
