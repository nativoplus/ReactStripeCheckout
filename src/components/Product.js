import React, {Component} from 'react';
import '../css/Product.css';

class Product extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <li onClick={this.props.changeActiveProduct.bind(this, this.props.id)} className={this.props.isSelected ? 'list-group-item d-flex justify-content-between align-items-center active' : 'list-group-item d-flex justify-content-between align-items-center mouse-pointer'}>
            <div className="flex-column">
                {this.props.name}                                            
                <p><small>sold by NativoPlus</small></p>
            </div>
            <span className="badge badge-info badge-pill">{this.props.type}</span>
        </li>
    );
  }
}

export default Product;