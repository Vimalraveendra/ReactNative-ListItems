import React from 'react';

import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {ButtonGroup, ListItem, Avatar, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import FontIcon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();
FontIcon.loadFont();

import DatList from './Components/DataList/DataList';

class App extends React.Component {
  state = {
    selectedIndex: 0,
    listItems: DatList,
    deletedList: [],
    selectedList: false,
  };
  updateIndex = (selectedIndex) => {
    if (selectedIndex === 2) {
      this.setState({selectedIndex});
      this.deleteAll();
    } else if (selectedIndex === 1) {
      this.setState({selectedIndex});
      this.selectAll();
    } else {
      this.setState({selectedIndex});
      this.deleteSelected();
    }
  };
  deleteAll = () => {
    this.setState({listItems: []});
  };
  selectAll = () => {
    let result = this.state.listItems.map((item) =>
      !this.state.selectedList ? item.id : [],
    );

    this.setState({
      deletedList: result,
      selectedList: !this.state.selectedList,
    });
  };

  deleteSelected = () => {
    const {deletedList, listItems} = this.state;
    let helperArray = deletedList;
    let helperArray2 = listItems;
    helperArray2 = helperArray2.filter(
      (item, index) => item.id !== helperArray[index],
    );

    this.setState({listItems: helperArray2, deletedList: []});
  };

  selectIndividualContact = (id) => {
    const {deletedList, listItems} = this.state;
    let helperArray = deletedList;
    if (helperArray.includes(id)) {
      this.setState({selectedList: false});
      helperArray = helperArray.filter((item) => item !== id);
    } else {
      // helperArray.push(id)
      helperArray = [...helperArray, id];
      if (helperArray.length === listItems.length) {
        this.setState({selectedList: true});
      }
    }
    this.setState({deletedList: helperArray});
  };

  delItem = (id) => {
    let helperArray = this.state.listItems;
    helperArray = helperArray.filter((item) => item.id !== id);
    // helperArray.splice(id, 1);
    this.setState({listItems: helperArray});
  };

  renderItem = ({item}) => {
    return (
      <ListItem bottomDivider>
        <CheckBox
          onPress={() => this.selectIndividualContact(item.id)}
          checked={this.state.deletedList.includes(item.id)}
        />

        <Avatar rounded source={{uri: item.avatar_url}} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
        </ListItem.Content>
        <TouchableOpacity
          onPress={() => {
            this.delItem(item.id);
          }}>
          <FontIcon name="trash-o" color="red" size={25} />
        </TouchableOpacity>
        <Icon name="chevron-right" color="#eee" size={30} />
      </ListItem>
    );
  };

  render() {
    const buttons = [
      'Delete Selected',
      this.state.selectedList ? 'Unselect All' : 'Select All',
      'DeleteAll',
    ];
    const {selectedIndex} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Contact List</Text>
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
