import React,{Component} from 'react';
import {LoginPage} from './LoginPage';


// https://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@github.com/Kennyabby/Artee-Supreme.git
// function insertLink({ username, password }) {
//   LoginDetails.insert({username, password, createdAt: new Date()});
// }

// insertLink({
//   username: 'admin1234',
//   password: 'art@@9091'
// });




export class App extends Component{

  constructor(){
    super();
    this.state={
      view:<LoginPage loggedin={this.goToLogin}/>
    }
  }
  
  goToLogin=(linkPage)=>{
    this.setState({
      view:linkPage
      
    })
    
  }

  render(){
    return(
      this.state.view
    );
  }
}

