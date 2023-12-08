import React, { createContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity  } from 'react-native'
import { Feather, Foundation, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import { StackScreenProps } from '@react-navigation/stack';
import * as MediaLibrary from 'expo-media-library';
import { Audio } from 'expo-av';
import HeaderPlaylists from './HeaderPlaylists';
import FooterPlaylists from './FooterPlaylists';
import Crafts from '../ScreenTabs/Crafts';
import Albums from '../ScreenTabs/Albums';
import FilesSongs from '../ScreenTabs/Files';
import PagerView from 'react-native-pager-view';

export type RootStackParamList = {
    Playlists: any;
    Ecouter: any;
}

type PlaylistsProps = StackScreenProps<RootStackParamList, 'Playlists'>;

type PlaylistsComponent = React.ComponentType<PlaylistsProps>;

export const AudioFilesContext = createContext([] as any[]);

const Playlists: PlaylistsComponent = ({ navigation }) => {

    const [audioFiles, setAudioFiles] = useState<MediaLibrary.Asset[]>([]);
    const [selectedTab, setSelectedTab] = useState(0);

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
      
        const audioExtensions = ['.mp3', '.MP3', '.wav', '.ogg', '.aac', '.flac']; 

        const audioFiles = assets.filter(file => {
            const lowerCaseFilename = file.filename.toLowerCase();
            return audioExtensions.some(extension => lowerCaseFilename.endsWith(extension));
        });
        setAudioFiles(audioFiles)
    }
      
    const playAudio = async (uri) => {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync({ uri });
            await soundObject.playAsync();
        } catch (error) {
            console.log('Error playing audio', error);
        }
    }

    const ViewPagerLists: any = (tab: string) => {
        if (tab  === 'Chansons') {
            return (
                <View style={{ width: '100%', flex: 0.98 }}>
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
                    </ScrollView>
                </View>
            )
        } else if (tab  === 'Artistes') {
            return <Crafts />
        } else if (tab  === 'Albums') {
            return <Albums />
        } else if (tab  === 'Dossiers') {
            return <FilesSongs />
        }
    }
       
return (<AudioFilesContext.Provider value={audioFiles}>
    <LinearGradient 
        colors={['#dfd3df', '#ada8d2']} 
        start={{x: 0, y: 0}} 
        end={{x: 1, y: 1}}  
        style={styles.container}
    >
        <HeaderPlaylists />

        <View style={styles.navigation}>
            <Text style={{ padding: 10 }} onPress={() => setSelectedTab(0)}>Chansons</Text>
            <Text style={{ padding: 10 }} onPress={() => setSelectedTab(1)}>Artistes</Text>
            <Text style={{ padding: 10 }} onPress={() => setSelectedTab(2)}>Albums</Text>
            <Text style={{ padding: 10 }} onPress={() => setSelectedTab(3)}>Dossiers</Text>
        </View>

        <PagerView style={{flex: 0.98}} initialPage={selectedTab}>
            <View key={0} style={{ width: '100%', flex: 0.98 }}>
                {ViewPagerLists('Chansons')}
            </View>
            <View key={1} style={{ width: '100%', flex: 0.98 }}>
                {ViewPagerLists('Artistes')}
            </View>
            <View key={2} style={{ width: '100%', flex: 0.98 }}>
                {ViewPagerLists('Albums')}
            </View>
            <View key={3} style={{ width: '100%', flex: 0.98 }}>
                {ViewPagerLists('Dossiers')}
            </View>
        </PagerView>


        <FooterPlaylists />
        
    </LinearGradient>
    </AudioFilesContext.Provider>)
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
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
        backgroundColor: '#b5b0d4',
        // shadowColor: '#808080',
        // shadowOffset: { width: -10, height: 0 }, // Décalage horizontal positif pour une ombre sur le côté gauche
        // shadowOpacity: 0.2,
        // shadowRadius: 5,
        // elevation: 5, // Pour Android
    }
});

export default Playlists
