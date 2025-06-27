
import React,{useState,useEffect} from "react";
import { Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import MessageModal from "../MessageModal/MessageModal";
import { createAppointment } from "../../redux/features/appointmentSlice/appointmentSlice";

const Appointment = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
  service: "",
  date:"",
  time: "",
  name: "",
  email: "",
  phone: "",
  message: ""
});

  const { loading, error } = useSelector((state) => state.appointment);

  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const openModal = (type, message) => {
    setModal({ show: true, type, message });
  };

  const closeModal = () => setModal({ ...modal, show: false });



const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  // console.log("Submitting:", formData);

  try {
    const resultAction = await dispatch(createAppointment(formData));
    if (createAppointment.fulfilled.match(resultAction)) {
      // console.log(resultAction);
      openModal("success", resultAction.payload.message || "Appointment booked successfully!");
      setFormData({
        service: "",
        date: "",
        time: "",
        name: "",
        email: "",
        phone: "",
        message: ""
      });
    } else {
      // console.log(resultAction.payload)
      openModal("error", resultAction.payload || "Failed to book appointment");
    }
  } catch (err) {
    // console.error(err);
    openModal("error", "An error occurred while booking the appointment.");
  }
};

  return (
    <section className="max-w-7xl mx-auto px-6 lg:py-24 py-12">
          {modal.show && (
        <MessageModal type={modal.type} message={modal.message} onClose={closeModal} />
      )}
      <div className="md:flex md:items-start md:gap-8">
        {/* Left: Form */}
        <div className="md:w-1/2 bg-white rounded-2xl p-6 shadow min-h-[480px] flex flex-col justify-between lg:h-[698px] md:h-[758px] sm:h-full">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1d42] leading-tight">
                Book Your Appointment
              </h2>
            </div>
            <p className="mb-8 max-w-md text-gray-500 text-base sm:text-lg">
              Book your appointment today for expert dental care tailored to
              your needs. Healthy, beautiful smiles start with a simple step,
              schedule now!
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="service" className="block mb-1 text-gray-700 font-medium">
                  Select Service
                </label>
                <select id="service"
                value={formData.service}
                onChange={handleChange}
                name="service"
                className="w-full border border-gray-300 rounded-md px-4 py-3"
                required
                >
                  <option value={``}>Select Service</option>
                  <option value={`clean`}>Cleaning</option>
                  <option value={`Root`}>Root Canal</option>
                </select>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="date" className="block mb-1 text-gray-700 font-medium">
                    Date
                  </label>
                  <input
                    id="date"
                    name="date"
  type="date"
  value={formData.date}
  onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3"
                    required
                    // defaultValue={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="time" className="block mb-1 text-gray-700 font-medium">
                    Time
                  </label>
                  <select id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-2 py-3"
                  required
                  >
                    <option value={''}>Select Time</option>
                    <option value={'10'}>10:00 AM</option>
                    <option value={'22'}>12:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 min-w-0">
                  <label htmlFor="name" className="block mb-1 text-gray-700 font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Name"
                    className="w-full border border-gray-300 rounded-md px-2 py-3"
                    required
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <label htmlFor="email" className="block mb-1 text-gray-700 font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded-md px-2 py-3"
                    required
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <label htmlFor="phone" className="block mb-1 text-gray-700 font-medium">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full border border-gray-300 rounded-md px-2 py-3"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block mb-1 text-gray-700 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Message"
                  className="w-full border border-gray-300 rounded-md px-2 py-3"
                ></textarea>
              </div>

              <button
   type="submit"
  className="relative group block w-full sm:w-auto text-center bg-blue-600 hover:bg-[#10244b] text-white px-6 py-3 rounded-lg font-semibold text-md overflow-hidden min-w-[160px] h-[44px] transition-colors duration-300 ease-in-out"
  disabled={loading}
>
  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
    Send Appointment
  </span>
  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">
    Send Appointment
  </span>
</button>

            </form>
          </div>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 relative rounded-2xl overflow-hidden shadow lg:h-[698px] md:h-[758px] sm:h-full">
          <img
            src="https://images.pexels.com/photos/6812548/pexels-photo-6812548.jpeg"
            alt="Dentist with kid"
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute bottom-6 left-6 bg-black/60 text-white rounded-xl px-6 py-4 flex items-center gap-4 backdrop-blur-sm shadow-lg">
            <Clock className="w-6 h-6 text-white" />
            <div>
              <p className="font-semibold text-white">Opening Hours</p>
              <p className="text-sm text-white/80">Mon to Sat 08:00 - 20:00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
