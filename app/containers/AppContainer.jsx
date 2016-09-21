import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCustomer } from '../actions';
import StatementEntry from '../components/StatementEntry.jsx';

const mapStateToProps = ({ customer }) => {
  return {
    firstName: customer.firstName,
    hasAllData: customer.initialized,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getCustomer
}, dispatch);

const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatementEntry);

export default Dashboard;