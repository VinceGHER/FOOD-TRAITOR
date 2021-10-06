import React, { useState } from "react";
import {TouchableOpacity, ScrollView, FlatList, View, Image, StyleSheet, Text } from 'react-native';
import language from '../language/en';

import colorConfig from '../colorConfig';

const CategorieList = (props) => {

function isSelectedView(id) {
    if (props.idSelected == id) 
        return {...styles.categorieViewCommon,...styles.categorieViewSelected}
    return {...styles.categorieViewCommon,...styles.categorieView}
}
function isSelectedText(id) {
    if (props.idSelected == id) 
        return styles.categorieSelected
    return styles.categorieText
}
return ( 
    <FlatList
     
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={props.categories}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => (
        
          <TouchableOpacity
            activeOpacity={1} 
            style={isSelectedView(item._id)} 
            onPress={() => props.setSelected(item._id)}
            >
              <Text style={isSelectedText(item._id)}>{item.name}</Text>
          </TouchableOpacity>
        )}
    />
    );
} 

const styles = StyleSheet.create({
    categorieViewCommon: {
        marginBottom: 10,
        marginHorizontal: 8,
        paddingHorizontal: 20,
        paddingVertical: 5,
        // height: 30,
        justifyContent: "center",
        borderRadius: 5,
        shadowColor: "#000",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        
        elevation: 7,
    },
    categorieView: {
        backgroundColor: colorConfig.lightAccentColor,
    },
    categorieViewSelected: {
        backgroundColor: colorConfig.accentColor,
    },
    categorieText: {
        color: "dimgray",
     //   fontWeight: "bold",
        fontSize: 15,
        
    },
    categorieSelected: {
        color: "white",
     //   fontWeight: "bold",
        fontSize: 15,
        
    },

});

export default CategorieList;