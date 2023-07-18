import { StyleSheet } from 'react-native';
import colors from '../../../assets/themes/colors';

export default StyleSheet.create({
    wrapper: {
        ...StyleSheet.absoluteFillObject,
        // paddingTop: "5%",
        // color: colors.white,
        // flexGrow: 1,

    },
    container: {
        // position: "relative",
        // paddingLeft: 20,
        // paddingRight: 20,
        // flex: 1,
        // height: '60%',
        // flexGrow: 1,
        // ...StyleSheet.absoluteFillObject,
        // backgroundColor: colors.primary,

    },
    bottomContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        verticalAlign: 'bottom',
        width: '100%',
        height: '9%',
    },
});
