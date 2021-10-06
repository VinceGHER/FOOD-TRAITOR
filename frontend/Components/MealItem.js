import React, { useState } from "react";
import { Pressable,Modal,TouchableOpacity, View, Image, StyleSheet, Text, TouchableHighlight } from 'react-native';
import language from '../language/en';
import colorConfig from '../colorConfig';
import FadeIn from '../Animations/FadeIn'


const MealItem = (props) => {
function press() {
  if (props.clickable)
    props.onPress( props.data)
}
  return (
    <FadeIn >

      <TouchableHighlight
 //       activeOpacity={1}
        onPress={() => press()}
        underlayColor={colorConfig.pressedColor}
      >
        <View style={styles.container}>
 
          <View style={styles.mealImageView}>
            <Image
              style={styles.mealImage}
              source={{uri: props.data.imageUrl}}
            /> 
      
          </View>
          <View style={styles.mealTextView}>
            <Text style={styles.mealTitle}>{props.data.name}</Text>
            <Text style={styles.mealDescription}>{props.data.description}</Text>
          </View>
          <View  style={styles.mealPriceView}>
            <Text style={styles.mealPrice}>{props.data.price} {language.currency.symbol}</Text>
          </View>
          </View>
      </TouchableHighlight>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    marginBottom: 5,
    marginHorizontal: 10,
    paddingVertical: 6,

    borderRadius: 5,
 //   backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    
    elevation: 1,
  },
  mealImageView: {
    flex: 1,
  },
  mealImage: {
    borderRadius: 10,
    aspectRatio: 1,
    margin: 2
  },
  mealTextView: {
    flex: 3,
    justifyContent: "center",
  },
  mealTitle: {
    paddingLeft: 20,
    fontWeight: "bold",
  },
  mealDescription: {
    paddingLeft: 20,
    fontSize: 12,
  },
  mealPriceView: {
    flex: 1,
    justifyContent: "center",
  },
  mealPrice: {
    fontWeight: "bold",
    textAlign: "right",
    fontSize: 16,
  },
});

export default MealItem;
