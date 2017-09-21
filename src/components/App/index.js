import { connect } from 'react-redux';
import { profileFetchSucceeded } from '../../store/profile';
import App from './App';

const mapStateToProps = ({ profile }) => ({
  name: profile.name,
});

const mapDispatchToProps = {
  onProfileReceived: profileFetchSucceeded,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
