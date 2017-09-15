import { connect } from 'react-redux';
import ChangePassword from './ChangePassword';
import { profileCloseChangePasswordDialog, profileChangePasswordRequested } from '../../store/profile';

const mapStateToProps = ({ profile }) => ({
  isOpen: profile.isChangePasswordDialogOpen,
  error: profile.changePasswordError,
});

const mapDispatchToProps = {
  onRequestClose: profileCloseChangePasswordDialog,
  onSubmit: profileChangePasswordRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

