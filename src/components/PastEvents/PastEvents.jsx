import React from "react";



const PastEvents = () => {
    const pastEventsData = [
  {
    id: 1,
    image: "https://cdn-az.allevents.in/events7/banners/e2b0582fea6103252e87c131f5b1b3a919c8102c962f57e4b9332a091b442ca4-rimg-w819-h546-dcd5d3d8-gmir.jpg?v=1730761623", // Replace with actual dental image
    title: "Smile Makeover Seminar",
    description:
      "An in-depth session on cosmetic dentistry techniques for enhancing smiles using modern procedures.",
  },
  {
    id: 2,
    image: "https://web.inmobicdn.net/website/website/6.0.1/ui/uploads/resources/case-study/LP_Header_Image_1.jpg", // Replace with actual dental image
    title: "Oral Hygiene Awareness Drive",
    description:
      "Community outreach program promoting proper brushing techniques and preventive dental care habits.",
  },
  {
    id: 3,
    image: "https://www.sproutpediatricdentistry.com/wp-content/uploads/2024/02/01-Learn-if-Dental-Sedation-1.jpg", // Replace with actual dental image
    title: "Pediatric Dental Camp",
    description:
      "Specialized event for children's dental check-ups, education, and introducing friendly dental care.",
  },
  
];
  return (
    <div className="w-full  bg-blue-50">
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl  mb-8 text-blue-600 font-semibold ">Past Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pastEventsData.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-xl shadow hover:shadow-md transition-shadow duration-300"
          >
            <img
              src={event.image}
              alt={event.title}
              className="rounded-t-xl w-full h-56 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {event.title}
              </h3>
              <p className="text-sm text-slate-600">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
};

export default PastEvents;
