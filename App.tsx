import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Playlists from './src/views/Playlists/Playlists';
import Favoris from './src/views/Favorite/Favorite';
import Ecouter from './src/views/Listen/Listen';
import SearchBar from './src/views/Playlists/SearchBar';
import PlaylistsStyles from './src/styles/PlaylistsStyles';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

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
       <Stack.Screen name="Favoris" component={Favoris} />
       <Stack.Screen name="Ecouter" component={Ecouter} />
     </Stack.Navigator>
   </NavigationContainer>
 );
}
