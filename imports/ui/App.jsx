import React,{Component} from 'react';
import {LoginPage} from './LoginPage';
import {LinkPage} from './LinkPage';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { LoginDetails } from '/imports/api/userLogin';


// https://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@github.com/Kennyabby/arteesinglesignin.git
// function insertLink({ username, password }) {
//   LoginDetails.insert({username, password, createdAt: new Date()});
// }

// insertLink({
//   username: 'admin1234',
//   password: 'art@@9091'
// })
// console.log(process.env("GITHUB_LINK"))
var currentUser=""
var num=0;

export class App extends Component{

  constructor(){
    super();
    this.state={
      view:"",
      page:"loginPage",
      user:""
    }
  }
  loggout=(e)=>{
    window.sessionStorage.removeItem("username");
    LoginDetails.update({_id : user._id},{$set:{active:"off"}});
    this.setState({
      view:<LoginPage loggedin={this.goToLink} passUser={this.getUser}/>
      
    })
    
    window.location.reload();
  }

  goToLink=(e)=>{
    
    // console.log(this.state.user);
    this.setState({
      view:<LinkPage loggedout={this.loggout} currentUser={this.state.user}/>
      
    })
    
  }
  getUser=(user)=>{
    user=user;
    this.setState({
      user:user
    })
  }

  render(){
    return(
      this.state.view
    );
  }
  componentDidMount(){
  
    var subs = Meteor.subscribe('LoginDetails');
    if (sessionStorage.getItem("username")!==null){
      Tracker.autorun(()=>{
        
        if (subs.ready()){
          num++;
          if (num===1){
            currentUser=LoginDetails.find().fetch().filter(user=>{
                            
                if (user.username===sessionStorage.getItem("username")){
                    
                    return user;
                }
                
            });
            console.log(currentUser[0]);
            if(currentUser[0].active==="on"){
              console.log("yes it's on")
              // if(this.state.user!==""){
                
              // }else{
              //   this.setState({
              //     view:<LoginPage loggedin={this.goToLink} passUser={this.getUser}/>
                  
              //   })
              // }
              this.setState({
                view:<LinkPage loggedout={this.loggout} currentUser={this.state.user}/>
                
              })
            }else{
              this.setState({
                view:<LoginPage loggedin={this.goToLink} passUser={this.getUser}/>
                
              })
            }
          }
        }
      })
    }else{
      this.setState({
        view:<LoginPage loggedin={this.goToLink} passUser={this.getUser}/>
        
      })
    }
    
    
    
    // if(pageStatus==="loginPage"){
      
    // }
    // if(pageStatus==="linkPage"){
    //   this.setState({
    //     view:<LinkPage loggedout={this.loggout}/>
        
    //   })
    //   this.setState({
    //     page:"linkPage"
    //   })
    // }
    
  }
}

