import React from "react";
import Countdown from "../Countdown/Countdown";
import Header from "../../pages/Header/Header";
import UpcomingEvents from "../UpcomingEvents/UpcomingEvents";
import PastEvents from "../PastEvents/PastEvents";
import JoinUs from "../JoinUs/JoinUs";

const Events = () => {
  return (
    <div>
      <Header
        title={`Join Us for Our Latest Events`}
        image={`https://medicushcs.com/hubfs/Doctors%20Day%20Blog.png`}
      />
      <Countdown />
      <UpcomingEvents/>
      <PastEvents/>
      <JoinUs/>
    </div>
  );
};

export default Events;
