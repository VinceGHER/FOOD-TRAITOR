import * as React from 'react';
import {TextInput,Button,SafeAreaView,TouchableOpacity,Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons';
import { autoSignIn, signIn , signOut } from '../Store/slices/authSlice'
import { setError, clearError  } from '../Store/slices/errorSlice'

import { color } from 'react-native-reanimated';
import { Platform, StatusBar } from "react-native";
import serverSetting from '../serverSetting';
import language from '../language/en';
import * as Animatable from 'react-native-animatable';
// Import Components
import Market from '../Components/Market'
import CustomTabBar from '../Components/CustomTabBar'
import DetailMeal from '../Components/MealDetail'
import Cart from '../Components/Cart'
import Order from '../Components/OrderList';
import Error from '../Components/Error'

const serverUrl = "http://"+serverSetting.serverIp+":"+serverSetting.serverPort
// SignIn and SignUp screen

const AuthContext = React.createContext('');
function SignInScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [networkError, setNetworkErrord] = React.useState('');
  const { signIn } = React.useContext(AuthContext);

  return (
    <View style={styles.signInView}>
      <Text style={styles.signInText}>FoodTraitor</Text>
      {networkError ? (<Text>{networkError}</Text>) : (null)}
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
    

      <Button title="Sign in" onPress={() => signIn({ email, password },setNetworkErrord)} />
    </View>
  );
}
function SignUpScreen() {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [networkError, setNetworkErrord] = React.useState('');
  const { signUp } = React.useContext(AuthContext);

  return (
    <View style={styles.signInView}>
      <Text style={styles.signInText}>FoodTraitor</Text>
      {networkError ? (<Text>{networkError}</Text>) : (null)}
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
    

      <Button title="Sign Up" onPress={() => signUp({ email, name,password },setNetworkErrord)} />
    </View>
  );
}
// App Tabs
function HomeScreen( {navigation}) {
  return (
    <Market
      navigation={navigation}
    />
  );
}
function MealDetailScreen({ route, navigation }) {
  return (
    <DetailMeal
      data={route.params}
      navigation={navigation}
    />
  );
}
function OrdersScreen() {
    return (
      <Order />
    );
} 
function ProfileScreen() {
  const { signOut } = React.useContext(AuthContext);
  const dispatch = useDispatch()

  return (
    <View style={styles.tab}>
      <Text>Profile</Text>
      <Button title="Sign out" onPress={signOut} />
      <Button title="Generate Error" onPress={() =>dispatch(setError({type:"login",message:"erreur de test "+Math.random()}))} />
    </View>
  );
}
function CartScreen({navigation}) {
  return (
    <View style={styles.tab}>
      <Cart  navigation={navigation}/>
    </View>
  );
}


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyStack() {
  return (

    <Stack.Navigator initialRouteName="Home">

      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="MealDetail" 
        component={MealDetailScreen} 
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
}

export default function () {
  const auth = useSelector((state) => state.auth)
 
  const dispatch = useDispatch();
  const [networkError, setNetworkError] = React.useState('');
  React.useEffect(() => {
    (async () => {
   
      if (auth.userToken != null){
        try {
          let response = await fetch(serverUrl+"/api/users/client/validToken", 
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json; charset=UTF-8',
              },
              body: JSON.stringify({userId:auth.userId ,token:auth.userToken})
            });
            let json = await response.json()
            if (!response.ok) throw json.error

            dispatch(autoSignIn());
        } catch (error) {
          dispatch(setError({type:'login',message:error}));
        }
      } 
    })();
  },[])
  const authContext = React.useMemo(
    () => ({
      signIn: async (data,setError) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        try {
          let response = await fetch(serverUrl+"/api/users/client/login", 
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json; charset=UTF-8',
              },
              body: JSON.stringify(data)
            });
            let json = await response.json()

            if (!response.ok) throw json.error

          
            dispatch(signIn({token: json.token,userId:json.userId}));
        } catch (error) {
          setError(error)
          setTimeout(() => {
            setError('');
          }, 2000);
      

        } 
  
      },
      signUp: async (data,setError) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        try {
          let response = await fetch(serverUrl+"/api/users/client/signUp", 
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json; charset=UTF-8',
              },
              body: JSON.stringify(data)
            });
            let json = await response.json()

            if (!response.ok) throw json.error

          
            dispatch(signIn({token: json.token,userId:json.userId}));
        } catch (error) {
          setError(error)
          setTimeout(() => {
            setError('');
          }, 2000);
     
        } 
  
      },
      signOut: () => dispatch(signOut()),
    }),
    []
  );


  return (
  
    <AuthContext.Provider value={authContext}>
    <SafeAreaView style={styles.safeAreaViewAndroid}>

      <NavigationContainer>
          <Error />
          <Tab.Navigator 
              tabBar={props => <CustomTabBar {...props} />}
                tabBarOptions={{
                  activeBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan de l'onglet sélectionné
                  inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
                  showLabel: false, // On masque les titres
              }}
          >
          {auth.logged == false  ? (
            <>
              <Tab.Screen name="SignIn" component={SignInScreen} />
              <Tab.Screen name="SignUp" component={SignUpScreen} />
            </>
          ) : (
            <>
              <Tab.Screen name="Home" component={MyStack} 
                options={{
                    tabBarIcon: ({focused }) => (
                        <Icon 
                          name='home' size={30}
                          style={iconStyle(focused)}  
                        />
                    ),
                }}
              />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Orders" component={OrdersScreen} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <Icon 
                          name='reorder-four' size={30}
                          style={iconStyle(focused)} 
                        />
                    ),
                }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon 
                          name='person' size={30}
                          style={iconStyle(focused)} 
                        />
                    ),
                }}
              />
            </>
          )
            
        }
        </Tab.Navigator>

      </NavigationContainer>
    </SafeAreaView>
    </AuthContext.Provider>
  );
}


const styles = StyleSheet.create({
    tab: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    safeAreaViewAndroid: {
      flex:1,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    signInView: {
        flex:1,
        marginHorizontal: 20,
        flexDirection: 'column',
        justifyContent:'center', 
    },
    signInText: {
      textAlign: 'center',
      fontSize: 40,
      paddingBottom: 20,
    },

  })
