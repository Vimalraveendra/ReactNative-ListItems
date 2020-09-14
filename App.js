import React from 'react';

import {SafeAreaView, Text, StyleSheet, FlatList} from 'react-native';
import {ButtonGroup, ListItem, Avatar, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import FontIcon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();
FontIcon.loadFont();

class App extends React.Component {
  state = {
    selectedIndex: 0,
    listItems: [
      {
        id: 1,
        name: 'Amy Farha',
        avatar_url:
          'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President',
      },
      {
        id: 2,
        name: 'Chris Jackson',
        avatar_url:
          'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
      },
    ],
    deletedList: [],
  };
  updateIndex = (selectedIndex) => {
    if (selectedIndex === 2) {
      this.setState({selectedIndex, listItems: []});
    } else if (selectedIndex === 1) {
      this.setState({selectedIndex});
    } else {
      this.setState({selectedIndex});
    }
  };

  renderItem = ({item}) => {
    return (
      <ListItem bottomDivider>
        <CheckBox />
        <Avatar rounded source={{uri: item.avatar_url}} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
        </ListItem.Content>
        <FontIcon name="trash-o" color="red" size={25} />
        <Icon name="chevron-right" color="#eee" size={30} />
      </ListItem>
    );
  };

  render() {
    const buttons = ['Delete Selected', 'Select All', 'DeleteAll'];
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
          }}
        />
        <FlatList
          data={this.state.listItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={this.renderItem}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 23,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default App;
