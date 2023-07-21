import { StyleSheet } from "react-native";
import colors from "../assets/themes/colors";

export default StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
        alignSelf: "center",
        padding: 50,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        alignSelf: "center",
        paddingBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
        paddingBottom: 20,
    },
    icon: {
        fontSize: 50,
        // color: colors.white,
        alignSelf: 'center',
        padding: 20,
    },
});