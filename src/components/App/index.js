import { connect } from 'react-redux';
import { featuresInitRequested } from '../../store/features';
import { profileFetchSucceeded } from '../../store/profile';
import App from './App';

const mapStateToProps = ({ profile }) => ({
  firstName: profile.firstName,
});

const mapDispatchToProps = {
  onInitializeFeatures: featuresInitRequested,
  onProfileReceived: profileFetchSucceeded,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
