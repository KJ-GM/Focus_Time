import  React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';

export const RoundedButton = ({
  style = {},
  textstyle = {},
  size = 125,
  ...props
}) => {
  return(
    <TouchableOpacity style={[styles(size).radius, style]} onPress={props.onPress}>
      <Text style={[styles(size).text, textstyle]}> {props.title} </Text>
    </TouchableOpacity>
  );


};

const styles = (size) => StyleSheet.create({
  radius:{
    borderRadius: size / 2,
    width: size,
    height: size,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth: 2,
  },
  text:{
    color: '#fff',
    fontSize: size / 4,
  },

});