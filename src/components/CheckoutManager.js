import React, {Component} from 'react';
import {CardNumberElement, injectStripe} from 'react-stripe-elements';

class CheckoutManager extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    ev.preventDefault();

    let checkoutItem = {
      quantity: 1
    };
    
    checkoutItem[this.props.productType] = this.props.productId;

    await this.props.stripe
      .redirectToCheckout({
          items: [
              checkoutItem
          ],
          successUrl: window.location.href,
          cancelUrl: window.location.href
      })
      .then(({error}) => {
          console.log('Redirect to checkout error:', error);
      });
  }

  render() {
    return (
      <form className="form-inline my-2 my-lg-0" onSubmit={this.submit}>        
        <button className="btn btn-outline-info my-2 my-sm-0" disabled={this.props.productId === ''} type="submit">Checkout</button>
        <CardNumberElement className="d-none" />
      </form>
    );
  }
}

export default injectStripe(CheckoutManager);