import { productListSelector } from './';

describe('Products', () => {
  describe('productListSelector', () => {
    test('sorting products list', () => {
      const products = productListSelector({
        profile: {
          products: {
            api2: false,
            audiences: true,
            vizia: true,
          },
        },
      });

      expect(products[0].moduleId).toBe('audiences');
      expect(products[0].hasProduct).toBe(true);
      expect(products[1].moduleId).toBe('vizia');
      expect(products[1].hasProduct).toBe(true);
      expect(products[2].moduleId).toBe('api2');
      expect(products[2].hasProduct).toBe(false);
    });
  });
});
