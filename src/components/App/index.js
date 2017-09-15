import { connect } from 'react-redux';
import { profileFetchSucceeded } from '../../store/profile';
import App from './App';

const mapStateToProps = ({ profile }) => ({
  email: profile.email,
  name: profile.name,
  imageUrl: profile.imageUrl,
});

const mapDispatchToProps = {
  onProfileReceived: profileFetchSucceeded,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
