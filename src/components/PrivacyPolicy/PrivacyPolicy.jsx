import React from 'react';
import Header from '../../pages/Header/Header';

const contentSections = [
  {
    id: 1,
    title: 'Information We Collect',
    text: `We collect personal details such as your name, contact information, medical history, and appointment records when you register or consult with us. We also gather anonymized data to improve our services.`,
  },
  {
    id: 2,
    title: 'Use of Information',
    text: `Your information is used solely to provide and enhance dental care, manage appointments, communicate important updates, and comply with healthcare regulations. We do not share your data with unauthorized third parties.`,
  },
  {
    id: 3,
    title: 'Data Security',
    text: `We employ strict technical and organizational measures to protect your personal and medical information against unauthorized access, loss, or misuse.`,
  },
  {
    id: 4,
    title: 'Cookies and Tracking',
    text: `Our website uses cookies to enhance your browsing experience and analyze traffic. You can control cookie preferences through your browser settings.`,
  },
  {
    id: 5,
    title: 'Third-Party Services',
    text: `We may use trusted third-party providers for services like appointment scheduling or analytics, each governed by their own privacy policies. We recommend reviewing their terms as well.`,
  },
  {
    id: 6,
    title: 'Contact Us',
    text: (
      <>
        If you have any questions about our privacy practices, please contact us at{' '}
        <span className="text-blue-600 font-medium">@trustdentalclinic</span>.
      </>
    ),
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="w-full min-h-screen bg-white text-gray-800">
      {/* Header Section */}
      <Header
        image="https://kdahweb-static.kokilabenhospital.com/kdah-2019/product/Medical%20Staff%20%20Doctors.JPG"
        title="Privacy Policy"
      />

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p className="mb-6  text-gray-500 text-base sm:text-lg">
          At our dental clinic, protecting your personal information is a top priority. This Privacy Policy explains how we collect, use, and safeguard your data.
        </p>

        {contentSections.map(({ id, title, text }) => (
          <section key={id} className="mb-8">
            <h2 className="text-xl font-bold mb-2">{id}. {title}</h2>
            <p className="leading-relaxed  text-gray-500 text-base sm:text-lg">{text}</p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
