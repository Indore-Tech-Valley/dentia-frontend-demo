import React from 'react';
import Header from '../../pages/Header/Header';

const TermsConditions = () => {
  return (
    <div className="w-full min-h-screen bg-white text-gray-800">
      {/* Header Section */}
      <Header
        image={`https://kdahweb-static.kokilabenhospital.com/kdah-2019/product/Medical%20Staff%20%20Doctors.JPG`}
        title={`Terms & Conditions`}
      />

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p className="mb-6 text-base">
          Welcome to our dental care website. By using this site, booking appointments, or accessing our services, you agree to comply with the following terms and conditions. Please review them carefully.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">1. Scope of Services</h2>
          <p className="text-base leading-relaxed">
            Our website provides information about our dental services, appointment scheduling, patient education, and other related content. It is intended for informational purposes only and does not replace professional dental advice or diagnosis.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">2. Medical Disclaimer</h2>
          <p className="text-base leading-relaxed">
            All content provided on this website is for general information. It should not be treated as a substitute for professional consultation, diagnosis, or treatment from a licensed dental professional. Always consult your dentist for any medical concerns.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">3. Appointment & Cancellations</h2>
          <p className="text-base leading-relaxed mb-2">
            Patients are responsible for:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>Providing accurate personal and medical information during appointment booking.</li>
            <li>Notifying the clinic in advance in case of appointment cancellations or changes.</li>
            <li>Arriving on time to ensure smooth scheduling for all patients.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">4. Website Modifications</h2>
          <p className="text-base leading-relaxed">
            We reserve the right to update or modify the content, features, or terms of this website at any time without prior notice. Continued use of the site after changes indicates acceptance of those changes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2">5. Contact Us</h2>
          <p className="text-base leading-relaxed">
            For any questions or concerns regarding these terms, feel free to contact us at{' '}
            <span className="text-blue-600 font-medium">info@yourdentalclinic.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsConditions;
