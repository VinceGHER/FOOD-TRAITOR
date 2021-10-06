import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { addMeal, removeMeal } from '../Store/slices/cartSlice'
import { Alert,Pressable ,View, Image,Text, StyleSheet } from 'react-native';
import serverSetting from '../serverSetting';
import language from '../language/en';
import colorConfig from '../colorConfig';
const serverUrl = "http://"+serverSetting.serverIp+":"+serverSetting.serverPort

const MealDetail = (props) => {
//  const [textButton, setText] = useState("order");
  const dispatch = useDispatch()

function reserve () {
 // console.log(props.data)
    let meal = {
      _id: props.data._id,
      name: props.data.name,
      description: props.data.description,
      imageUrl: props.data.imageUrl,
      price: props.data.price,
      quantity: 1,
    }
  dispatch(addMeal(meal)) 
  props.navigation.goBack(); 
    //  setText("success");
     
    //   setTimeout(() => {
       
    //   }, 1000);

 

    // try {
    //   // console.log(serverUrl+"/api/restaurants/60b4a8f5e957b90021f6e607/orders")
    //   // let response = await fetch(serverUrl+"/api/restaurants/60b4a8f5e957b90021f6e607/orders",{
    //   //   method: 'PUT',
    //   //   headers: {
    //   //     'Accept': 'application/json',
    //   //     'Content-Type': 'application/json',
    //   //   },
    //   //   body: JSON.stringify({
    //   //     "mealList": [props.data._id],
    //   //     "userId": '60b96b07cb3d7d00215530dc',
    //   //   })
    //   // });
    //   // let json = await response.json();
    //   // if (response.status != 201) throw json.error

    //   dispatch(addMeal(meal))
    //   setText("success");
    //   setTimeout(() => {
    //     props.navigation.goBack(); 
    //   }, 1000);

    //   console.log(json)
    // } catch (error) {
    //   Alert.alert("Error",error);
    // } 
  }
  return (
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
            <Text style={styles.mealPrice}>{props.data.price} {language.currency.symbol}</Text>
          </View>
          <View  style={styles.mealPriceView}>
              {/* <Pressable 
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? 'rgb(210, 230, 255)'
                      : 'lightblue'
                  },

                  styles.button
                ]}
        
                onPress={() => Alert.alert('Simple Button pressed')}
              >
                <View style={styles.textBut}>
                  <Text style={styles.textT}>Cancel</Text>
                </View>
              </Pressable> */}
                <Pressable 
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? 'rgb(210, 230, 255)'
                      : 'green'
                  },

                  styles.button
                ]}
                title="Press me"
                onPress={() => reserve()}
              >
                <View style={styles.textBut}>
                  <Text style={styles.textT}
                       >order</Text>
                </View>
              </Pressable>
         
            
          </View>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    flexDirection:"column",
    backgroundColor: "white",
    marginVertical: 5,
    marginHorizontal: 10,
    paddingVertical: 6,

    borderRadius: 10,
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
    alignItems: 'center',
  },
  mealImage: {
    flex: 1,
    borderRadius: 10,
    aspectRatio: 1,
    margin: 2
  },
  mealTextView: {
    flex: 1,
    alignItems: 'center',
  },
  mealTitle: {
    fontSize: 30,
    marginTop: 20,
    fontWeight: "bold",
  },
  mealDescription: {
    marginTop: 10,
    fontSize: 20,
  },
  mealPriceView: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 20
  },
  mealPrice: {
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "right",
    fontSize: 30,
  },
  button: {
    flex: 1,
    marginHorizontal: 30,
    borderRadius: 10,
  
  },
  textBut: {
    justifyContent: "center",
    height: 40,
  },
  textT: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  }
});
export default MealDetail;