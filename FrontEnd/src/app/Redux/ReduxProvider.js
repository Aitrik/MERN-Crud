// redux/ReduxProvider.js
'use client'; // Mark as a Client Component

import { Provider } from 'react-redux';
import { store } from './Store';

const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
