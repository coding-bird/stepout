'use strict'
/**
 * ## Imports
 *
 * Redux  & the config file
 */
import store from 'react-native-simple-store'
const USER_AUTH_KEY = 'userAuthKey';

class localStorage {
  
  constructor () {
    this.SESSION_TOKEN_KEY = USER_AUTH_KEY;
  }

  /*
    Function to store data into AsyncStorage
    @key: string/ Array of keys-value pairs
    @value: value of a key when key is a string
  */
  setIntoStorage (key, value) {
     key = key || this.SESSION_TOKEN_KEY;
     
    return store.save(key, value);
  }
  
   /*
    Function to get data from AsyncStorage
    @key: string/ Array of keys
  */
  getFromStorage (key) {
  
    if(key){
      return store.get(key);
    }
    return null;
  }
 
  /*
    Function to delete data from AsyncStorage
    @key: string/ Array of keys
  */
  deleteFromStorage (key) {
    if(key){
      return store.delete(key);  
    }
    return null;
  }
  
  /*
    Function to store data into AsyncStorage
    @keyValuePairs: object containing key-value map
  */
  multiSet(keyValuePairs){
    let pairArray = [];
    let pair = [];
    for(let item in keyValuePairs){
      pair = []
      pair.push(item);
      pair.push(keyValuePairs[item]);
      pairArray.push(pair);
    }
    return this.setIntoStorage(pairArray);
  }
}

export default (new localStorage());
