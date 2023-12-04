import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity  } from 'react-native'
import { Feather, MaterialIcons, Foundation, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import { StackScreenProps } from '@react-navigation/stack';
import * as DocumentPicker from 'expo-document-picker';
import * as MediaLibrary from 'expo-media-library';
import { Audio } from 'expo-av';

export type RootStackParamList = {
    Playlists: any;
    Ecouter: any;
}

type PlaylistsProps = StackScreenProps<RootStackParamList, 'Playlists'>;

type PlaylistsComponent = React.ComponentType<PlaylistsProps>;

// async function getAudioFiles() {
//     const { status } = await MediaLibrary.requestPermissionsAsync();
//     if (status !== 'granted') {
//       alert('Sorry, we need media library access to make this work!');
//       return;
//     }
//     const { assets } = await MediaLibrary.getAssetsAsync({
//         mediaType: 'audio',
//     });
    
//     const audioFiles = assets.filter(file => file.filename.endsWith('.mp3'));
//     console.log(audioFiles);
   
//     console.log(assets);
// }


const Playlists: PlaylistsComponent = ({ navigation }) => {

    const [audioFiles, setAudioFiles] = useState<MediaLibrary.Asset[]>([]);

    useEffect(() => {
     getAudioFiles();
    }, []);

    const getAudioFiles = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need media library access to make this work!');
          return;
        }
      
        const { assets } = await MediaLibrary.getAssetsAsync({
          mediaType: 'audio',
        });
      
        const audioFiles = assets.filter(file => file.filename.endsWith('.mp3'));
        setAudioFiles(audioFiles);
       };
      
       const playAudio = async (uri) => {
        const soundObject = new Audio.Sound();
        try {
          await soundObject.loadAsync({ uri });
          await soundObject.playAsync();
        } catch (error) {
          console.log('Error playing audio', error);
        }
       };

  return (
    <LinearGradient 
        colors={['#dfd3df', '#ada8d2']} 
        start={{x: 0, y: 0}} 
        end={{x: 1, y: 1}}  
        style={styles.container}
    >
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

        <View style={styles.navigation}>
            <Text>Chansons</Text>
            <Text>Artistes</Text>
            <Text>Albums</Text>
            <Text>Dossiers</Text>
        </View>

        <View style={styles.songs}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Foundation name="play" size={24} color="white" style={{ padding: 5, paddingStart: 10, paddingTop: 7, backgroundColor: '#601d6a', borderRadius: 50, width: 40, height: 40, margin: 4, textAlign: 'center' }} />
                <Text>Lecture aléatoire</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name="sort-alphabetical-descending-variant" size={30} color="black" style={{ marginRight: 5 }} />
                <MaterialCommunityIcons name="sort-variant" size={30} color="black" />
            </View>
        </View>

        <ScrollView style={styles.musics}>
        {audioFiles.map((file, index) => (
            <TouchableOpacity key={index} onPress={() => {navigation.navigate('Ecouter', { uri: file.uri }),  playAudio(file.uri)}}>
                <View style={styles.music}>
                    <View style={{ width: '70%', height: 75, alignItems: 'center', flexDirection: 'row' }}>
                        <LinearGradient 
                            colors={['#e5a6e3', '#ada8d2']} 
                            start={{x: 0, y: 1}} 
                            end={{x: 1, y: 0}}  
                            style={{ width: 56, height: 56, borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}
                        >
                            <Feather name="music" size={30} color="white" />
                        </LinearGradient>
                        <View style={{ flexDirection: 'column' }}>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={{ width: '90%' }}>{file.filename}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Feather name="smartphone" size={15} color="black" style={{ margin: 2 }} />
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ width: '78%' }}>Artiste inconnu | Album inconnu</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.options}>
                        <Ionicons name="stats-chart" size={24} color="purple" />
                        <Ionicons name="share-social-sharp" size={24} color="black" />
                        <FontAwesome5 name="ellipsis-v" size={24} color="black" />
                    </View>
                </View>
            </TouchableOpacity> )
        )}

            <View style={styles.music}>
                <View style={{ width: '70%', height: 75, backgroundColor: 'blue', alignItems: 'center', flexDirection: 'row' }}>
                    <LinearGradient 
                        colors={['#e5a6e3', '#ada8d2']} 
                        start={{x: 0, y: 1}} 
                        end={{x: 1, y: 0}}  
                        style={{ width: 56, height: 56, borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}
                    >
                        <Feather name="music" size={30} color="white" />
                    </LinearGradient>
                    <View style={{ flexDirection: 'column' }}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={{ width: '90%' }}>Agrad_-_Hafatra_(officiel_clip_2023)</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Feather name="smartphone" size={15} color="black" style={{ margin: 2 }} />
                            <Text numberOfLines={1} ellipsizeMode='tail' style={{ width: '78%' }}>Artiste inconnu | Album inconnu</Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: '30%', height: 75, backgroundColor: 'yellow', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Ionicons name="stats-chart" size={24} color="purple" />
                    <Ionicons name="share-social-sharp" size={24} color="black" />
                    <FontAwesome5 name="ellipsis-v" size={24} color="black" />
                </View>
            </View>
        </ScrollView >

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
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
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
    navigation:{
        flex: 0.08,
        bottom: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    songs: {
        flex: 0.08,
        flexDirection: 'row',
        marginTop: 8,
        marginHorizontal: 6,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    musics: {
        flex: 0.9,
        marginTop: 20,
        flexDirection: 'column',
    },
    music: {
        flexDirection: 'row',
    },
    options: { 
        width: '30%', 
        height: 75,
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        alignItems: 'center',
        // shadowColor: '#808080',
        // shadowOffset: { width: -10, height: 0 }, // Décalage horizontal positif pour une ombre sur le côté gauche
        // shadowOpacity: 0.2,
        // shadowRadius: 5,
        // elevation: 5, // Pour Android
    }
});

export default Playlists
