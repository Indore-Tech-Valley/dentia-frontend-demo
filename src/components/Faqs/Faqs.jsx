import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFaqs } from "../../redux/features/faqSlice/faqSlice";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const dispatch = useDispatch();
  const { faqs, loading } = useSelector((state) => state.faq);

  useEffect(() => {
    dispatch(fetchFaqs());
  }, [dispatch]);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 5);

  return (
    <section className="bg-white py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h4 className="text-blue-600 font-bold text-md lg:text-lg sm:text-base mb-2 text-left">
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
          {loading ? (
            <p className="text-center text-gray-500">Loading FAQs...</p>
          ) : (
            <>
              {visibleFaqs.map((faq, index) => (
                <div key={faq._id} className="border-b">
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

              {faqs.length > 5 && (
                <div className="pt-6 text-center">
                  <button
                    onClick={() => setShowAll((prev) => !prev)}
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-[#10244b] transition duration-200"
                  >
                    {showAll ? "Hide FAQs" : "View All FAQs"}
                  </button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
