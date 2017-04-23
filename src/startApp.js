import React, {Component} from 'react';
import {
	AppRegistry, 
	View,
	Text
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import login from './login';
import profile from './profile';

export default function startApp(){
	const app = StackNavigator({
		Login : {
			screen : login
		},
		Profile : {
			screen : profile
		}
	},{
			initialRouteName : 'Login'
		});

	AppRegistry.registerComponent('cliffr', ()=> app);
} 


