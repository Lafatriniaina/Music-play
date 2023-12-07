import React, { useCallback, useContext, useState } from 'react';
import PlaylistsStyles from '../../styles/AppStyles';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AudioFilesContext, RootStackParamList } from './Playlists';
import * as MediaLibrary from 'expo-media-library'; 

const SearchInput = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [audioFiles, setAudioFiles] = useState<MediaLibrary.Asset[]>([]);

    useCallback(() => {
        const contextValue: MediaLibrary.Asset[] = useContext(AudioFilesContext);
        console.log(contextValue)
        setAudioFiles(contextValue);
    }, []);

    return (
        <TextInput
            placeholder="Rechercher des noms ou titres"
            style={{ flex: 1, marginLeft: 10 }}
            onFocus={() => { navigation.navigate('SearchFilter', { searchText }); console.log(audioFiles)}}
            onChangeText={text => {
                setSearchText(text);
                navigation.navigate('SearchFilter', { searchText: text });
            }}
        />
    )
}

export default function SearchBar() {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <View style={PlaylistsStyles.search}>
            <Ionicons 
                name="search" 
                size={24} 
                color="#000" 
                style={{ marginLeft: -10 }} 
            />
            <SearchInput navigation={navigation} />    
                <View style={{ borderLeftWidth: 3, borderColor: "#6c6f80", borderRadius: 50, height: '60%', marginLeft: 10, marginRight: 10 }} />
            <Ionicons name="mic" size={24} color="#000" style={{ marginRight: 10 }} />
        </View>
    );
}
