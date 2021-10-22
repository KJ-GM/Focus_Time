import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

const WindowHeight = Dimensions.get('window').height;

export const Focus = ({ addSubject }) => {
  // Input text State
  const [subject, setSubject] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            onSubmitEditing={({ nativeEvent }) => {
              setSubject(nativeEvent.text);
            }}
          />
          <RoundedButton
            style = {{borderColor:'gray'}}
            title="+"
            size={55}
            onPress={() => addSubject(subject)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   height: WindowHeight * 0.20,
  },
  innerContainer: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center'
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
  },
  inputContainer: {
    alignItems: 'center',
    paddingTop: spacing.lg,
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    marginRight: spacing.md,
    height: 50,
    borderRadius: 5,
  },
});
