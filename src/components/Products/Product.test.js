import React from 'react';
import { shallow } from 'enzyme';
import Product from './Product';
import unitTestSelector from '../../utils/unitTestSelector';

const render = (props) => shallow(<Product { ...props } />);

describe('Product', () => {
  let props;

  beforeEach(() => {
    props = {
      description: 'Lorem',
      hasProduct: false,
      imageUrl: 'http://www.image.com',
      launchUrl: 'http://www.launch.com',
      moreInfoUrl: 'htt[://www.info.com',
      name: 'Ipsum',
    };
  });

  describe('render', () => {
    describe('when has product', () => {
      it('has a launch button', () => {
        props.hasProduct = true;
        expect(render(props).find(unitTestSelector('launch')).length).toBe(1);
        expect(render(props).find(unitTestSelector('more-info')).length).toBe(0);
      });
    });

    describe('when does not have product', () => {
      it('has a more info button', () => {
        props.hasProduct = false;
        expect(render(props).find(unitTestSelector('launch')).length).toBe(0);
        expect(render(props).find(unitTestSelector('more-info')).length).toBe(1);
      });
    });
  });
});
