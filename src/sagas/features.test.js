import sinon from 'sinon';
import launchDarklyClient from 'ldclient-js';
import { takeEvery } from 'redux-saga/effects';
import { FEATURES_INIT_REQUESTED } from '../store/features';
import {
  getInitialFeatures,
  createFeatureChannel,
  watchInitialiseFeatures,
  intialiseLaunchDarkly,
} from './features';

describe('features saga', () => {
  const mockFeatures = { mockFlag: true };
  const mockFeaturesUpdate = { mockFlag: { previous: true, current: true } };
  const mockClient = {};
  const sandbox = sinon.sandbox.create();

  beforeEach(() => {
    mockClient.off = sandbox.stub();
    mockClient.allFlags = sandbox.stub().returns(mockFeatures);
    sandbox.stub(launchDarklyClient, 'initialize').returns(mockClient);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getInitialFeatures', () => {
    beforeEach(() => {
      mockClient.on = sandbox.stub().callsArg(1);
    });

    test('resolves with features and removes the event listener', () =>
      getInitialFeatures(mockClient).then((features) => {
        expect(mockClient.on.calledOnce).toBe(true);
        expect(features).toBe(mockFeatures);
        expect(mockClient.off.calledOnce).toBe(true);
      })
    );
  });

  describe('createFeatureChannel', () => {
    beforeEach(() => {
      mockClient.on = sandbox.stub().callsArg(1, mockFeaturesUpdate);
    });

    test('returns an off function', () => {
      const featureChannel = createFeatureChannel(mockClient);
      featureChannel.close();
      expect(mockClient.off.calledOnce).toBe(true);
    });
  });

  describe('watchInitialiseFeatures', () => {
    test('takes every result of the initialiseFeature saga', () => {
      const generator = watchInitialiseFeatures();
      expect(generator.next().value)
        .toEqual(takeEvery(FEATURES_INIT_REQUESTED, intialiseLaunchDarkly));
    });
  });
});
