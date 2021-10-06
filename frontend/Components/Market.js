import React from 'react';
import { StyleSheet,Text, View, ImageBackground, ScrollView, FlatList, TouchableOpacityComponent} from 'react-native';
import { useState, useEffect } from 'react';

import serverSetting from '../serverSetting';
import language from '../language/en';
import colorConfig from '../colorConfig';

const serverUrl = "http://"+serverSetting.serverIp+":"+serverSetting.serverPort

import MealList from './MealList';
import CategorieList from './CategorieList';



class Market extends React.Component {
    
  constructor(props){
    super(props)
    this.state = {
      error: "",
      requestResponse: undefined,
      categorieIdSelected: "0",
      networkError: false,
    }
  }
  componentDidMount(){
    this._requestMarket()
  }
  _requestMarket = async () => {
    try {
      console.log(serverUrl+"/api/restaurants/60b4a994e957b90021f6e608/")
      let response = await fetch(serverUrl+"/api/restaurants/60b4a994e957b90021f6e608/");
      let json = await response.json();
      console.log(json)
      this.setState({
        networkError: false,
        name: json.name,
        description: json.description,
        bannerUrl: json.bannerUrl,
        categories: json.categories,
        categorieIdSelected: json.categories[0]._id
        
      });
    } catch (error) {
      this.setState({
        networkError: true,
      });
   
    } 

  }
  _setCategorieSelected = (id) => {
    this.setState({
      categorieIdSelected: id
    });
  }
  _displayMarket(){
    if (this.state.networkError){
      return ( <Text style={styles.networkError}>Une erreur est survenue dans l'acquision des données</Text>)
    }
    if (this.state.bannerUrl != undefined){
      return (
        <View  style={styles.container}>
          <ImageBackground
          style={styles.bannerUrl}
          source={{ uri: this.state.bannerUrl }}
          >
            <View style={styles.descriptionView}>
              <Text style ={styles.name}>{this.state.name}</Text>
              <Text style ={styles.description}>{this.state.description}</Text>
            </View>
          </ImageBackground>
          <View style={styles.menuView}>
            <Text style={styles.menuText}>Menu</Text>
            <View>
            <CategorieList
              categories={this.state.categories}
              idSelected={this.state.categorieIdSelected}
              setSelected={this._setCategorieSelected}
            />
            </View>
            <MealList
            clickable={true}
              onRefresh={this._requestMarket}
              navigation={this.props.navigation}
              mealList={this.state.categories.find(e => e._id === this.state.categorieIdSelected).mealList}  
            />
          </View>
       </View>
      );
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
 
          {this._displayMarket()}

          </View>
    );
  }
}

export default Market;

const styles = StyleSheet.create({

  container: { 
    flex: 1, 
    backgroundColor: colorConfig.backgroundColor
  },
  bannerUrl: {
    flex:0.25,
  },
  descriptionView: {
    position: 'absolute',
    left: 0, 
    bottom: 0,
    padding: 10,  
    
  },
  name: {
    fontSize: 30,
    color: "white" ,
    fontWeight: "bold"
  },
  description: {
    color: "white" ,
    fontStyle: "italic",
    fontSize: 20,
  },
  menuView:{
    flex:1,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // borderWidth: 5,
  },
  menuText:{
    fontSize: 40,
    fontWeight: "bold",
    paddingLeft: 10,
    marginBottom: 10,
  },
  networkError: {
    paddingVertical: "50%",
    textAlign: "center",
  }
// icon: {
//     width: 30,
//     height: 30
//   }
})
  