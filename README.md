
# ![chg-recognition](https://2213cede40a604584215-9ee96f1966c66f3d8052e4acb786f895.ssl.cf1.rackcdn.com/2017/03/coreValues-%20web.jpg)

Application built for Hack-Days March 2020. This is the backend service for a recognition application that allows users to nominate individuals for exemplary displays of living CHG Healthcare's Core Values. 

Users are given a set amount of points per week, and they are encouraged to gift those points to users throughout the week through Nominations. Any points not spent in that week, are lost and the new week resets the amount of points to give.

Any points received through nominations, can be accrued indefinitely and exchanged for various rewards with varying levels of points. For example, going to Presidents Club is an option to purchase but costs significantly more points than a $10 gift card to the CHG Cafeteria. This may require saving points for multiple years to earn the higher tier rewards.

Nominations, points to give and points accrued can be viewed through the link on the Intranet that will take you to our Web App, but we also have mobile native applications for Android and IOS.


# Getting started
To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `node src` to start the local server
- interact with postman/insomnia/curl at http://localhost:8081/

## Application Structure

- `index.js` - The entry point to our application. This file defines our express server and connects it to MongoDB. Initial start loads an initial dataset into the in memory MongoDB. (could change if we move away from in memory).
- `./routes/` - This folder contains the route definitions for our API.
- `./database/` - This folder contains the methods and functions for interacting with the Mongo DB.

## EndPoints
### /Users
Route for endpoints for interacting with Users of the application.

#### GET
All users endpoint and sample return
```json 
http://.../users/
[
    {
        "_id": "5e729a3c6ea33327d2851b4e",
        "name": "Justin Smith",
        "login": "justin.smith@chghealthcare.com",
        "points": 250,
        "nominationPoints": 100
    },
    {
        "_id": "5e729a3c6ea33327d2851b4f",
        "name": "Trevor Duersch",
        "login": "trevor.duersch@chghealthcare.com",
        "points": 387,
        "nominationPoints": 37
    },
    {
        "_id": "5e729a3c6ea33327d2851b50",
        "name": "Ryan Hamblin",
        "login": "ryan.hamblin@chghealthcare.com",
        "points": 353,
        "nominationPoints": 84
    },
    {
        "_id": "5e729a3c6ea33327d2851b51",
        "name": "Curtis Porter",
        "login": "curtis.porter@chghealthcare.com",
        "points": 512,
        "nominationPoints": 15
    }
]
```
#### GET
Specific users endpoint and sample return. Must include ID
```json 
http://.../users/:id
[
    {
        "_id": "5e729a3c6ea33327d2851b51",
        "name": "Curtis Porter",
        "login": "curtis.porter@chghealthcare.com",
        "points": 512,
        "nominationPoints": 15
    }
]
```

### /Nominations
Route for submitting and retrieving nominations
- add GET\POST\PUT\DELETE Information here
### /Rewards
Route for getting Rewards. Can retrieve in bulk, or by individual Id.
- add GET Information here
### /Redeem
Route for endpoints to Redeem points for Reward or view all past Redemptions
- add GET\POST\PUT\DELETE Information here


