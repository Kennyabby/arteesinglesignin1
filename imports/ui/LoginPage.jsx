import React,{Component} from 'react';
import { useState } from 'react';
import { Tracker } from 'meteor/tracker'
import { LoginDetails } from '/imports/api/userLogin';
import { LinkPage } from './LinkPage';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {useTracker} from 'meteor/react-meteor-data';

var userValue="";
var passValue="";
var username="";
var password="";


  
  const getUsername = (e)=>{
    username = e.target.value
  }
  const getPassword = (e)=>{
    password= e.target.value;
  }
  
  

 
  export class LoginPage extends Component{

    constructor(props){
        super(props);
        this.state={
            username:userValue,
            password:passValue,
            err:"",
            topInput:"none",
            bottomInput:"none",
            bordertop:"solid black 1px",
            borderbottom:"solid black 1px"
        }
    }
    toggleFocus = (e)=>{
      var inputName = e.target.getAttribute("name");
      if(inputName==="Username"){
        this.setState({
          topInput:"solid rgb(100,100,250) 1px",
          bordertop:"solid rgb(100,100,250) 1px",
          bottomInput:"none",
          borderbottom:"solid black 1px"
        })
      }else if(inputName==="Password"){
        this.setState({
          bottomInput:"solid rgb(100,100,250) 1px",
          borderbottom:"solid rgb(100,100,250) 1px",
          topInput:"none",
          bordertop:"solid black 1px"
        })
      }
    }
    gotoMain=(e)=>{
      console.log("going to main");
      this.props.loggeout;
    }
    login  = (event)=>{
  
        if (username===this.state.username && password===this.state.password){
          this.setState({
            err: "Please wait.."
          })
          var linkPage = <LinkPage loggedout={this.props.loggedout}/>;
          event.target.innerHTML="Signin...";
          this.props.loggedin(linkPage);
    
        }else if(username==="" && password===""){
          this.setState({
            err: "Please enter the fields!"
          })
        }
        else{
          
          this.setState({
            err: "You have entered an invalid detail!"
          })
        }
      }
      
      signin = <button 
        className="login" 
        type="submit" 
        value="login" 
        onClick={this.login}>Login
      </button>
        
      render(){
        const usernameInput = <input  
          className="input-top" 
          type="text" 
          name="Username"
          placeholder="Username"
          style={{outline:this.state.topInput, border:this.state.bordertop}}
          onClick={this.toggleFocus}
          onChange={getUsername}
        />;
        const passwordInput = <input 
          className="input-bottom" 
          type="password" 
          name="Password"
          placeholder="Password"
          style={{outline:this.state.bottomInput, border:this.state.borderbottom}}
          onClick={this.toggleFocus}
          onChange={getPassword}
        />;
          return(
            <div className="cover">
            <img src="sparLogo.png" alt="Spar Logo" width="300px"/>
            <div className="content">
                <h1 className="top-label">Artee Industries Limited</h1>
                <img src="logo.png" alt="Spar Logo" width="100px"/>
                <div className="input">
                <p>{usernameInput}</p>
                <p>{passwordInput}</p>
                <p className="error">{this.state.err}</p>
                </div>
                {this.signin}
                </div>
            </div>
          );
      }
      
      componentDidMount(){
        var subs = Meteor.subscribe('LoginDetails');
        
        Tracker.autorun(()=>{
          
          if (subs.ready()){
            userValue = LoginDetails.find().fetch()[0].username;
            passValue = LoginDetails.find().fetch()[0].password;
            this.setState({
              username:userValue,
              password:passValue
            })
           
          }
        })
        
        
      }
  }