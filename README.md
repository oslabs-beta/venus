
<div align="center">
  <img src="./assets/venus.png" width="225px" marginTop= "30px"/>
  </div>

<h1 align="center">Venus</h1>


#
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/oslabs-beta/venus)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)


## Table of Contents

[Install Dependencies](#install-dependencies)

- [Description](#description)
- [Motivation](#motivation)
- [Features](#features)
- [A Brief Overview of Venus](#A-Brief-Overview-of-the-Venus-Orbit)
- [Getting Started with Venus](#Getting-started-with-venus)
  - [Clone the Repo](#Clone-the-repo)
  - [Install Dependencies and Run Scripts](#Install-Dependencies-and-run-scripts)
  - [Configuring the Agent](#Configuring-the-Agent-with-Node.js-and-AWS-Elasticache)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

#
#### [Return to Top](#Venus)

<br>

## Description

Venus is a lightweight, self-hosted service monitoring tool that provides customizable, real-time and historical data on critical health metrics of service dependencies.

<br>

## Motivation

<<<<<<< HEAD
As the popularity of distributed server architectures has grown, so has the need for a centralized and singular source of truth on the health. While many of these services exist as large packages, Venus aims to give users a flexible suite of baseline statistics on their deployed apps. Additionally, Venus is configured within AWS so users will have direct access to their logs and only pay market rate for storage and computation as their apps grow in size. 
=======
As the popularity of microservice architectures has grown, managing the complexity and keeping tabs on the health of service dependencies is increasingly critical. While many service monitoring solutions exist as a subset of heavier end-to-end solutions, Venus aims to provide a point solution that gives users a flexible, lightweight solution that enables them to monitor KPIs on all of their applications. Additionally, Venus is self-hosted and therefore users only incur costs for storage and compute. 
>>>>>>> main

<br>

## Features
* Real-time rolling averages on service specific KPIs including Availability, Response Time, Load, and Error Rate.
* Service specific KPI threshold settings for quick glance report cards.
* Historic panel data on KPI statistics for Past Hour, Past Day, Past Week, Past Month intervals.
* Dependency Graph visual that maps service structure and methods. 
* Server side authentication for secure storage and distribution of analytics. 

<br>

## A Brief Overview of the Venus Orbit 

<img src="./assets/VenusFlow.jpg" align-items="center" width="100%" />

There are three key phases of The Venus Orbit:

1. Collecting data: 
  - When deploying instances of an app, users will require in a Node.js wrapper that intercepts and logs all HTTP/HTTPS requests and responses to external service dependencies. Each wrapper is configured to write these logs to a read/write stream configured on a Redis cluster. The Redis cluster serves as a secure temporary storage for the raw log data, following LRU caching protocols. 
  
2. Analyzing data: 
 - The Redis Cluster stream is then read from the Venus server and at a specified interval, the server reads from the stream and pipes the data to a Danfo.js based module for analysis. After analysis, the data is sent via websocket to the GUI for visualization. 
 - For historical data, the Venus server pipes the data from the Redis stream at a specified cadence and is then processed, analyzed and stored in a series of cascading data tables ready to be served. Panel data flows to the frontend interface via a RESTful API.
 
 3. Viewing data: 
 - To view the data, users must launch a local version of the Venus Electron GUI. Upon load, users will be prompted to enter the full server address of their server instance. Upon render, the websocket handshake is established with Venus server instance and both real-time and historic data is automatically fetched and rendered. 
 - Service specific analytics will populate the dashboard and will continue to give users updates on their server until they end their session by navigating to the Sign Out tab. A successful sign out wipes all session data and returns users to the Venus login page.    



#
##### Return to [Top](#Venus)

<br>

# Getting Started With Venus 


## Clone the Repo

```
git clone https://github.com/oslabs-beta/venus.git
```

<br>

## Install Dependencies and Run Scripts

within the parent directory of Venus download the dependencies. 

```
npm install
```
run 
```
npm run dev:react
```
then in a second concurrent terminal run
```
npm run dev:electron
```

## Configuring the Agent with Node.js and AWS Elasticache.



<br>

## Technologies
- <a href="#"><img src="./assets/electron-logo-color.png" alt="Electron" title="Electron" align="center" height="30" /></a>

- <a href="#"><img src="./assets/ts-logo-long-blue.png" alt="TypeScript" title="TypeScript" align="center" height="30" /></a>

- <a href="#"><img src="./assets/js-logo-color.png" alt="JavaScript" title="JavaScript" align="center" height="30" /></a>

- <a href="#"><img src="./assets/react-logo-color.png" alt="React" title="React" align="center" height="30" /></a>

- <a href="#"><img src="./assets/aws-logo-color.png" alt="AWS" title="AWS" align="center" height="30" /></a> 

- <a href="#"><img src="./assets/postgres-logo-color.png" alt="PostgreSQL" title="PostgreSQL" height="30" /></a>

- <a href="#"><img src="./assets/Redis_Logo.svg.png" alt="Redis" title="Redis" height="30" /></a> 

- <a href="#"><img src="./assets/websockets-logo.png" alt="Websockets" title="Websockets" height="30" /></a> 

- <a href="#"><img src="./assets/danfo-js-logo.png" alt="Danfo.js" title="Danfo.js" height="25" /></a> 

- <a href="#"><img src="./assets/express-logo-color.png" alt="Express" title="Express" height="30" /></a> 

- <a href="#"><img src="./assets/antdesign-logo.png" alt="antDesign" title="antDesign" height="30" />  Ant Design</a> 

- <a href="#"><img src="./assets/Visx-D3-React-logo.jpeg" alt="Visx" title="Visx" height="35" /></a>  

- <a href="#"><img src="./assets/jest-logo-color.png" alt="Jest" title="Jest" height="30" /></a>  

- <a href="#"><img src="./assets/enzyme-logo-color.png" alt="Enzyme" title="Enzyme" height="30" /></a>

<br>

## Contributing

Development of Venus is open source on GitHub through the tech accelerator umbrella OS Labs, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving Venus.



### Potential for Improvement
* The addition of Metrics for dynamic and historic data.
* Webhook integration for user alerts on threshold triggers.
* DB storage for user thresholds. 


<br>

- [Contributing](https://github.com/oslabs-beta/Venus/blob/main/CONTRIBUTING.md)

<br>

## Authors
* Akshay Suggula [asuggula](https://github.com/asuggula)
* Oliver Roldan [oproldan1](https://github.com/oproldan1)
* Will Kencel [wkencel](https://github.com/wkencel)
* Vlad Munteanu [vxm5091](https://github.com/colinvandergraaf)
* Evan Perlman [evperlman](https://github.com/evperlman)

## Special Thanks:
Sanjay Lavingia, Shyam Venkataraman, Kesav Mulakaluri, Santosh Mohan, Mike Soennichsen, Julie Wu, Will Bladon, Justin Cohen and Nick de los Santos Jr. for their thoughtful feedback and guidance.  

## License

#MIT


#
#### [Return to Top](#Venus)
