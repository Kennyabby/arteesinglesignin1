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
function cancleLink(e){
    console.log("got the request to cancle!");
    var url = e.target.getAttribute("urll");
    var id = e.target.getAttribute("id");
    var subs = Meteor.subscribe('AppsheetLink');
    var counts=0;
    Tracker.autorun(()=>{
        if (subs.ready()){
            counts++;
            if (counts===1){
                AppsheetLink.remove({
                    _id: id
                });   
            }
        }
    })
    
}


export class LinkPage extends Component{
    
    constructor(props){
        super(props);
        this.state={
            link:[],
            addView:"",
            displayStatus:"inline-flex",
            search:""
        }
    }

    removedForm=(e)=>{
        
        this.setState({
            displayStatus:"inline-flex",
            addView:""
        })
        
    }
    addLink=(e)=>{
        // console.log(e.currentTarget)
        this.setState({
            displayStatus:"none"
        })

        this.setState({
            addView:<AddForm updates={this.removedForm}/>
        })
    }
    gotoLogin=()=>{
        // console.log("going to login page");
        // this.props.loggedout;
        location.reload();
    }
    changeDetect=(e)=>{
        var subs = Meteor.subscribe('AppsheetLink');
        this.setState({search: e.target.value.toLowerCase()});
        Tracker.autorun(()=>{
            if (subs.ready()){
                var list = AppsheetLink.find().fetch();
                var newLinkList=linkList.filter(list=>{return (list.title.toLowerCase().includes(this.state.search))});
                console.log(newLinkList);
                this.setState({
                    link:newLinkList
                })
                
            }
        })
    }
    
    render(){
    
        return(
            <div>
                <p className='logout' title="Click to Log out" onClick={this.gotoLogin}>Logout</p>
                <div><h1 className='top-label1'>ARTEE SINGLE SIGNIN</h1></div>
                <div className='addLinkLeft' style={{display:this.state.displayStatus}} onClick={this.addLink}>
                    <img src="add.png" alt="add appsheet link" title="Click to add a new link" height="50px"/>    
                </div>
                <div className='addLinkRight' style={{display:this.state.displayStatus}} onClick={this.addLink}>
                    <img src="add.png" alt="add appsheet link" title="Click to add a new link" height="50px"/>    
                </div>
                {this.state.addView}
                <div className='sch'><p><input className="search" type="search" placeholder="Search for Link" onChange={this.changeDetect}/></p></div>
                <p className='top-label1'>Choose a link</p>
                <div style={{textAlign:"center"}}>
                    <div className='cover1'>
                        {this.state.link.map((link,id)=>{
                            var urlVal=link.url;
                            // console.log(urlVal);
                            return(
                            <div key={id} className="content1" url={urlVal} title={link.url}>
                                <img urll={urlVal} id={link._id} src="cancle.png" className="cancleUrl" title="remove link" src="cancle.png" alt="cancle link" onClick={cancleLink}/>
                                <img url={urlVal} src="logo.png" alt="appsheet link" height="200px" onClick={gotoLink}/>
                                <h1 key={id} url={urlVal} onClick={gotoLink}>{link.title}</h1>
                            </div>)
                        })}
                    </div>
                </div>
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