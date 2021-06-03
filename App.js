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
  }

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
              Customers
            </h1>
            <h1
              class={this.state.showItem && "selected"}
              onClick={this.itemRoute}
            >
              Items
            </h1>
            <h1
              class={this.state.showInvoice && "selected"}
              onClick={this.invoiceRoute}
            >
              Invoices
            </h1>
          </div>
          <div class="right">
            {this.state.showCustomer && (
              <Customer customersData={this.state.customers} />
            )}
            {this.state.showItem && <Item itemsData={this.state.items} />}
            {this.state.showInvoice && (
              <Invoice
                invoicesData={this.state.invoices}
                itemsData={this.state.items}
                customersData={this.state.customers}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
