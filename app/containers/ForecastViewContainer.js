import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { views as v } from '../utils/constants';
import ForecastView from '../components/ForecastView.jsx';

const mapStateToProps = ({ city, forecast, view }) => ({
  forecast,
  city,
  show: view.main === v.MAIN_FORECAST_VIEW
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

const ForecastViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForecastView);

export default ForecastViewContainer;
