import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

const TextInputWithValidation = () => {
  const [inputValue, setInputValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const handleInputChange = text => {
    setInputValue(text);
    setIsTouched(true);
  };

  const showError = isTouched && inputValue === '';

  return (
    <View>
      <TextInput
        value={inputValue}
        onChangeText={handleInputChange}
        placeholder="Enter text"
        style={{borderColor: 'black', borderWidth: 1, padding: 10}}
      />
      {showError && <Text style={{color: 'red'}}>Please enter text</Text>}
      <TouchableOpacity
        onPress={() => {
          setInputValue('');
          setIsTouched(false);
        }}>
        <Text>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TextInputWithValidation;
