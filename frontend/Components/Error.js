import React, {useState, useRef} from 'react'
import { setError, clearError  } from '../Store/slices/errorSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Text, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable';

const Error = (props) => {
    const error = useSelector((state) => state.error);
    const dispatch = useDispatch()
    let refState = useRef(null);
    let [currentTimeout, setCurrentTimeOut] = useState(null);
    // const handleViewRef = ref => {
    //     refState = ref
    //     console.log(refState)
    // };

    React.useEffect(() => {
        
        if (refState && error.message != null){
            if (currentTimeout != null){
                clearTimeout(currentTimeout);
                setCurrentTimeOut(null)
            }
        //    console.log(refState.current)
            refState.current?.slideInDown()
            setCurrentTimeOut(setTimeout(() => {
                refState.current?.slideOutUp().then(e=>dispatch(clearError()))
            }, 5000));
        }
    },[error.message])
    return (
        error.message != null &&
        <Animatable.View ref={refState} duration={300} style={styles.errorView}>
            <Text style={styles.errorText}>{error.message}</Text>
        </Animatable.View>
    )
}

export default Error


const styles = StyleSheet.create({
    errorView : {
        paddingVertical: 2,
  
        backgroundColor: "red"
      },
      errorText: {
        textAlign: "center",
        fontWeight: "bold",
        color: "white"
      }
});