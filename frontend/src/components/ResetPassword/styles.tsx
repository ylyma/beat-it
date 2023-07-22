import { StyleSheet } from 'react-native';
// import colors from '../../assets/themes/colors';

export default StyleSheet.create({
    logo: {
        padding: 10,
        alignItems: 'center',
        margin: 5,
    },
    text: {
        padding: 10,
        textAlign: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        textDecorationLine: 'underline',
        alignSelf: 'center',
        paddingVertical: 10,
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    title: {
        fontWeight: 'bold',
        alignSelf: 'center',
        // color: colors.black,
        fontSize: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
});
