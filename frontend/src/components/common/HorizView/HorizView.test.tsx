/**
 * @format
 */

// import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import HorizView from './HorizView'

it('renders correctly', async () => {
    await renderer.create(<HorizView image_src={require('../../../assets/images/googlelogo.png')} caption='hi' />);
});
