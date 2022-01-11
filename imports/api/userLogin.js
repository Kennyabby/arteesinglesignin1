import { Mongo } from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const LoginDetails = new Mongo.Collection('LoginDetails');

// if (Meteor.isServer) {
//     // This code only runs on the server
//     Meteor.publish('LoginDetails', function tasksPublication() {
//         return LoginDetails.find();
//     });
// }

if(Meteor.isClient) {
    Meteor.subscribe('LoginDetails');
    // Meteor.startup(function() {
      
      
    // });
}