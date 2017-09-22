import { connect } from 'react-redux';
import { FEATURES } from '../../store/features';
import { profileOpenChangePasswordDialog } from '../../store/profile';
import UserMenu from './UserMenu';

const mapStateToProps = ({ features, profile }) => ({
  email: profile.email,
  name: profile.name,
  imageUrl: profile.imageUrl,
  showAccountAdministration: features[FEATURES.enableAccountAdministration],
});

const mapDispatchToProps = {
  onChangePasswordClick: profileOpenChangePasswordDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
