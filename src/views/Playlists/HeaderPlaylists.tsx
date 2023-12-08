import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons'; 
import { Text } from 'react-native';

function HeaderPlaylists() {
    return (
        <View style={styles.header}>
            <LinearGradient colors={['#340b4f', '#7f25bb']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.favorite}>
                <Feather name="star" size={32} color="#cbcddc" style={{ marginLeft: 12 }} />
                <Text style={{ marginLeft: 8 }}>Favoris</Text>
            </LinearGradient>
            <LinearGradient colors={['#173c14', '#2f9f24']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.playlists}>
                <FontAwesome5 name="creative-commons-sa" size={30} color="#cbcddc" style={{ marginLeft: 12 }} />
                <Text style={{ marginLeft: 8 }}>Liste des lectures</Text>
            </LinearGradient>
            <LinearGradient colors={['#8a6341', '#df781d']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.recent}>
                <Ionicons name="md-time-outline" size={34} color="#cbcddc" style={{ marginLeft: 12 }} />
                <Text style={{ marginLeft: 8 }}>Recents</Text>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 20,
        marginHorizontal: 8,
        gap: 8,
    },
    favorite: {
        width: '30%',
        height: 80,
        borderRadius: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    playlists: {
        width: '30%',
        height: 80,
        borderRadius: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    recent: {
        width: '30%',
        height: 80,
        borderRadius: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
})

export default HeaderPlaylists;
