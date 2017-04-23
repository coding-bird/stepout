'use strict'

import React, {Component} from 'react';
import {AppRegistry,
		View,
		StyleSheet,
		Text,
		TouchableHighlight,
		Image,
		Dimensions,
		ActivityIndicator
	} from 'react-native';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
  LoginManager
} = FBSDK;

import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import storage from '../lib/localStorage';
import apiservice from './apiService';
import _ from 'underscore';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').Height;
const search = (<Icon name="search" size={25} color="#ff1a8c" />);
const facebook = (<Icon name="facebook-official" size={40} color="#FFFFFF" />);
const trophy = (<Icon name="trophy" size={25} color="#ff1a8c" />);
const discount = (<Icon name="percent" size={25} color="#ff1a8c" />);



const style = StyleSheet.create({
	loginButton: {
		height : 60,
		backgroundColor : '#4267B2',
		justifyContent : 'center',
		alignItems: 'center'
	},
	mainContainer: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor : 'grey'
	},
	facebookText :{
		color : '#FFFFFF',
		textAlign: 'center',
		fontSize: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	mainImageContainer :{
		// height : 200
		flex: 4
	},
	mainImage : {
		maxHeight: 200,
		width : screenWidth
	},
	loginTextContainer : {
		backgroundColor:'white',
		flex: 8,
		flexDirection : 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		// width: screenWidth,
		
	},
	textStyle:{
		marginTop:40,
		textAlign : 'left',
		fontSize: 20,
		fontFamily : 'Arial, Helvetica, sans-serif',
		color : '#292929'
	},
	buttonContainer:{
		// flex: 1,
		height: 60,
		// backgroundColor: 'black',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch'
	},
	textContainer: {
		marginTop: 10,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		width: screenWidth-80
	}
});

export default class login extends Component{
		constructor(props){
			super(props);
			this.state = {
				name : null,
				id : null,
				email: null,
				gender: null,
				doLogin: false,
				
			}
			this.navigate = this.props.navigation.navigate;
		}
		static navigationOptions = {
			title : "Get started",
			headerTitleStyle: {
				color : 'white'
			},
			headerStyle : {
				backgroundColor: "black"
			},
			headerVisible : true,
			headerTintColor : 'blue'
		};
		getUserPublicInfo(token){
			// console.log(JSON.stringify(token));
			let accessToken = token.accessToken;
			let options = {
				sessionToken : accessToken
			};
			apiservice.getFacebook(options).then(result=>{
				storage.multiSet({
					'sessionInfo':token,
					'userInfo': result
				}).then(success=>{
					this.setState({...this.state, doLogin: false,name: result.name, gender: result.gender});
					this.navigate('Profile',{gender: this.state.gender, name: this.state.name});
				})
			})
		}
		getAccessToken(){
			AccessToken.getCurrentAccessToken().then(data=>{
				console.log(JSON.stringify(data));
				this.getUserPublicInfo(data);
			})
		}
		facebookLogin(){
			this.setState({...this.state, doLogin: true});
			LoginManager.logInWithReadPermissions(['public_profile']).then((result) => {
				if (result.isCancelled) {
					this.setState({...this.state, doLogin: false});
					alert('Login has been cancelled');
				} else {
					this.getAccessToken();
				}
			}).catch(error =>{
				this.setState({...this.state, doLogin: false});
				alert('Login fail with error: ' + error);
			})
		}
		verifyUser(authData){
			let sessionInfo = authData[0];
			let userInfo = authData[1];
			if(!_.isEmpty(sessionInfo) && sessionInfo.accessToken && (new Date().getTime()<sessionInfo.expirationTime) && userInfo){
				this.setState({...this.state, name: userInfo.name, id: userInfo.id, gender: userInfo.gender });
				this.navigate('Profile', {gender: this.state.gender, name: this.state.name});
			} else{
				
			}
		}
		componentDidMount() {
			storage.getFromStorage(['sessionInfo','userInfo']).then(result=>{
				console.log("sdfghsjkl", result);
				this.verifyUser(result);
			}).catch((error)=>{
				console.log("xkghcsid");
			})
		}
		render(){
			console.log("kdfhus",apiservice);
			console.log('screenWidth',screenWidth);
			return (
			        
			        <View style={style.mainContainer}>
			        	<View style={style.mainImageContainer}>
			        		<Image style={style.mainImage}source={require('../images/friends.jpg')}/>
			        	</View>
			        	<View style={style.loginTextContainer}>
			        		<View style={style.textContainer}>
				        		<Text style={style.textStyle}>{search} Step out and discover new places</Text>
				        		<Text style={style.textStyle}>{trophy}  Complete Challenges</Text>
				        		<Text style={style.textStyle}>{discount}  Avail discounts, offers & deals</Text>
			        		</View>
			        		<ActivityIndicator animating={this.state.doLogin} color={'red'} size={'large'}/>
			        	</View>
			        	<View style={style.buttonContainer}>
				        	<TouchableHighlight style={style.loginButton} underlayColor="#6986C2" onPress={this.facebookLogin.bind(this)}>
				        		<View style={{flexDirection : 'row',justifyContent: 'center', alignItems: 'center'}}>{facebook}<Text style={style.facebookText}> Log in with Facebook</Text></View>
				        	</TouchableHighlight>
			        	</View>
			        </View>
			        );
		}
}
