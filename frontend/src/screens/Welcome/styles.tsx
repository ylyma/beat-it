import { StyleSheet } from 'react-native';
import colors from '../../assets/themes/colors';
export default StyleSheet.create({
    title: {
        fontSize: 30,
        alignSelf: 'center',
        color: colors.black,
        paddingVertical: 30,
    },
    button: {
        width: 150,
        alignSelf: 'center',
        padding: 0,
        verticalAlign: 'bottom',
    },
    bottom: {
        paddingTop: 40,
        verticalAlign: 'bottom',
    },
    top: {
        paddingBottom: 200,
    },
});