import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import {
  getSingleTicket,
  reset,
  closeTicket,
} from "../features/tickets/ticketsSlice";
const Ticket = () => {
  const navigte = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { ticket, isPending, isError, message } = useSelector(
    (state) => state.tickets
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getSingleTicket(id));
  }, [id, isError, message, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (isPending) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>OPs ... Something Went Wrong </h1>;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted : {new Date(ticket.createdAt).toLocaleString("en-US")}
        </h3>
        <h3>Product : {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description Of The Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
      {ticket.status !== "Closed" && (
        <button
          className="btn btn-block btn-danger"
          onClick={() => {
            dispatch(closeTicket(id));
            toast.success("Ticket Closed Successfuly");
            navigte("/tickets");
          }}
        >
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
