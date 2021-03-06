import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { ProgressInfinite } from 'bw-axiom';
import { App } from './App';
import Products from '../Products';

const render = (props, context) => shallow(<App { ...props } />, {
  context,
  lifecycleExperimental: true,
});

describe('App', () => {
  let props;
  let context;

  beforeEach(() => {
    context = {
      i18n: { language: 'en' },
      brandwatchAuthGetProfile: sinon.stub().resolves(),
    };
    props = {
      firstName: undefined,
      t: sinon.stub().returns('translated-text'),
      onInitializeFeatures: sinon.stub(),
      onProfileReceived: sinon.stub(),
    };
  });

  describe('when mounted', () => {
    it('fetches profile', () => {
      render(props, context);
      expect(context.brandwatchAuthGetProfile.calledOnce).toBe(true);
    });
  });

  describe('on render', () => {
    describe('with profile', () => {
      it('shows products list', () => {
        props.firstName = 'Lorem';
        const component = render(props, context);
        expect(component.find(Products).length).toBe(1);
        expect(component.find(ProgressInfinite).length).toBe(0);
      });
    });

    describe('without profile', () => {
      it('shows progress', () => {
        props.firstName = undefined;
        const component = render(props, context);
        expect(component.find(Products).length).toBe(0);
        expect(component.find(ProgressInfinite).length).toBe(1);
      });
    });
  });
});
