import React, {Component} from 'react';
import Product from './Product';

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        products: [],
        plans: [],
        skus: []
    };
    this.productSelected = this.productSelected.bind(this);
  }

  componentDidMount() {
      this.fetchProducts();
      this.fetchPlans();
      this.fetchSKUs();
  }

  fetchProducts() {
    fetch('https://api.stripe.com/v1/products',
    {
        method: 'GET',
        headers: { 'Authorization': 'Bearer sk_test_PNEgOinS4T88bQWuCZ0FRpAF00msMMGdo1' }
    })
    .then(response => response.json())
    .then(parsedJSON => parsedJSON.data.map(product => (
        {
            id: `${product.id}`,
            name: `${product.name}`,
            type: `${product.type}`,
            isSelected: false
        }
    )))
    .then(products => this.setState({
        products,
        isLoading: false
    }))
    .catch(error => console.log('Parsing error in products', error));
  }

  fetchPlans() {
    fetch('https://api.stripe.com/v1/plans',
    {
        method: 'GET',
        headers: { 'Authorization': 'Bearer sk_test_PNEgOinS4T88bQWuCZ0FRpAF00msMMGdo1' }
    })
    .then(response => response.json())
    .then(parsedJSON => parsedJSON.data.map(plan => (
        {
            id: `${plan.id}`,
            product: `${plan.product}`
        }
    )))
    .then(plans => this.setState({
        plans
    }))
    .catch(error => console.log('Parsing error in plans', error));
  }

  fetchSKUs() {
    fetch('https://api.stripe.com/v1/skus',
    {
        method: 'GET',
        headers: { 'Authorization': 'Bearer sk_test_PNEgOinS4T88bQWuCZ0FRpAF00msMMGdo1' }
    })
    .then(response => response.json())
    .then(parsedJSON => parsedJSON.data.map(sku => (
        {
            id: `${sku.id}`,
            product: `${sku.product}`
        }
    )))
    .then(skus => this.setState({
        skus
    }))
    .catch(error => console.log('Parsing error in skus', error));
  }

  productSelected(productId) {
    this.setState({
        products: this.state.products.map(product => {
            if (product.id === productId) {
                product.isSelected = true;
            } else {
                product.isSelected = false;
            }
            return product;
        })
    });

    const plan = this.state.plans.find(x => x.product === productId);
    const sku = this.state.skus.find(x => x.product === productId);

    plan ? this.props.productChange(plan.id, 'plan') : this.props.productChange(sku.id, 'sku');
  }

  render() {
    const { isLoading, products } = this.state;
    const spinerStyle = { width: '3rem', height: '3rem' }
    return (
        <div className="row justify-content-sm-center">
            <div className="col-sm-8">
                {isLoading ? (
                    <div  className="spinner-grow text-info mt-5" style={spinerStyle} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <ul className="list-group">
                        {products.length > 0 ?
                            products.map(product => {
                                const { id, name, type, isSelected } = product;
                                return  <Product key={id} id={id} name={name} type={type} isSelected={isSelected} changeActiveProduct={this.productSelected} />
                            }) : <li>No products found</li>
                        }
                    </ul>
                )}
            </div>
        </div>        
    );
  }
}

export default ProductsList;