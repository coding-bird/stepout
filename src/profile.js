'use strict'

import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet, Text, TouchableHighlight, Image, Dimensions} from 'react-native';

// import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import storage from '../lib/localStorage';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').Height;

export default class profile extends Component{
	constructor(props){
		super(props);
	}
	static navigationOptions = {
		title : 'profile'
	}
	componentDidMount(){
		// storage.getFromStorage('sessionInfo').then(result=>{
		// 	console.log("sdfghsjkl", result);
		// }).catch((error)=>{
		// 	console.log("some error occurred while fetching info from storage");
		// })
	}
	render(){
		const {params} = this.props.navigation.state;
		return (
        	<Text>welcome to your profile {params.name}</Text>
		        );
	}
}