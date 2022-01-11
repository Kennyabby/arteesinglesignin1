import React,{Component} from 'react';
import { AppsheetLink } from '/imports/api/links';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import {AddForm} from './AddForm';


var linkList="";

function gotoLink(e){
    var appsheetLink = e.target.getAttribute("url");
    window.open(appsheetLink, "_blank");

}


export class LinkPage extends Component{
    
    constructor(){
        super();
        this.state={
            link:[],
            addView:"",
            displayStatus:"inline-flex"
        }
    }

    removedForm=()=>{
        console.log("adding it back");
        this.setState({
            displayStatus:"inline-flex"
        })
        
    }
    addLink=(e)=>{
        // console.log(e.currentTarget)
        this.setState({
            displayStatus:"none"
        })

        this.setState({
            addView:<AddForm update={this.removedForm}/>
        })
    }
    
    render(){
    
        return(
            <div>
                <p className='top-label1'>Choose a link</p>
                <div className='cover1'>
                    {this.state.link.map((link,id)=>{
                        var urlVal=link.url;
                        // console.log(urlVal);
                        return(
                        <div key={id} className="content1" title={link.url} onClick={gotoLink}>
                            <h1 key={id} url={urlVal}>{link.title}</h1>
                        </div>)
                    })}
                </div>

                <div className='addLink' style={{display:this.state.displayStatus}} onClick={this.addLink}>
                    <img src="add.png" alt="add appsheet link" title="Click to add link" height="50px"/>    
                </div>
                {this.state.addView}
            </div>
            
        )
    }

    componentDidMount(){
        var sub = Meteor.subscribe('AppsheetLink');
        Tracker.autorun(()=>{
            if (sub.ready()){
                linkList=AppsheetLink.find().fetch();
                this.setState({
                    link:linkList
                })
                
            }
        })
    }
}