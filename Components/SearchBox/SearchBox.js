import React from 'react';

import {TextInput, View, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

Icon.loadFont();

const SearchBox = ({handleSearch}) => {
  return (
    <View style={styles.searchBar}>
      <TextInput
        placeholder="Search Here..."
        style={styles.search}
        lightTheme
        round
        onChangeText={handleSearch}
      />
      <Icon name="search" size={24} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
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
export default SearchBox;
