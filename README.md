# Spar Help Desk App
# Overview:
	Spar Help Desk App is a general purpose, user limited, Meteor (React) web app, built with Meteor 2.5.3.
	Spar Help Desk App allows Staffs under the authority of the Artee Group Ltd, to access (use) a variety of Spar Appsheet through
	a Click, which would have been, until now, only possible by first getting permission from the appsheet developer, who would
	then provide a use-only link to staff’s email address to access the appsheet.

# Features:
	Fully Responsive
	React 5.0.0
	Sign in with user password or Google
	Inbuilt MongoDB Database
	Add new Appsheet Link
	Delete Existing Appsheet Link (Admin)

# Git Hub Repository: 
	http://github.com/Kennyabby/arteesinglesignin.git

# Environment:
	Actively running t2.micro 8GiB, Amazon Web Service (AWS), Elastic Cloud Computing (EC2) Ubuntu 20.04 Instance, with public 
	IP 34.242.180.128.
# Meteor Installation process:
	The following command were executed in the above environment.
		sudo apt update
		sudo apt install –g npm
		npm install –g meteor
		mkdir Artee
		cd Spar
		meteor create arteesinglesignin
		cd singlesignin
		meteor run

The –g implies a global execution. Installation is not section based.
The folder arteesinglesignin was created in the directory /home/ubuntu/Artee/
The meteor run command was executed after making a cd into directory /home/ubuntu/Artee/singlesignin/
