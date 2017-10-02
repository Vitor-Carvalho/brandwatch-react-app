import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Grid, GridCell } from 'bw-axiom';
import Product from './Product';
import './Products.css';

export default class Products extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
      moduleId: PropTypes.string.isRequired,
    })).isRequired,
  };

  render() {
    const { products, ...rest } = this.props;

    return (
      <Grid { ...rest }>
        { products.map(({ moduleId, ...rest }) =>
          <GridCell key={ moduleId } shrink subGrid>
            <Product { ...rest } />
          </GridCell>
        ) }
      </Grid>
    );
  }
}
