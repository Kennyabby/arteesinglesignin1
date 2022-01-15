import React,{Component} from 'react';
import {LoginPage} from './LoginPage';
import {LinkPage} from './LinkPage';


// https://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@github.com/Kennyabby/Artee-Supreme.git
// function insertLink({ username, password }) {
//   LoginDetails.insert({username, password, createdAt: new Date()});
// }

// insertLink({
//   username: 'admin1234',
//   password: 'art@@9091'
// });


var user=""

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
    this.setState({
      view:<LoginPage loggedin={this.goToLink} passUser={this.getUser}/>
      
    })
    window.location.reload();
  }

  goToLink=(e)=>{
    // console.log(user)
    console.log(this.state.user);
    this.setState({
      view:<LinkPage loggedout={this.loggout} currentUser={this.state.user}/>
      
    })
    // window.location.reload();
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
    var pageStatus = this.state.page;
    var subs = Meteor.subscribe('LoginDetails');
    if(pageStatus==="loginPage"){
      this.setState({
        view:<LoginPage loggedin={this.goToLink} passUser={this.getUser}/>
        
      })
    }
    if(pageStatus==="linkPage"){
      this.setState({
        view:<LinkPage loggedout={this.loggout}/>
        
      })
      this.setState({
        page:"linkPage"
      })
    }
    
  }
}

