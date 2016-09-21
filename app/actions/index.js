// Pure Action Creators
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const INITIALIZE_CUSTOMER = 'INITIALIZE_CUSTOMER';

export const updateCustomer = () => ({
  type: UPDATE_CUSTOMER,
  data: {
    firstName: 'Dominic',
    lastName: 'West',
    gender: 'm',
    prefix: 'mr'
  }
});
export const initializeCustomer = () => ({
  type: INITIALIZE_CUSTOMER
});

// Async Action Creators
export function getCustomer() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(updateCustomer());
      dispatch(initializeCustomer());
    }, 3000);
  };
}