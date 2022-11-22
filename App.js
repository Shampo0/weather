import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions , ActivityIndicator } from 'react-native';
const { width : SCREEN_WIDTH} = Dimensions.get('window');

const API_KEY = "e7232b50dad2ba903c8a62178e803ed5";
export default function App() {
  const [city, setCity] = useState("Loading...")
  const [days, setDays] = useState([]);
  const [ok, setOK] = useState(true);
  const getWeather  = async()=>{
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOK(false);
    }
    const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({accuray:5});
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: false});
    setCity(location[0].region);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric&lang=kr`);
    const json = await response.json();
    // setDays(json.daily);
  };
  useEffect(()=>{
    getWeather();
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView 
      pagingEnabled 
      horizontal
      showsVerticalScrollIndicator={false}  
      contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? ( 
        <View style={styles.day}>
          <ActivityIndicator 
          color="white" 
          style={{ marginTop: 10}}
          size="large" 
          />
          </View>
          ) : ( 
          <View style={styles.day}></View>
          )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.1,
    backgroundColor: "red",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems:"center",
  },
  cityName: {
    fontSize: 58,
    fontWeight: "500",
  },
  weather: {
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
    fontWeight: "600"
  },  
  description: {
    marginTop:-30,
    fontSize: 60,
  },
});

// const styles = StyleSheet.create({

// });
