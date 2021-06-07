const Item = ({ itemsData, setItems }) => {
  const [newItemShow, setNewItemShow] = React.useState(false);
  const [name, setName] = React.useState("");
  const [amount, setPrice] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleformSubmit = (e) => {
    e.preventDefault();
    fetch("https://rzp-training.herokuapp.com/team2/items", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        description: description,
        amount: amount,
        currency: "INR",
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
      description: description,
      amount: amount,
      created_at: timestamp,
    };
    setItems(val);
    setNewItemShow(!newItemShow);
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
    <div class="item">
      {newItemShow && (
        <div class="item__form">
          <h1>New Item</h1>
          <form action="#">
            <div class="item__formName">
              <label for="name">Name</label>
              <input
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="item__formPrice">
              <label for="amount">Amount</label>
              <input
                type="text"
                id="amount"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div class="item__formDesc">
              <label for="description">Description</label>
              <textarea
                id="description"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <input
              type="submit"
              onClick={(e) => handleformSubmit(e)}
              value="💾 Save Item"
            />
          </form>
        </div>
      )}
      {!newItemShow && (
        <>
          <div class="item__header">
            <h1>Items</h1>
            <button onClick={() => setNewItemShow(!newItemShow)}>
              + New Item
            </button>
          </div>
          <div class="item__content">
            {itemsData.length > 0 ? (
              <table class="item__table">
                <tr>
                  <th>NAME</th>
                  <th>DESCRIPTION</th>
                  <th>AMOUNT</th>
                  <th>ADDED ON</th>
                </tr>
                {itemsData.map((itemData) => (
                  <tr key={itemData["id"]}>
                    <td>{itemData["name"]}</td>
                    <td>{itemData["description"]}</td>
                    <td>₹{itemData["amount"]}</td>
                    <td>{timestampConversion(itemData["created_at"])}</td>
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
