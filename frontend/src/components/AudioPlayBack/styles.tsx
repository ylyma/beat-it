import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: '5%',
    },
    icon: {
        fontSize: 50,
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
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        borderWidth: 1,
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    bookmarkCaption: {
        fontSize: 15,
        textAlign: 'center',
    },
    caption: {
        fontSize: 15,
        textAlign: 'center',
    },
    bookmarkContainer: {
        flex: 1,
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
        fontSize: 40,
        alignSelf: 'center',
        marginLeft: 10,
    },
    time: {
        fontSize: 15,
        alignSelf: 'center',
        marginRight: 10,
    },

})

export default styles