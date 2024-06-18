# How to run<br>
Before running, make sure that you have node.js installed. If you have it/downloaded it, run `npm install` in the frontend and backend directories. Once this is done, run `npm start` in the backend directory to connect to the port, needed for email authentication. Then, run `npm start` in the frontend directory to start up the application, connecting it to the MongoDB. If for some reason there is an error saying a package doesn't exist, then just run `npm install <package name>`. 

# IMPORTANT NOTE (please read)<br>
The TAs and Professor Edmison should have been invited to our project in MongoDB. Go to that project on the Mongo website and add your IP into the project. To add your IP, once you log into MongoDB and access our project, you should see a prompt that asks you to add your IP address. Otherwise, click on "Network Acess", which should be found on the left of your screen, under "Security". You should be able to add your IP address here. This will allow you to connect to the database from your machine. If you don't do this, then none of the product information will appear on our website. Right now, only Dr Edmison and Xiaoxiao should be able to add their IP address, because they have accepted the invitation to the project, so we have been able to modify their role, to allow them to add their own IP addresses. This should be similar to what the main page looks like if you have access:

![alt text](mainpage.png)

# Using the site<br>
This section is to just give a brief overview on the pages of the site.

This is the homepage. Entering "vt" or "virginia tech" into the search bar will take you to the main page which is what you have seen above.

![alt text](homepage.png)

This is the listing page. You can make a new listing here.

![alt text](listing.png)

This is the login/registration page. Creating a new account will send you an email verification code to make that account. 

![alt text](login.png)

# Additional notes<br>
The search bar in the main page and returns and orders tab currently are not implemented. We will implement them in the future if we decide to continue with this project. 
