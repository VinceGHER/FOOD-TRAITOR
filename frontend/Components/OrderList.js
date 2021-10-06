import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {View, Text, StyleSheet, FlatList} from 'react-native'
import { useSelector } from 'react-redux';
import colorConfig from '../colorConfig';
import {fetchWrapper} from '../utils'
import OrderItem from './OrderItem';

const Order = (props) => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const [orders, setOrders] = useState('');
    const [isRefreshing, setRefreshing] = useState(false);

    const fetchOrders = async  () => {
        setRefreshing(true)
        try {
           
            let response = await fetchWrapper("/api/users/"+auth.userId+"/orders",'GET','',dispatch) 
        //    console.log(response)
            setOrders(response)
            setRefreshing(false)
        
        } catch (error) {
            //console.log(error)
        }

    }

    React.useEffect(() =>{
       
        fetchOrders();
    },[]);

    return (
        <View  style={styles.container}>
            <Text style={styles.orderTitleText}>Orders</Text>
            {console.log(orders)}
            <FlatList
                data={orders}
                renderItem={({item}) => (
                    <OrderItem data={item}/>
                )}
                refreshing={isRefreshing}
                keyExtractor={item => item._id}
                onRefresh={fetchOrders}  
            />

        </View>
    )
}


export default Order

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        width: "100%",
        backgroundColor: colorConfig.backgroundColor
    },
    orderTitleText: {
        fontSize: 40,
        fontWeight: "bold",
        paddingLeft: 10,
        marginBottom: 10,
        textAlign: "center"
    }
});

