import React from 'react';
import { Phone, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const fadeLeft = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const contactItems = [
  {
    id: 1,
    icon: Phone,
    title: "Need Dental Services?",
    info: "Call: +1 123 456 789",
    isLink: false,
  },
  {
    id: 2,
    icon: Clock,
    title: "Opening Hours",
    info: "Mon to Sat 08:00 - 20:00",
    isLink: false,
  },
  {
    id: 3,
    icon: MapPin,
    title: "Our Location",
    info: "123 Smile Street, New York, NY 10001",
    isLink: true,
    href: "https://maps.app.goo.gl/qmG1HRLptUZtWfeC8",
  },
];

const ContactInfo = () => {
  return (
    <div className="w-full bg-[#020968] text-white">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-col lg:flex-row justify-around">
        {contactItems.map(({ id, icon: Icon, title, info, isLink, href }, index) => (
          <React.Fragment key={id}>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {isLink ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 transition-colors duration-200"
                >
                  <Icon className="text-blue-400 w-10 h-10" />
                  <div>
                    <p className="text-lg font-semibold">{title}</p>
                    <p className="text-gray-300">{info}</p>
                  </div>
                </a>
              ) : (
                <div className="flex items-center space-x-4">
                  <Icon className="text-blue-400 w-10 h-10" />
                  <div>
                    <p className="text-lg font-semibold">{title}</p>
                    <p className="text-gray-300">{info}</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Add divider except after the last item */}
            {index !== contactItems.length - 1 && (
              <div className="w-px lg:h-16 h-10 bg-gray-300 opacity-30 my-4 lg:my-0"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ContactInfo;
