import React from 'react';
import Header from '../../pages/Header/Header';

const PrivacyPolicy = () => {
  return (
    <div className="w-full min-h-screen bg-white text-gray-800">
      {/* Header Section */}
      <Header
        image={`https://kdahweb-static.kokilabenhospital.com/kdah-2019/product/Medical%20Staff%20%20Doctors.JPG`}
        title={`Privacy Policy`}
      />

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p className="mb-6 text-base">
          At our dental clinic, protecting your personal information is a top priority. This Privacy Policy explains how we collect, use, and safeguard your data.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">1. Information We Collect</h2>
          <p className="text-base leading-relaxed">
            We collect personal details such as your name, contact information, medical history, and appointment records when you register or consult with us. We also gather anonymized data to improve our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">2. Use of Information</h2>
          <p className="text-base leading-relaxed">
            Your information is used solely to provide and enhance dental care, manage appointments, communicate important updates, and comply with healthcare regulations. We do not share your data with unauthorized third parties.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">3. Data Security</h2>
          <p className="text-base leading-relaxed">
            We employ strict technical and organizational measures to protect your personal and medical information against unauthorized access, loss, or misuse.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">4. Cookies and Tracking</h2>
          <p className="text-base leading-relaxed">
            Our website uses cookies to enhance your browsing experience and analyze traffic. You can control cookie preferences through your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">5. Third-Party Services</h2>
          <p className="text-base leading-relaxed">
            We may use trusted third-party providers for services like appointment scheduling or analytics, each governed by their own privacy policies. We recommend reviewing their terms as well.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2">6. Contact Us</h2>
          <p className="text-base leading-relaxed">
            If you have any questions about our privacy practices, please contact us at{' '}
            <span className="text-blue-600 font-medium">privacy@yourdentalclinic.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
