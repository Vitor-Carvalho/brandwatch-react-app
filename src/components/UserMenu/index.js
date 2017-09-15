import { connect } from 'react-redux';
import { profileOpenChangePasswordDialog } from '../../store/profile';
import UserMenu from './UserMenu';

const mapStateToProps = ({ profile }) => ({
  email: profile.email,
  name: profile.name,
  imageUrl: profile.imageUrl,
});

const mapDispatchToProps = {
  onChangePasswordClick: profileOpenChangePasswordDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
