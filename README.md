# Equip
[Video Demo](https://www.youtube.com/watch?v=TLyb1NhYnUs&feature=youtu.be&ab_channel=AnhV)

Equip is an online marketplace where users can sell, buy, or donate used or new durable medical equipment. Users can add items for sale. Users can also browse and search for and sort items by various categories and distance.

[Link to Backend API](https://github.com/vuonga1103/equip-back-end)


## Table of contents
* [Getting Started](#getting-started)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Tools](#tools)

![Equip](https://i.ibb.co/XXG9wjs/Screen-Shot-2020-09-29-at-9-20-15-PM.png)

<a name="getting-started"/>

## Getting started
1. Install [Rails Backend API](https://github.com/vuonga1103/equip-back-end)
2. Install [Node.js and npm](https://www.npmjs.com/get-npm)

    ```$ brew install node```
    
3. Clone this repo and cd into the directory
4. Install all dependencies

    ```$ npm install```

5. Make sure the Rails server is running and then run the app

    ```$ npm start```
    
<a name="features"/>

## Features

### Find Items
![Find items](https://i.ibb.co/gRrVK3h/Screen-Shot-2020-09-29-at-9-20-28-PM.png)
* Browse items sorted by price and location; use of Google Geocode API and navigator geolocation to enable sort by “near me” 
* Filter items by various categories, enabled by custom logics

### View An Item For Sale
![View items](https://i.ibb.co/J3KZqY5/Screen-Shot-2020-09-29-at-9-20-50-PM.png)
* View item details and item’s location via Google Map API
* Email seller directly via link


### Selling or Donating
![Sell](https://i.ibb.co/tL08MMN/Screen-Shot-2020-09-29-at-9-21-34-PM.png)
* List an item for sale by inputting details and uploading an image of the item; image upload facilitated by use of Cloudinary

### Manage Sale Items
![Manage](https://i.ibb.co/gRWq5xy/Screen-Shot-2020-09-29-at-9-21-57-PM.png)
* Sort sale items by sold status
* Edit and delete sale items


<a name="tech-stack"/>

## Tech Stack
* React.js
* Ruby on Rails API (Backend: https://github.com/vuonga1103/equip-back-end)
* PostgreSQL
* HTML/CSS
* SemanticUI
* Active Record

<a name="tools"/>

## Tools
* [Rack CORS](https://github.com/cyu/rack-cors)
* [ActiveModel::Serializer](https://github.com/rails-api/active_model_serializers)
* [BCrypt](https://github.com/codahale/bcrypt-ruby)
* [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/start)
* [Google Maps API](https://developers.google.com/maps/documentation)
* [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
* [React Scroll to Top Button](https://www.npmjs.com/package/react-scroll-up-button)
* [Cloudinary API](https://cloudinary.com/)
