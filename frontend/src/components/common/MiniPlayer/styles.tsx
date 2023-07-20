import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    wrapper: {
        position: "relative",
        minHeight: 50,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#272829",
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: 16,

    },
    text: {
        color: "white",
        fontSize: 16,
        flexGrow: 1,
        fontWeight: "bold",

    }
});