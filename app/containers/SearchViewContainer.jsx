import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { views as v } from '../utils/constants';
import { submitSearchForm } from '../actions';
import SearchView from '../components/SearchView.jsx';

const mapStateToProps = ({ view }) => {
  return {
    isHeaderMode: view.main === v.SEARCH,
    isSearchMode: view.header === v.HEADER_SEARCH
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onSubmit: submitSearchForm
}, dispatch);

const SearchViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchView);

export default SearchViewContainer;