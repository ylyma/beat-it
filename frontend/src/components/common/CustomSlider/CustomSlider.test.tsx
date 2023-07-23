/**
 * @format
 */

// import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import CustomSlider from './CustomSlider'

it('renders correctly', async () => {
    await renderer.create(<CustomSlider value={1} minimumValue={0} maximumValue={100} onSlidingComplete={() => { }} />);
});
