import reducer, {
  featuresInitSucceeded,
  featuresChanged,
} from './features';

const features = {
  enableAccountAdministration: true,
};

const featuresUpdate = {
  enableAccountAdministration: {
    current: false,
  },
};

describe('features', () => {
  test('getting initial features', () => {
    expect(reducer({
      enableAccountAdministration: false,
    }, featuresInitSucceeded(features)))
      .toEqual({
        enableAccountAdministration: true,
      });
  });

  test('getting feature changes', () => {
    expect(reducer({
      enableAccountAdministration: true,
    }, featuresChanged({ features: featuresUpdate })))
      .toEqual({
        enableAccountAdministration: false,
      });
  });
});
