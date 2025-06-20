import React,{useState,useEffect} from "react";
import Countdown from "../../components/Countdown/Countdown";
import Header from "../../components/Header/Header";
import UpcomingEvents from "../../components/UpcomingEvents/UpcomingEvents";
import PastEvents from "../../components/PastEvents/PastEvents";
import JoinUs from "../../components/JoinUs/JoinUs";
import { fetchEvents } from "../../redux/features/eventSlice/eventSlice";
import { useDispatch,useSelector } from "react-redux";


const Events = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.event);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
 dispatch(fetchEvents());

  }, [dispatch]);

  console.log(events);

  useEffect(() => {
    if (events.length > 0) {
      setUpcomingEvents(events.filter((event) =>
        // new Date(event.date) > new Date()
      event.eventType==="Upcoming Event"
      ));

      setPastEvents(events.filter((event) =>
        // new Date(event.date) <= new Date()
      event.eventType==="Past Event"
      ));
    }
  }, [events]);

  return (
    <div>
      <Header
        title={`Join Us for Our Latest Events`}
        image={`https://medicushcs.com/hubfs/Doctors%20Day%20Blog.png`}
      />
      <Countdown />
      <UpcomingEvents upcomingEventsData={upcomingEvents}/>
      <PastEvents pastEventsData={pastEvents} />
      <JoinUs/>
    </div>
  );
};

export default Events;
