import { StyleSheet } from 'react-native';
import colors from '../../../assets/themes/colors';

export default StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#000',
        borderStyle: 'solid',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        paddingTop: 10,
        textAlign: 'center',
        fontSize: 24,
        // color: colors.colors.black,
        fontWeight: 'bold',
    },
    body: {
        justifyContent: 'center',
        paddingHorizontal: 30,
        minHeight: 100,
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        flexDirection: 'row',
    },
});
