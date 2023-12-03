import React from 'react';
import { NavigationContainer, useNavigation  } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
import Playlists, { RootStackParamList } from './src/views/Playlists/Playlists';
import Favoris from './src/views/Favorite/Favorite';
import Ecouter from './src/views/Listen/Listen';
import SearchBar from './src/views/Playlists/SearchBar';
import PlaylistsStyles from './src/styles/AppStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5, Ionicons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

function CustomHeaderLeft() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
 
  return (
    <TouchableOpacity onPress={() => { navigation.navigate('Playlists') }}>
      <Ionicons name="ios-arrow-back-outline" size={34} color="black" style={PlaylistsStyles.Arrow} />
    </TouchableOpacity>
  );
}

export default function App() {

  return (
   <NavigationContainer>
     <Stack.Navigator initialRouteName="Playlists">
        <Stack.Screen
            name="Playlists"
            component={Playlists}
            options={{
            headerTitle: '',
            headerLeft: () => (
              <MaterialIcons name="menu-open" size={40} color="black" style={PlaylistsStyles.menu} />
            ),
            headerRight: () => (
              <SearchBar />
            ),
          }}
        />
        <Stack.Screen 
            name="Favoris" 
            component={Favoris} 
            options={{
              headerTitle: '',
              headerLeft: () => (
                <MaterialIcons name="menu-open" size={40} color="black" style={PlaylistsStyles.menu} />
              ),
              headerRight: () => (
                <SearchBar />
              ),
            }}
        />
        <Stack.Screen 
            name="Ecouter" 
            component={Ecouter} 
            options={{
              headerTitle: '',
              headerLeft: () => <CustomHeaderLeft />,
              headerRight: () => (
                <FontAwesome5 name="ellipsis-v" size={24} color="black" style={PlaylistsStyles.Arrow} />
              ),
            }}
        />
     </Stack.Navigator>
   </NavigationContainer>
 );
}
