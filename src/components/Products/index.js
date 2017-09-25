import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { productsSelector } from '../../store/profile';
import Products from './Products';

const productList = [{
  name: 'Analytics',
  moduleId: 'api2',
  description: 'Discover game-changing insights within the billions of conversations happening online very day.',
  imageUrl: '/assets/product-images/analytics.svg',
  launchUrl: 'https://analytics.brandwatch.com',
  moreInfoUrl: 'https://www.brandwatch.com/brandwatch-analytics/',
}, {
  name: 'Audiences',
  moduleId: 'audiences',
  description: 'Great marketing starts with understanding your audience. Learn what\'s important to them.',
  imageUrl: '/assets/product-images/audiences.svg',
  launchUrl: 'https://audiences.brandwatch.com',
  moreInfoUrl: 'https://www.brandwatch.com/audiences/',
}, {
  name: 'Vizia',
  moduleId: 'vizia',
  description: 'Awaken and illuminate your business stories. Put them in front of anyone, anywhere. No barriers.',
  imageUrl: '/assets/product-images/vizia.svg',
  launchUrl: 'https://enterprise.vizia.brandwatch.com/',
  moreInfoUrl: 'https://www.brandwatch.com/vizia/',
}];

export const productListSelector = createSelector(
  productsSelector,
  (products) => productList
    .map((product) => ({ ...product, hasProduct: Boolean(products[product.moduleId]) }))
    .sort((a, b) => a.hasProduct === b.hasProduct
      ? a.name.localeCompare(b.name)
      : b.hasProduct - a.hasProduct
    ),
);

const mapStateToProps = (state) => ({
  products: productListSelector(state),
});

export default connect(mapStateToProps, {})(Products);
