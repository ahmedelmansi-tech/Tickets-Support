import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { reset, createNewTicket } from "../features/tickets/ticketsSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
const NewTicket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // best way to prevent unused rerenders
  const { user } = useSelector((state) => state.auth);
  const { name, email } = user;

  const [product, setProduct] = useState(" ");
  const [description, setDescription] = useState("");

  const { isPending, isSuccess, messsage, isError } = useSelector(
    (state) => state.tickets
  );

  useEffect(() => {
    if (isError) {
      toast.error(messsage);
    }

    if (isSuccess) {
      navigate("/tickets");
      dispatch(reset());
    }
  }, [isError, messsage, isSuccess, dispatch, isPending, navigate]);

  const submitAction = (e) => {
    e.preventDefault();

    dispatch(createNewTicket({ product, description }));
  };

  if (isPending) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create New Ticket </h1>
        <p>Please Fill in the Form Below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input
            type="text"
            className="form-control"
            disabled
            name="name"
            value={name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input
            type="email"
            className="form-control"
            disabled
            name="email"
            value={email}
          />
        </div>

        <form onSubmit={submitAction}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iphone">iphone</option>
              <option value="Macbook">Macbook</option>
              <option value="iPad">iPad</option>
              <option value="iMac">iMac</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea
              name="description"
              id="description"
              value={description}
              className="form-control"
              placeholder="descript the issue"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewTicket;
