import React, {Component} from 'react';
import {Elements} from 'react-stripe-elements';
import CheckoutManager from './CheckoutManager';

class StoreCheckout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Elements>
        <CheckoutManager productId={this.props.selectedProductId} productType={this.props.selectedProductType} />
      </Elements>
    );
  }
}

export default StoreCheckout;