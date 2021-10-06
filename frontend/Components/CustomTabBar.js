import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Pressable,TouchableOpacity, ScrollView, FlatList, View, Image, StyleSheet, Text } from 'react-native';
import language from '../language/en';
import colorConfig from '../colorConfig';

import Icon from 'react-native-vector-icons/Ionicons';


function CustomTabBar ({state,navigation}) {
    const cart = useSelector((state) => state.cart)
 //   const dispatch = useDispatch()
    const navigateToScreen=(name)=>{
      navigation.navigate(name) ;
    }

  
    const data=[
      {
        name: "Home",
        iconName:"home",
   
      },
      {
        name:"Cart",
        iconName:"cart",
  
      },
      {
        name:"Orders",
        iconName:"reorder-four",
  
      },

      {
        name: "Profile",
        iconName:"person",
      }
    ]
    function iconStyle(focused){
      return {color: focused ? colorConfig.accentColor:colorConfig.colorNotPressed }
    }
  function renderAll() {
    return data.map((item) =>{
      return (
        <Pressable key={item.name} onPress={() => navigateToScreen(item.name)} activeOpacity={0.6} style={styles.button}>
  
          <Icon 
            name={item.iconName} size={30}
            style={iconStyle(state.index == data.indexOf(item) ? true : false)}  
          />
      
        </Pressable>
      )
    })
  }
  function renderCart() {
    return (
 
    
      <Pressable 
        style={
          styles.cartButton
        }
        onPress={()=>{ navigation.navigate("Cart")}}
        >
        {({ pressed }) => (
               <View style={styles.cartView}>
            <View style={styles.cartTextView}>
            <Text style={styles.cartText}>{cart.mealSelected.length} Repas dans le panier </Text>
            </View>
        <View style={styles.cartButtonView}>
          <Icon 
            name="cart" 
            size={30}
            style={{color: pressed
              ? "dimgray"
              : "white"
            }}
          />
              </View>
              </View>
        )}
      </Pressable>


    )
    
  }

  function showCart() {
      if (cart.mealSelected.length >0 && state.index!==data.findIndex(e => e.name === "Cart"))
       return renderCart()
  }
  const auth = useSelector((state) => state.auth)
  if (auth.logged == false){
    return (
      <View style={styles.TabBarMainContainer}>
        <Pressable key="signIn" onPress={() => navigateToScreen("SignIn")} activeOpacity={0.6} style={styles.button}>
          <Icon 
            name="log-in-outline" size={30}
            style={iconStyle(state.index == 0 ? true : false)}  
          />
        </Pressable>
        <Pressable key="singIn" onPress={() => navigateToScreen("SignUp")} activeOpacity={0.6} style={styles.button}>
          <Icon 
            name="person-add-outline" size={30}
            style={iconStyle(state.index == 1 ? true : false)}  
          />
        </Pressable>
      </View>
    );
  }
    return (
      <View style={styles.tabBar}>
          {showCart()}
         <View style={styles.TabBarMainContainer} >
            {renderAll()}
          </View>
    </View>
  
    );
  }

// Components/FilmDetail.js

//...


  export default CustomTabBar
 
const styles = StyleSheet.create({
  tabBar: {
    //flex: 0.12,
    justifyContent: 'flex-end'
  },
  cartView: {
    height: 40,
 
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colorConfig.accentColor,
  },
  cartTextView: {
    flex: 1,
 
  },
  cartButtonView: {
      paddingRight:20,
  },
  cartText: {
    paddingLeft: 10,
    fontSize: 20,
    fontStyle: "italic",
 
    color: "white"
  },
  cartButton: {
    width: "100%",
   // flex:0.3,
    marginRight: 30,
 //   padding: 5,
    borderRadius: 10,
 //   backgroundColor: "white"
  },
  cartButtonIcon: {
    
  },
  TabBarMainContainer :{
    justifyContent: 'space-around', 
    height: 50, 
    flexDirection: 'row',
    width: '100%',
 
  },
   
  button: {
    paddingVertical:5,
    justifyContent: 'center', 
    alignItems: 'center', 
    flexGrow: 1,
  },
   
  TextStyle:{
      color:'#fff',
      textAlign:'center',
      fontSize: 20
  }
});