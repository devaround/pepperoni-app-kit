import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';

class aac1 extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('aac1', () => aac1);
