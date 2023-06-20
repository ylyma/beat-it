import { StyleSheet } from 'react-native';
import colors from '../../assets/themes/colors';

export default StyleSheet.create({
    videoPlayer: {
        width: '100%',
        height: 300,
        backgroundColor: colors.black,
    },
    addButton: {
        borderRadius: 10,
        height: 30,
        width: 120,
        backgroundColor: colors.secondary,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: colors.black,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    titleAndButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    subtitle: {
        fontWeight: 'bold',
        color: colors.black,
        fontSize: 20,
        paddingLeft: 10,
    },
    buttonIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: colors.lightgrey,
        borderRadius: 15,
        margin: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        // justifyContent: 'center',
    },
});
