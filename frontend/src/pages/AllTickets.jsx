import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllTickets, reset } from "../features/tickets/ticketsSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import SingleTicket from "../components/SingleTicket";

const AllTickets = () => {
  const dispatch = useDispatch();
  const { tickets, isPending, isSuccess, isError } = useSelector(
    (state) => state.tickets
  );

  // Bring the Data after The <MOUNT>
  useEffect(() => {
    dispatch(getAllTickets());
  }, [dispatch]);

  // Clear after <UNMOUNT>

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess, isError]);

  if (isPending) {
    return <Spinner />;
  }
  return (
    <>
      <BackButton url="/" />
      <h1>All Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => {
          return <SingleTicket key={ticket._id} ticket={ticket} />;
        })}
      </div>
    </>
  );
};

export default AllTickets;
