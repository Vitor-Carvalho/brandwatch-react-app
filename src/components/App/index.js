import { connect } from 'react-redux';
import { featuresInitRequested } from '../../store/features';
import { profileFetchSucceeded } from '../../store/profile';
import App from './App';

const mapStateToProps = ({ profile }) => ({
  name: profile.name,
});

const mapDispatchToProps = {
  onInitializeFeatures: featuresInitRequested,
  onProfileReceived: profileFetchSucceeded,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
