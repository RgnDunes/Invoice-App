const Customer = ({ customersData, setCustomers }) => {
  const [newCustomerShow, setNewCustomerShow] = React.useState(false);
  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleformSubmit = (e) => {
    e.preventDefault();
    fetch("https://rzp-training.herokuapp.com/team2/customers", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        contact: contact,
        email: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log());

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    let todaysDate = new Date(today);
    let timestamp =
      Date.UTC(todaysDate.getFullYear(), todaysDate.getMonth() + 1, 0) / 1000;
    let val = {
      name: name,
      contact: contact,
      email: email,
      created_at: timestamp,
    };
    setCustomers(val);
    setNewCustomerShow(!newCustomerShow);
  };

  const timestampConversion = (timestamp) => {
    var months = new Array(
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    );
    var mmddyyyy = new Date(timestamp * 1000).toLocaleDateString("en-US");
    var dateList = mmddyyyy.split("/");
    var _date =
      dateList[1].toString() +
      " " +
      months[parseInt(dateList[0]) - 1] +
      " " +
      dateList[2];
    return _date;
  };

  return (
    <div class="customer">
      {newCustomerShow && (
        <div class="customer__form">
          <h1>New Customer</h1>
          <form action="#">
            <div class="customer__formLineOne">
              <div class="customer__formName">
                <label for="name">Name</label>
                <input
                  type="text"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div class="customer__formPhone">
                <label for="contact">Contact</label>
                <input
                  type="tel"
                  id="contact"
                  onChange={(e) => setContact(e.target.value)}
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                />
              </div>
            </div>
            <div class="customer__formLineTwo">
              <div class="customer__formEmail">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <input
                type="submit"
                onClick={(e) => handleformSubmit(e)}
                value="💾 Save Customer"
              />
            </div>
          </form>
        </div>
      )}
      {!newCustomerShow && (
        <>
          <div class="customer__header">
            <h1>Customers</h1>
            <button onClick={() => setNewCustomerShow(!newCustomerShow)}>
              + New Customer
            </button>
          </div>
          <div class="customer__content">
            {customersData.length > 0 ? (
              <table class="customer__table">
                <tr>
                  <th>NAME</th>
                  <th>CONTACT</th>
                  <th>EMAIL</th>
                  <th>DATE</th>
                </tr>
                {customersData.map((customerData) => (
                  <tr key={customerData["id"]}>
                    <td>{customerData["name"]}</td>
                    <td>{customerData["contact"]}</td>
                    <td>{customerData["email"]}</td>
                    <td>{timestampConversion(customerData["created_at"])}</td>
                  </tr>
                ))}
              </table>
            ) : (
              <Loader />
            )}
          </div>
        </>
      )}
    </div>
  );
};
