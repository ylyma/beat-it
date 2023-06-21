import { StyleSheet } from 'react-native'
import colors from '../../assets/themes/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        padding: '5%',
    },
    icon: {
        fontSize: 50,
        color: colors.white,
        alignSelf: 'center',
        padding: 20,
    },
    bottomBar: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'flex-end',
    },
    progressBar: {
        width: "90%",
        height: 50,
        flexDirection: 'row',
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.white,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
    },
    button: {
        backgroundColor: colors.secondary,
        borderColor: colors.white,
        borderWidth: 1,
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    bookmarkCaption: {
        color: colors.black,
        fontSize: 15,
        textAlign: 'center',
    },
    caption: {
        color: colors.white,
        fontSize: 15,
        textAlign: 'center',
    },
    bookmarkContainer: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        padding: '5%',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    timeAndBookmarkContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bookmark: {
        fontSize: 30,
        color: colors.white,
        alignSelf: 'center',
        marginLeft: 10,
    },
    time: {
        fontSize: 15,
        color: colors.white,
        alignSelf: 'center',
        marginRight: 10,
    },

})

export default styles