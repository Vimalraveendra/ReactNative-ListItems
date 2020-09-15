import React from 'react';

import {TouchableOpacity} from 'react-native';
import {ListItem, Avatar, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import FontIcon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();
FontIcon.loadFont();

const ContactList = ({item, deletedList, selectIndividualContact, delItem}) => {
  return (
    <ListItem bottomDivider>
      <CheckBox
        onPress={() => selectIndividualContact(item.id)}
        checked={deletedList.includes(item.id)}
      />

      <Avatar rounded source={{uri: item.avatar_url}} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
      </ListItem.Content>
      <TouchableOpacity
        onPress={() => {
          delItem(item.id);
        }}>
        <FontIcon name="trash-o" color="red" size={25} />
      </TouchableOpacity>
      <Icon name="chevron-right" color="#eee" size={30} />
    </ListItem>
  );
};

export default ContactList;
