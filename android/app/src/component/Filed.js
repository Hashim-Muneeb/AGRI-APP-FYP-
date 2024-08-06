import {TextInput} from 'react-native';
import React from 'react';
import {darkgreen} from './Constants';

const Filed = props => {
  return (
    <TextInput
      {...props}
      style={{
        width: '60%',
        borderRadius: 100,
        color: darkgreen,
        paddingHorizontal: 10,
        backgroundColor: 'rgb(220,200,200)',
        marginVertical: 10,
      }}
      placeholderTextColor={darkgreen}></TextInput>
  );
};

export default Filed;
