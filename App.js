class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCustomer: true,
      showItem: false,
      showInvoice: false,
      customers: [],
      items: [],
      invoices: [],
    };

    this.customerRoute = this.customerRoute.bind(this);
    this.itemRoute = this.itemRoute.bind(this);
    this.invoiceRoute = this.invoiceRoute.bind(this);
    this.setCustomers = this.setCustomers.bind(this);
    this.setItems = this.setItems.bind(this);
    this.setInvoices = this.setInvoices.bind(this);
  }

  setCustomers(val) {
    this.setState({ customers: [val, ...this.state.customers] });
  }

  setItems(val) {
    this.setState({ items: [val, ...this.state.items] });
  }

  setInvoices(val) {
    this.setState({ invoices: [val, ...this.state.invoices] });
  }

  // fetchCustomers() {
  //   fetch("https://rzp-training.herokuapp.com/team2/customers")
  //     .then((response) => response.json())
  //     .then((json) => {
  //       this.setState({ customers: json["items"] });
  //     });
  // }

  // fetchItems() {
  //   fetch("https://rzp-training.herokuapp.com/team2/items")
  //     .then((response) => response.json())
  //     .then((json) => {
  //       this.setState({ items: json["items"] });
  //     });
  // }

  // fetchInvoices() {
  //   fetch("https://rzp-training.herokuapp.com/team2/invoices")
  //     .then((response) => response.json())
  //     .then((json) => {
  //       this.setState({ invoices: json["items"] });
  //     });
  // }

  componentDidMount() {
    fetch("https://rzp-training.herokuapp.com/team2/customers")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ customers: json["items"] });
      });
    fetch("https://rzp-training.herokuapp.com/team2/items")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ items: json["items"] });
      });
    fetch("https://rzp-training.herokuapp.com/team2/invoices")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ invoices: json["items"] });
      });
    // this.fetchCustomers();
    // this.fetchItems();
    // this.fetchInvoices();
  }

  customerRoute() {
    this.setState({ showCustomer: true });
    this.setState({ showItem: false });
    this.setState({ showInvoice: false });
  }

  itemRoute() {
    this.setState({ showCustomer: false });
    this.setState({ showItem: true });
    this.setState({ showInvoice: false });
  }

  invoiceRoute() {
    this.setState({ showCustomer: false });
    this.setState({ showItem: false });
    this.setState({ showInvoice: true });
  }

  render() {
    return (
      <div className="body">
        <div class="container">
          <div class="left">
            <h1
              class={this.state.showCustomer && "selected"}
              onClick={this.customerRoute}
            >
              👨‍👧 Customers
            </h1>
            <h1
              class={this.state.showItem && "selected"}
              onClick={this.itemRoute}
            >
              ★ Items
            </h1>
            <h1
              class={this.state.showInvoice && "selected"}
              onClick={this.invoiceRoute}
            >
              📄 Invoices
            </h1>
          </div>
          <div class="right">
            {this.state.showCustomer && (
              <Customer
                customersData={this.state.customers}
                setCustomers={this.setCustomers}
              />
            )}
            {this.state.showItem && (
              <Item itemsData={this.state.items} setItems={this.setItems} />
            )}
            {this.state.showInvoice && (
              <Invoice
                invoicesData={this.state.invoices}
                itemsData={this.state.items}
                customersData={this.state.customers}
                setInvoices={this.setInvoices}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
