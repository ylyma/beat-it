/**
 * @format
 */

// import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Container from '../src/components/common/Container';
import { test } from '@jest/globals';

describe('Login', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<Container />).toJSON();
        expect(tree).toMatchSnapshot();
    });
}
);