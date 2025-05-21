import React from 'react';
import Header from '../../pages/Header/Header';

const content = {
  intro:
    'Welcome to our dental care website. By using this site, booking appointments, or accessing our services, you agree to comply with the following terms and conditions. Please review them carefully.',
  sections: [
    {
      id: 1,
      title: 'Scope of Services',
      text:
        'Our website provides information about our dental services, appointment scheduling, patient education, and other related content. It is intended for informational purposes only and does not replace professional dental advice or diagnosis.',
    },
    {
      id: 2,
      title: 'Medical Disclaimer',
      text:
        'All content provided on this website is for general information. It should not be treated as a substitute for professional consultation, diagnosis, or treatment from a licensed dental professional. Always consult your dentist for any medical concerns.',
    },
    {
      id: 3,
      title: 'Appointment & Cancellations',
      text: `Patients are responsible for:
- Providing accurate personal and medical information during appointment booking.
- Notifying the clinic in advance in case of appointment cancellations or changes.
- Arriving on time to ensure smooth scheduling for all patients.`,
    },
    {
      id: 4,
      title: 'Website Modifications',
      text:
        'We reserve the right to update or modify the content, features, or terms of this website at any time without prior notice. Continued use of the site after changes indicates acceptance of those changes.',
    },
    {
      id: 5,
      title: 'Contact Us',
      text: 'For any questions or concerns regarding these terms, feel free to contact us at info@yourdentalclinic.com.',
    },
  ],
};

const TermsConditions = () => {
  return (
    <div className="w-full min-h-screen bg-white text-gray-800">
      {/* Header Section */}
      <Header
        image="https://kdahweb-static.kokilabenhospital.com/kdah-2019/product/Medical%20Staff%20%20Doctors.JPG"
        title="Terms & Conditions"
      />

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p className="mb-6 text-base">{content.intro}</p>

        {content.sections.map(({ id, title, text }) => (
          <section key={id} className="mb-8">
            <h2 className="text-xl font-bold mb-2">{id}. {title}</h2>
            {id === 3 ? (
              <div className="tleading-relaxed text-gray-500 text-base sm:text-lg">
                <p className="mb-2">Patients are responsible for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  {text.split('\n').map((line, idx) => (
                    <li key={idx}>{line.replace(/^- /, '')}</li>
                  ))}
                </ul>
              </div>
            ) : id === 5 ? (
              <p className=" leading-relaxed text-gray-500 text-base sm:text-lg">
                For any questions or concerns regarding these terms, feel free to contact us at{' '}
                <span className="text-blue-600 font-medium">@trustdentalclinic</span>.
              </p>
            ) : (
              <p className=" leading-relaxed  text-gray-500 text-base sm:text-lg">{text}</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default TermsConditions;
