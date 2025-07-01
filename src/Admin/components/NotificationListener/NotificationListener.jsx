// NotificationListener.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { socket } from "../../../socket"; // adjust the path
import { addNotification } from "../../../redux/features/notificationSlice/notificationSlice";

const NotificationListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Listen to real-time notifications
    socket.on("new-notification", (data) => {
      dispatch(addNotification(data));
    });

    return () => {
      socket.off("new-notification"); // Cleanup on unmount
    };
  }, [dispatch]);

  return null; // No UI
};

export default NotificationListener;
