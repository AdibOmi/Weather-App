import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

export default class SearchInput extends React.Component{
  constructor(props){
    super(props);
    this.state={
      text: '',
    };
  }
  handleChangeText=text=>{
  this.setState({text});
};


  handleSubmitEditing=()=>{
    const {onSubmit}=this.props;
    const {text}=this.state;
    if(!text) return;
    onSubmit(text);
    this.setState({text: ''});
  };
  
  render(){
    const {placeholder}=this.props;
    const {text}=this.state;


    return(
        <View style={styles.container}>
          <TextInput
          value={text}
            autoCorrect={false}
            placeholder={placeholder}
            placeholderTextColor="grey"
            underlineColorAndroid="transparent"
            style={styles.textInput}
            clearButtonMode="always"
            onChangeText={this.handleChangeText}
            onSubmitEditing={this.handleSubmitEditing}
          />
        </View>
    );
  }
}

const styles=StyleSheet.create({
  container: {
    backgroundColor:'#eae8ed',
    height: 50,
    width: 280,
    marginTop: 10,
    textAlign: 'center',
    borderRadius: 5,
  },

  textInput: {
    flex: 1,
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});