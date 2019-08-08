import React, {Component} from 'react';
import {StripeProvider} from 'react-stripe-elements';
import ProductsList from './components/ProductsList';
import StoreCheckout from './components/StoreCheckout';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedProductId: '',
        selectedProductType: ''
    };
    this.changeSelectedProduct = this.changeSelectedProduct.bind(this);
  }

  changeSelectedProduct(productId, productType) {
      console.log(productId);
      console.log(productType);
      this.setState({
          selectedProductId: productId,
          selectedProductType: productType
      });
  }

  render() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
                <a className="navbar-brand">React Stripe Checkout POC</a>
                <StripeProvider apiKey="pk_test_3sQiyHWEE1YA5kfXtzjPN7hZ00eViUbM3d">
                    <StoreCheckout selectedProductId={this.state.selectedProductId} selectedProductType={this.state.selectedProductType} />
                </StripeProvider>  
            </nav>
            <div className="container text-center">
                <h1 className="mb-5">Products List</h1>
                <ProductsList productChange={this.changeSelectedProduct} />
            </div>
        </div>
    );
  }
}

export default App;