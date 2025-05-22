import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Platform, ImageBackground, KeyboardAvoidingView} from 'react-native';
import {fetchRealWeather} from './utils/api.js';

import SearchInput from './components/SearchInput'
import getImageForWeather from './utils/getImageForWeather';

export default class App extends React.Component{
  constructor(props){
    super(props);

    this.state={
      location: '',
      weather: '',
      temperature: 0
    };
  }
  componentDidMount(){
    this.handleUpdateLocation('Dhaka'); //default
  }
  handleUpdateLocation = async(city)=> {
    // {async needed whenever await is used}

    if(!city) return;
    const {location, weather, temperature} = await fetchRealWeather(city);
    this.setState({
      location: location,
      weather: weather,
      temperature: temperature
    });
  };

   
  render(){
    const{location, weather, temperature}=this.state;
    return(
      <KeyboardAvoidingView style={styles.container} behavior="padding">

      <ImageBackground
        source={getImageForWeather(weather)}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >

      <View style={styles.detailsContainer}>
        <Text style={[styles.largeText, styles.textStyle]}>Weather App</Text>
        <Text style={[styles.textStyle, styles.generalText]}> {location} </Text> 
        <Text style={[styles.textStyle, styles.smallText]}> {weather} </Text> 
        <Text style={[styles.generalText, styles.textStyle]}> {this.state.temperature}° </Text>
       

        <SearchInput
          placeholder="Search any city"
          onSubmit={this.handleUpdateLocation}
       
          />
      </View>   
      </ImageBackground> 
      </KeyboardAvoidingView>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

 

  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS==='ios'? 'AvenirNext-Regular' : 'Roboto',
  },

  largeText: {
    fontSize: 44,
  },

  generalText: {
    fontSize: 30,
  },

  smallText: {
    fontSize: 18,
  },



  imageContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },

  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  }

});