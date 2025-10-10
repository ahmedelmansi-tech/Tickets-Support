import { useState } from "react";
import { useSelector } from "react-redux";
const NewTicket = () => {
  const { user } = useSelector((state) => state.auth);
  const { name, email } = user;

  const [product, setProduct] = useState(" ");
  const [description, setDescription] = useState("");

  const submitAction = (e) => {
    e.preventDefault();

    console.log("Submit >");
  };

  return (
    <>
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
