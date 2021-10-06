import React, { useState } from 'react';
import {ActivityIndicator,Modal, FlatList,Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import MealList from './MealList';
import colorConfig from '../colorConfig';
import serverSetting from '../serverSetting';
import language from '../language/en';
import {clearCart} from '../Store/slices/cartSlice'


const serverUrl = "http://"+serverSetting.serverIp+":"+serverSetting.serverPort

const Cart = (props) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const auth = useSelector((state) => state.auth)
  const [networkError, setNetworkError] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(false)
  const _onValidateCart = async () => {
      try {
        console.log(serverUrl+"/api/restaurants/60b4a994e957b90021f6e608/orders")
        let dataToSend = {
          mealList: cart.mealSelected.map(e => e._id),
          userId:auth.userId,
        }
        console.log(dataToSend);
        setLoadingOrder(true)
        let response = await fetch(serverUrl+"/api/restaurants/60b4a994e957b90021f6e608/orders", 
          {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
             },
            body: JSON.stringify(dataToSend)
          });
          let json = await response.json()
          if (json.error) throw json.error
          console.log(json)
        setNetworkError("success")
        setModalVisible(true)
        dispatch(clearCart())
      } catch (error) {
        setNetworkError(error)
     
      } 
      setLoadingOrder(false)
    }
    function showError() {
      if (networkError !== null && networkError !== "success"){
        return( <Text style={styles.networkError}>{networkError}</Text>)
     }
    }
 //   const [clicked, setClicked] = useState(false);
 const cart = useSelector((state) => state.cart)
    function disabled() {
      if (cart.mealSelected.length==0){
        return {
          backgroundColor:   "#cccccc",
        }
      }
  
    }
  return (
    <View  style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
      >
        <View style={styles.popUpCenterView}>
          <View style={styles.popUpView}>
            <Text>Reserve effectué</Text>
            <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
              <Text style={styles.popUpButtonText}>Cool</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Text style={styles.menuText}>Cart</Text>

      <MealList
        clickable={false}
        mealList={cart.mealSelected} 
        onRefresh={()=>{}}
      />
            {showError()}
     
      <Pressable 
        onPress={_onValidateCart}
        disabled={cart.mealSelected.length==0}   
        style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? 'rgb(210, 230, 255)'
                      : 'green'
                  },
                  
                    disabled()
                  ,
                  styles.button
                ]}>
          {loadingOrder ? (<View style={{alignItems:"center"}}><ActivityIndicator size="large" color="lightgreen"/></View>):(
        <View style={styles.textBut}>
          <Text style={styles.textT}>
          Order Cart
          </Text>
        </View>
          )}
      </Pressable>
    </View>
      
  );
}

export default Cart;

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        width: "100%",
        backgroundColor: colorConfig.backgroundColor
    },
    networkError: {
      textAlign: "center",
   
    },
      menuText:{
        fontSize: 40,
        fontWeight: "bold",
        paddingLeft: 10,
        marginBottom: 10,
        textAlign: "center"
      },
      button: {
        marginHorizontal: 50,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: "column",
        justifyContent: 'flex-end',
      },
      textBut: {
        justifyContent: "center",
        padding: 10,

      },
      textT: {
        textAlign: "center",
        color: "white",
        fontSize: 16,
      },
      popUpView: {

        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      popUpCenterView: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      },
      popUpButtonText: {
        
        color:"white",
        textAlign: "center"
      },
      buttonClose: {
        marginTop:20,
        backgroundColor: "green",
        paddingVertical: 10,
        paddingHorizontal: 40,
    
      }
});
