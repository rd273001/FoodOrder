import React from 'react';
import HomeStack from './src/routes/HomeStack';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <>
      <HomeStack />
      <Toast />
    </>
  );
};

export default App;