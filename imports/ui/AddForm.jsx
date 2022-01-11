import React,{Component} from 'react';
import { AppsheetLink } from '/imports/api/links';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'

var title="";
var url="";

const getAppName=(e)=>{
    title=e.target.value;
    console.log(title);
}

const getAppUrl=(e)=>{
    url=e.target.value;
}

const appName = <input className='formInput' type="text" placeholder='Enter Appsheet Name' onChange={getAppName}/>;
const appUrl = <input className='formInput' type="text" placeholder='Enter Appsheet Link' onChange={getAppUrl}/>;
export class AddForm extends Component{
    constructor(props){
        super(props);
    }

    updateLinks=()=>{
        var sub = Meteor.subscribe('AppsheetLink');
        var count=0;
        Tracker.autorun(()=>{
            if (sub.ready()){
                count++;
                if (count===1){
                    // console.log(AppsheetLink.find().fetch());
                    AppsheetLink.insert({
                        title:title,
                        url:url,
                        createdAt: new Date()
                    })
                    this.props.update();
                // console.log(AppsheetLink.find().fetch());
                }
            }
        })
        
    }
    
    render(){
        return(
            <div>
                <div className='formDetails'>
                    <p><b>Name:</b> {appName}</p>
                    <p><b>Url:</b> {appUrl}</p>
                    <button className='add' onClick={this.updateLinks}>Add</button>
                </div>

                
            </div>
        );
    }
}