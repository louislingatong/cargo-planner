# SpaceX Cargo Planner

SpaceX is experiencing an increasing demand of shipments to Mars and has commissioned an application to automate the needed cargo space calculations.

## High level overview

The application should load existing set of shipments over the network. After which they can be filtered, viewed, edited and saved locally for later viewing.

As a first feature it will calculate the required number of cargo bays for each shipment. 

## UI

![](cargo-planner-wireframe.png)

The application will mostly be used on desktop environments but it should be usable on smaller viewports too.

## Functionality

* When the user loads the application it first checks for locally saved shipments and loads them. In case there are none it displays a message asking to load a set over the network.

* Clicking the “Load” button loads all the shipments over the network from /api/shipments. Sample data are in shipments.json

* Clicking the “Save” button saves the existing state of shipments locally for later usage.

* Typing in a search box filters the existing list of loaded shipments by company name.

* Clicking a specific shipment displays the shipment details.

* Each shipment details view should have an unique URL.

* Changing the “Cargo boxes” field recalculates the needed number of cargo bays.

### Calculating the needed number of cargo bays

Each shipment specifies a comma separated string of cargo box units where each unit is represented by a number.

```JSON
{
  "id": "d3ff0c68892",
  "name": "Amazon.com",
  "email": "contact@amazon.com",
  "boxes": "6.8,7.9,3"
}
```

The following shipment consists of 3 cargo boxes with the following units 6.8, 7.9 and 3.

Each Starship cargo bay can hold up to **10** units.

The example shipment would require 2 cargo bays.

Another shipment `6.2,5.9,4,6.9,4.4,1.7,9.5` would require 4 cargo bays.

## Setup and Start

### Installing

Cloning the project.
```
git clone https://bitbucket.org/jayblendit/reactjs-test-work.git
```

Access the project directory.
```
cd reactjs-test-work
```

Install dependencies.
```
npm install
```

Start development server with hot reload at http://localhost:3000.
```
npm start