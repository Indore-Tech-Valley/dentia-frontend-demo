import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "../features/appointmentSlice/appointmentSlice";
import contactReducer from "../features/contactSlice/contactSlice";
import feedbackReducer from "../features/feedbackSlice/feedbackSlice";
import newsletterReducer from "../features/newsletterSlice/newsletterSlice";
import faqReducer from "../features/faqSlice/faqSlice";
import testimonialReducer from "../features/testimonialSlice/testimonialSlice";
import serviceReducer from "../features/servicesSlice/servicesSlice";
import eventReducer from "../features/eventSlice/eventSlice";
import doctorReducer from "../features/doctorSlice/doctorSlice"; // Uncomment if you have a doctor slice
import adminReducer from "../features/adminSlice/adminSlice"; // Uncomment if you have an admin slice
import websiteReducer from "../features/websiteSlice/websiteSlice"; // Uncomment if you have a website slice
import patientsReducer from "../features/patientSlice/patientSlice"
import notificationReducer from "../features/notificationSlice/notificationSlice"
import reportsReducer from "../features/reportsSlice/reportsSlice"
import dashboardreducer from "../features/dashboardSummarySlice/dashboardSummarySlice"

export const store = configureStore({
  reducer: {
    appointment: appointmentReducer,
    contact: contactReducer,
    feedback: feedbackReducer,
    newsletter: newsletterReducer,
    faq: faqReducer,
    testimonial: testimonialReducer,
    service: serviceReducer,
    event: eventReducer,
    doctor: doctorReducer,
    admin: adminReducer, 
    website: websiteReducer,
    patients: patientsReducer,
    notification: notificationReducer,
    reports: reportsReducer,
    dashboard: dashboardreducer,

  },
});

export default store;