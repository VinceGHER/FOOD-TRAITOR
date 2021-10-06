import React, { useState } from "react";
import { FlatList, View, Image, StyleSheet, Text } from 'react-native';
import language from '../language/en';
import MealItem from './MealItem';

const MealList = (props) => {

    const [isRefreshing, setRefreshing] = useState(false);
async function refreshing() {
    setRefreshing(true)
    await props.onRefresh()
    setRefreshing(false)
}

function _displayDetailMeal (meal){
    props.navigation.navigate('MealDetail',meal)
  }
return ( 
    <FlatList
        onRefresh={()=>refreshing()}
        refreshing={isRefreshing}
        data={props.mealList}
        ListEmptyComponent={()=>(
            <Text style={styles.noMeal}>{language.home.noMealInCategorie}</Text>
        )}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({item}) => (
            <MealItem
                clickable={props.clickable}
                onPress={(value) => _displayDetailMeal(value)}
                data={item}
            />
        )}
     ></FlatList>
  );
}

const styles = StyleSheet.create({
    noMeal: {
        textAlign: "center",
        fontStyle:"italic",
        marginHorizontal: 40,
        marginTop:5,
    }
})

export default MealList;