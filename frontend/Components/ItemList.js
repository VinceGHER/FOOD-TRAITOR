import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const ItemList = (props) => {
    const [clicked, setClicked] = useState(false);

    function stylePressable(){
      setClicked(true)
    }
  return (
    <Pressable
      onPress={onPress}
      style={props.style(clicked)}
    />
  );
}

export default ItemList;