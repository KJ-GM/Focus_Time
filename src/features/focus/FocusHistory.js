import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Dimensions } from 'react-native';

import { fontSizes, spacing } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';

const WindowHeight = Dimensions.get('window').height;

const HistoryItem = ({ item, index }) => {
  return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };
  return (
    <>
      <SafeAreaView style={{ height: WindowHeight * 0.60, alignItems: 'center'}}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we Focused on</Text>
            <FlatList
              style={{ }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />

            <View style={styles.clearContainer}>
              <RoundedButton
                size={115}
                title="clear"
                onPress={() => clearHistory()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 1 ? 'red' : 'green',
    fontSizes: fontSizes.md,
    paddingTop: spacing.md,
  }),
  title: {
    color: 'white',
    fontSize: fontSizes.lg,
    paddingTop: 20,
    paddingBottom: spacing.md,
    fontWeight: 'bold',
  },
  clearContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    paddingBottom: spacing.xxxl,
  },
});
