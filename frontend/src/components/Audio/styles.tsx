import { StyleSheet } from 'react-native';
import colors from '../../assets/themes/colors';

export default StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        borderRadius: 10,
        height: 40,
        width: 120,
        backgroundColor: colors.lightgrey,
    },
    playlist: {
        alignContent: 'flex-start',
        height: 150,
        width: 150,
        marginRight: 20,
    },
    scroll: {
        padding: 20,
    },
    caption: {
        textAlign: 'center',
        paddingBottom: 10,
        fontSize: 20,
        fontFamily: 'System',
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
    tracks: {
        paddingRight: 15,
    },
    titleAndButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
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
    buttonContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    songTitle: {
        textAlign: 'center',
        fontSize: 20,
        paddingLeft: 10,
    },
    refresh :{
        alignSelf: 'center',
        paddingLeft: 120,
    },
    trackContainer: {
        paddingLeft: 15,
    }
});
