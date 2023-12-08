import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Feather, MaterialIcons } from '@expo/vector-icons'; 

function FooterPlaylists() {
    return (
        <View style={styles.footer}>
            <View style={styles.listen}>
                <Feather name="headphones" size={30} color="black" />
                <Text>Ma musique</Text>
            </View>
            <View style={styles.look}>
            <MaterialIcons name="ondemand-video" size={30} color="black" />
                <Text>Regarder</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    listen: {
        width: '50%',
        height: 100,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    look: {
        width: '50%',
        height: 100,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default FooterPlaylists
