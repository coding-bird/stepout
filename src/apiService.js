'use strict';

import _ from 'underscore';
const facebookUrl = "https://graph.facebook.com/v2.5/me?fields=email,name,gender";

class apiservice {
	constructor(){
		
	}
	
	getFacebook(options){
		options.url = facebookUrl;
		if(options.sessionToken){
			options.url+= `&access_token=${options.sessionToken}`;
		}
		return this._fetch(options).then(response=>{
			console.log("inside getfacebook", response);
			if(response.error){
				
				throw response.error; 
			} else{
				return response;
			}
		}).catch(error =>{
			throw error;
		})
	}
	_fetch(options){
		options = _.extend({
			method: 'get',
			url : null
		}, options);
		let reqopts = {
			method : 'get'
		};
		console.log(options.url, options.sessionToken);
		return fetch(options.url, reqopts)
		.then(response => response.json())
		.then(json=>{
			console.log(json);
			return json;
		}).catch(error=>{
			throw error;
		})
	}
} 

export default (new apiservice());