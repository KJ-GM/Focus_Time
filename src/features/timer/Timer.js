import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import {useKeepAwake} from 'expo-keep-awake';

import { colors } from '../../utils/colors';
import { spacing, fontSizes } from '../../utils/sizes';
import { CountDown } from '../../components/CountDown';
import { RoundedButton } from '../../components/RoundedButton';
import {Timing} from './Timing';

const DEAFAULT_TINE = 0.5;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {

  // Keep Phone awake from sleep in this page
  useKeepAwake();
  
  // States 
  const [minutes, setMinutes] = useState(DEAFAULT_TINE);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  // Functions

  // Tracks the Timing Progress
  const onProgress = (progress) => {
    setProgress(progress);
  }
  
  // Invoked once timer finishes 
  const onEnd = () => {
    vibrate();
    setMinutes(DEAFAULT_TINE);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  }

  // Vibrate function (Invoked once timer finishes)
  const vibrate = () => {

    if(Platform.OS === 'ios'){
      const interval = setInterval( () => Vibration.vibrate(), 1000 );
        setTimeout( () => clearInterval(interval), 10000) 
    }
    else{
         Vibration.vibrate(10000);
    }
 
  }
  // Changes time for the timer
  const changeTime = (min) =>{
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.countDown}>
        <CountDown 
        isPaused={!isStarted} 
        onProgress={onProgress} 
        minutes={minutes}
        onEnd={onEnd} />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{paddingTop:spacing.sm}}>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 10 }}
        />
      </View>
      <View style={styles.buttonWrapper}>
      <Timing onChangeTime={changeTime}/>
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton
            title="start"
            onPress={() => {
              setIsStarted(true);
            }}
          />
        ) : (
          <RoundedButton
            title="pause"
            onPress={() => {
              setIsStarted(false);
            }}
          />
        )}
      </View>
          <View style={styles.clearSubject}>
         <RoundedButton
            title="-"
            size={50}
            onPress={() => { clearSubject()}}
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: spacing.md,
    paddingTop: spacing.sm,
  },
  countDown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubject: {
    paddingBottom:  spacing.lg,
    paddingLeft: spacing.lg,
  },
});
