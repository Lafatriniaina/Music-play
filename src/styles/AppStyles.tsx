import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const PlaylistsStyles = StyleSheet.create({
    menu: {
        padding: 6,
        paddingTop: 7,
        width: 50, 
        height: 55,
     },     
    search: {
        width: 336,
        height: 40,
        flexDirection: 'row', 
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#6c6f80',
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 20,
        borderStyle: 'solid',
        borderRadius: 50,
        left: 0
    }, 
    Arrow: {
        marginHorizontal: 30,
    }
});

export default PlaylistsStyles;