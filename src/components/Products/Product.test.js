import React from 'react';
import { shallow } from 'enzyme';
import Product from './Product';
import unitTestSelector from '../../utils/unitTestSelector';

const render = (props, opts = {}) => shallow(<Product { ...props } />, opts);

describe('Product', () => {
  let props;
  let opts;

  beforeEach(() => {
    props = {
      description: 'Lorem',
      hasProduct: false,
      imageUrl: 'http://www.image.com',
      launchUrl: 'http://www.launch.com',
      moreInfoUrl: 'htt[://www.info.com',
      name: 'Ipsum',
    };
    opts = {
      lifecycleExperimental: true,
      context: {
        t: () => { return 'translated-text'; },
      },
    };
  });

  describe('render', () => {
    describe('when has product', () => {
      it('has a launch button', () => {
        props.hasProduct = true;
        expect(render(props, opts).find(unitTestSelector('launch')).length).toBe(1);
        expect(render(props, opts).find(unitTestSelector('more-info')).length).toBe(0);
      });
    });

    describe('when does not have product', () => {
      it('has a more info button', () => {
        props.hasProduct = false;
        expect(render(props, opts).find(unitTestSelector('launch')).length).toBe(0);
        expect(render(props, opts).find(unitTestSelector('more-info')).length).toBe(1);
      });
    });
  });
});
