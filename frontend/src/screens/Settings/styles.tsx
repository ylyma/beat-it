import { StyleSheet } from 'react-native';
import colors from '../../assets/themes/colors';

export default StyleSheet.create({
    button: {
        borderRadius: 10,
        height: 30,
        width: 120,
        backgroundColor: colors.secondary,
        textAlign: 'center',
        textAlignVertical: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: colors.black,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlignVertical: 'center',
        padding: 5,
    },
    container: {
        flexGrow: 1,
        flexDirection: 'column',
        padding: 20,
        justifyContent: 'space-between',
        // backgroundColor: colors.primary,
        verticalAlign: 'bottom',
        marginTop: 'auto',
        // height: '100%',
    },

});
