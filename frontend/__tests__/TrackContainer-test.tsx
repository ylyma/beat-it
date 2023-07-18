/**
 * @format
 */

// import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import TrackContainer from '../src/components/Audio/TrackContainer';
import { test } from '@jest/globals';

describe('Login', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<TrackContainer userId={'t9chHyQprWd6S7FNXjM6mAx3zu72'} refresh={true} search='' />).toJSON();
        expect(tree).toMatchSnapshot();
    });
}
);