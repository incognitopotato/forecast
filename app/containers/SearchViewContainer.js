import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { views as v } from '../utils/constants';
import { submitSearchForm } from '../actions';
import SearchView from '../components/SearchView.jsx';

const mapStateToProps = ({ view }) => ({
  isHeaderMode: view.main === v.MAIN_FORECAST_VIEW,
  isSearchMode: view.header === v.HEADER_SEARCH_VIEW
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onSubmit: submitSearchForm
}, dispatch);

const SearchViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchView);

export default SearchViewContainer;
