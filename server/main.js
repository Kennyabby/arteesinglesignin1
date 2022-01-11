import { Meteor } from 'meteor/meteor';
import { AppsheetLink } from '/imports/api/links';
import { LoginDetails } from '/imports/api/userLogin';

// AppsheetLink.find().fetch();
// LoginDetails.find().fetch();
// const LoginDetails = new Mongo.Collection("LoginDetails");
// console.log("hello world");
if(Meteor.isServer) {
    
    Meteor.startup(function () {
      //  AppsheetLink.insert({
      //   title:"Artee Visitor Regulator",
      //   url:"https://www.appsheet.com/start/e20ae8b0-dc92-40fd-b080-a8fbc767b0ea",
      //   createdAt:new Date()
      //  })
      //  AppsheetLink.insert({
      //   title:"Artee Ticketing 2021",
      //   url:"https://www.appsheet.com/start/345a570c-710d-4a30-9d56-a6450994860b",
      //   createdAt:new Date()
      //  })
      //  AppsheetLink.insert({
      //   title:"Artee Vehicle Inspection",
      //   url:"https://www.appsheet.com/start/8f7ae2fa-acdb-42f0-afb3-cd2fe696c9a2",
      //   createdAt:new Date()
      //  })
      //  AppsheetLink.insert({
      //   title:"Artee Vehicle Inspection",
      //   url:"https://www.appsheet.com/start/8f7ae2fa-acdb-42f0-afb3-cd2fe696c9a2",
      //   createdAt:new Date()
      //  })
    //   Myvars = new Mongo.Collection("myvars");
      LoginDetails.allow({
        insert: function () {
          return true;
        },
        update: function () {
          return true;
        },
        remove: function () {
          return true;
        }
      });

      AppsheetLink.allow({
        insert: function () {
          return true;
        },
        update: function () {
          return true;
        },
        remove: function () {
          return true;
        }
      });

    Meteor.publish("LoginDetails", function(){

        return LoginDetails.find();
    });
    Meteor.publish("AppsheetLink", function(){

        return AppsheetLink.find();
    });
    });
}

  