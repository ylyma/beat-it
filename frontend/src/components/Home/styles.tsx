import { StyleSheet } from 'react-native';
import colors from '../../assets/themes/colors';
export default StyleSheet.create({
    wrapper: {
        justifyContent: 'flex-start',
    },
    searchRow: {
        flexDirection: 'row',
        paddingBottom: '3%',
        verticalAlign: 'middle',

    },
    topContainer: {
        // verticalAlign: 'top',
        backgroundColor: colors.accent,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        // paddingTop: '5%',
    },
    bottomContainer: {
        position: 'absolute',
        top: 200,
        bottom: 20,
    },
    userIcon: {
        alignSelf: 'stretch',
        // verticalAlign: 'bottom',
        marginTop: '6%',
        padding: '5%',
        height: "50%",
        width: "10%",
    },
    searchBar: {
        flexBasis: 250,
    },
    title: {
        fontWeight: 'bold',
        color: colors.white,
        fontSize: 25,
        paddingVertical: 5,
        alignSelf: 'center',
    },
    subtitle: {
        fontWeight: 'bold',
        color: colors.black,
        fontSize: 20,
        paddingLeft: 40,
        paddingTop: 20,
    },
    video: {
        alignContent: 'flex-start',
        height: 150,
        width: 150,
        marginLeft: 20,
    },
    scroll: {
        padding: 20,
    },
    vertScroll: {
        // marginTop: 0,
    },
    caption: {
        alignSelf: 'center',
    }
});
