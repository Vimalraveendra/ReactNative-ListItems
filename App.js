import React from 'react';

import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  View,
  TextInput,
} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import FontIcon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();
FontIcon.loadFont();

import DataList from './Components/DataList/DataList';
import ContactList from './Components/ContactList/ContactList';

class App extends React.Component {
  state = {
    selectedIndex: 0,
    listItems: DataList,
    deletedList: [],
    selectedList: false,
    text: '',
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

  handleSearch = (text) => {
    this.setState({text});
  };

  filteredList = () => {
    return this.state.listItems.filter((item) => {
      return item.name.toLowerCase().includes(this.state.text.toLowerCase());
    });
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
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search Here..."
            style={styles.search}
            lightTheme
            round
            onChangeText={this.handleSearch}
          />
          <Icon name="search" size={24} style={styles.icon} />
        </View>
        <FlatList
          data={this.filteredList()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <ContactList
              item={item}
              deletedList={this.state.deletedList}
              delItem={this.delItem}
              selectIndividualContact={this.selectIndividualContact}
            />
          )}
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
  searchBar: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eee',
    height: 40,
    width: '100%',
    borderRadius: 25,
    paddingHorizontal: 20,
  },
  search: {
    width: '90%',
    fontSize: 18,
    fontWeight: '400',
  },
});

export default App;
