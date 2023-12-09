import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import { Foundation, MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import MarqueeView from 'react-native-marquee-view';

function Listen({ route }) {
  const [sound, setSound] = React.useState<Audio.Sound | null>(null);
  const [duration, setDuration] = React.useState(0);
  const [position, setPosition] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);

  const { uri } = route.params;
  const fileName = uri.split('/').pop();

  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync({ uri });
    setSound(sound);

    sound.setOnPlaybackStatusUpdate((status: any) => {
      if (status.isPlaying) {
        setDuration(status.durationMillis);
        setPosition(status.positionMillis);
      }
      if (status.didJustFinish) {
        stopSound();
      }
    });
  }

  React.useEffect(() => {
    loadSound();
  }, [uri]);

  async function playSound() {
    if (isPlaying) {
      await sound?.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound?.playAsync();
      setIsPlaying(true);
    }
  }

  async function stopSound() {
    await sound?.unloadAsync();
    setIsPlaying(false);
  }

  const formatTime = (timeInMilliseconds: number) => {
    const totalSeconds = Math.floor(timeInMilliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  return (
    <LinearGradient 
      colors={['#dfd3df', '#ada8d2']} 
      start={{x: 0, y: 0}} 
      end={{x: 1, y: 1}} 
      style={styles.container}
    >
      <LinearGradient 
          colors={['#e5a6e3', '#ada8d2']} 
          start={{x: 0, y: 1}} 
          end={{x: 1, y: 0}} 
          style={{ flex: 0.5, width: '90%', height: '90%', borderRadius: 20, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}
      >
        <Feather name="music" size={200} color="white" />
      </LinearGradient>

      <View style={{ flex: 0.08, flexDirection: 'row', width: '100%', marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
        <ScrollView>
            <MarqueeView>
                <View>
                  <Text style={ styles.scrollView }>{fileName}</Text>
                </View>
            </MarqueeView>
        </ScrollView>
        <View style={{ width: '20%', height: 60, justifyContent: 'center', alignItems: 'center' }}>
          <Octicons name="star" size={35} color="black" />
        </View>
      </View>

      <View style={{ flex: 0.1, flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 }}>
          <Text style={{ marginLeft: 20 }}>Pas de parole</Text>
          <View style={{ marginRight: 20 }}>
            <Text style={{ padding: 10, backgroundColor: '#e2d8e2', borderRadius: 30 }}>Ajouter de parole</Text>
          </View>
      </View>

      <View style={{ flexDirection: 'column', width: '100%', marginVertical: 15, justifyContent: 'center' }}>
          <View style={styles.songSlider}>
            <Slider 
              key={position}
              minimumValue={0}
              maximumValue={duration}
              value={position}
              onValueChange={(value) => {
                sound?.setPositionAsync(value);
              }}
              minimumTrackTintColor="#000000" 
              maximumTrackTintColor="#000000"
              thumbTintColor="#000000"
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: -20, marginHorizontal: 20 }}>
            <Text style={{ justifyContent: 'flex-start' }}>{formatTime(position)}</Text>
            <Text style={{ justifyContent: 'flex-end' }}>{formatTime(duration)}</Text>
          </View>
      </View>
      <View style={{ flex: 1, width: '100%', height: '30%', alignItems: 'flex-end', position: 'absolute', bottom: 0 }}>
          <View style={{ width: '100%', height: '50%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 20 }}>
            <Foundation name="loop" size={35} color="black" />
            <Entypo name="controller-jump-to-start" size={35} color="black" />
            {   isPlaying
                ? <FontAwesome5 name="pause" size={30} color="black" style={{ width: 70, height: 70, padding: 5, borderRadius: 50, backgroundColor: '#ebecf2', textAlign: 'center', paddingTop: 18 }} onPress={playSound} />
                : <FontAwesome5 name="play" size={30} color="black" style={{ width: 70, height: 70, padding: 5, borderRadius: 50, backgroundColor: '#ebecf2', textAlign: 'center', paddingTop: 18, paddingLeft: 10 }} onPress={playSound} />
            }
            <Entypo name="controller-next" size={35} color="black" />
            <MaterialIcons name="library-music" size={35} color="black" />
          </View>
      </View>

    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  scrollView: {
    fontSize: 22, 
    width: 400,
  },
  songSlider: {
    width: '100%',
    height: 40,
    marginTop: 20,
    color: 'white',
  },
})

export default Listen
