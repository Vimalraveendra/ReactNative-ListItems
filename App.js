import React from 'react';

import {SafeAreaView, Text, StyleSheet} from 'react-native';

class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Flat List Items</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 23,
    fontWeight: '700',
  },
});

export default App;
