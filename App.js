import React from 'react';

import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {ButtonGroup} from 'react-native-elements';

class App extends React.Component {
  state = {
    selectedIndex: 0,
  };
  updateIndex = (selectedIndex) => {
    this.setState({selectedIndex});
  };

  renderItem = () => {};
  render() {
    const buttons = ['Hello', 'World', 'Buttons'];
    const {selectedIndex} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Flat List Items</Text>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{
            marginTop: 10,
            borderColor: 'green',
            textStyle: 'blue',
          }}
        />
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
