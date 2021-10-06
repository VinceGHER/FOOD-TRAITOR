
import React from 'react'
import { useDispatch } from 'react-redux';
import serverSetting from './serverSetting';
import { setError } from './Store/slices/errorSlice';
const serverUrl = "http://"+serverSetting.serverIp+":"+serverSetting.serverPort


export async function fetchWrapper (endpoint, method, data, dispatch) {
  
  try {
    console.log(serverUrl+endpoint)
    let response = await fetch(serverUrl+endpoint, 
      {
        method: method,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: data ? JSON.stringify(data) : ""
      });
   // console.log(response)
      let json = await response.json()
      if (!response.ok) throw json.error
      return json;
  } catch (error) {
    dispatch(setError({type:endpoint,message:error}));
  }
}