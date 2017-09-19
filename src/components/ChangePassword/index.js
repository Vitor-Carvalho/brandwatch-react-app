import { connect } from 'react-redux';
import ChangePassword from './ChangePassword';
import { profileCloseChangePasswordDialog, profileChangePasswordRequested } from '../../store/profile';

const mapStateToProps = ({ profile }) => ({
  isOpen: profile.isChangePasswordDialogOpen,
  error: profile.changePasswordError,
  isSubmitting: profile.isSubmittingPassword,
});

const mapDispatchToProps = {
  onRequestClose: profileCloseChangePasswordDialog,
  onSubmit: profileChangePasswordRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

