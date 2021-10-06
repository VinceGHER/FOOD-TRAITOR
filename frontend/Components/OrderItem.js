import React, { useState } from "react";
import { Pressable,Modal,TouchableOpacity, View, Image, StyleSheet, Text, TouchableHighlight } from 'react-native';
import language from '../language/en';
import colorConfig from '../colorConfig';
import FadeIn from '../Animations/FadeIn'
import { format, parse } from 'date-format-parse';

const OrderItem = (props) => {

  return (
    <FadeIn >

      <TouchableHighlight
 //       activeOpacity={1}
        underlayColor={colorConfig.pressedColor}
      >
 
        <View style={styles.container}>
          <View style={styles.orderTextView}>
            <Text style={styles.orderTitle}>{props.data.restaurantName}</Text>

            {
             
              props.data.mealList.map( (meal) => 
                <View>
                  <Text key={meal._id} style={styles.mealTitle}>{"- "+ meal.name}</Text>
                </View>
              )
            }
            <Text style={styles.dateOrdered}>{"commandée le " +format(new Date(props.data.createdAt), "DD-MM-YYYY")}</Text>
            <Text style={styles.datePicked}>{"A venir chercher le " +format(new Date(props.data.comeToPick), "DD-MM-YYYY")}</Text>
          </View>
          <View  style={styles.orderPriceView}>
            <Text style={styles.totalPrice}>{props.data.total} {language.currency.symbol}</Text>
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
  orderTextView: {
    flex: 3,
    justifyContent: "center",
  },
  orderTitle: {
    paddingLeft: 20,
    fontWeight: "bold",
  },
  mealTitle: {
    paddingLeft: 30,
    fontSize: 12,
    color: "black",
  },
  dateOrdered: {
    paddingLeft: 20,
    fontSize: 12,
    color: "black",
    fontStyle: "italic"
  },
  datePicked: {
    paddingLeft: 20,
    fontSize: 12,
    color: "black",
    fontWeight: "bold",
  },
  orderPriceView: {
    flex: 1,
    justifyContent: "center",
  },
  totalPrice: {
    fontWeight: "bold",
    textAlign: "right",
    fontSize: 16,
  },
});

export default OrderItem;
