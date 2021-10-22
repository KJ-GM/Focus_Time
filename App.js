import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { colors } from './src/utils/colors';
import { spacing, fontSizes } from './src/utils/sizes';
import { Timer } from './src/features/timer/Timer';
import AsyncStorage from '@react-native-async-storage/async-storage';
const STATUSES = {
  COMPLETE: 1,
  CANCELED: 2,
};
const WindowHeight = Dimensions.get('window').height;
// const DeviceWidth = Platform.OS.
export default function App() {
  // state for Focus Subject
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  // Storing focus history subjects
  const addFocusHistorySubjectStatus = (subject, status) => {
    setFocusHistory([...focusHistory, { key: String(focusHistory.length + 1), subject, status }]);
  };

  // Clear out Foucs Histories
  const onClear = () => {
    setFocusHistory([]);
  };
  
  // Save FocusHistory in Async app storage
  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

   // Load FocusHistory from Async app storage
  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Update FocusHistory from Async app storage, Invoked once App starts
  useEffect(() => {
    loadFocusHistory();
  }, []);

  // Update FocusHistory in Async app storage, everytime focusHistory Updates + First Render
  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);


  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectStatus(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectStatus(focusSubject, STATUSES.CANCELED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <View style={{flex:1}}>
            <View style={styles.appTitle}>
            <Text style={{fontSize:fontSizes.xxxl, color: colors.white}}>K J A</Text>
            </View>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={() => onClear()} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    paddingTop: Platform.OS === 'ios' ? spacing.xxxl : spacing.xxxl,
  },
  appTitle:{
    height: WindowHeight * 0.10,
    justifyContent:'center',
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
});
