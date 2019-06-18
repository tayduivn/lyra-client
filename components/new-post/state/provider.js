import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

export const DispatchContext = React.createContext();
export const StateContext = React.createContext();

const Provider = ({ children, reducer, initialState, ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

Provider.PropTypes = {
  children: PropTypes.element,
  reducer: PropTypes.func,
  initialState: PropTypes.func
};

export default Provider;
