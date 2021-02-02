# Venus

A self-hosted service monitoring tool for growing projects. 

## Description

Venus is a lightweight, self-hosted service monitoring tool that provides customizable, real-time and historical data on critical health metrics of service dependencies.

### Overview
* Electron
* TypeScript
* React
* React Router
* AWS (Elasticache, EC2, RDS)
* PostgreSQL
* Redis 
* Websockets
* Danfo.js
* Express
* Ant Design
* Ant Design Charting Libraries 
* Visx / D3

## Motivation

As architectures shift more towards distributed and cloud based systems, the need for centralized and singular source of truth of end point services has grown in value. While many of these services exist as large packages, Venus aims to give users a flexible suite of baseline statistics on their deployed apps. 


## Features
* Real-time rolling averages on service specific KPIs including Availability, Response Time, Load, and Response Error.
* Service specific KPI threshold settings for quick glance report cards.
* Historic panel data on KPI statistics for Past Hour, Past Day, Past Week, Past Month intervals.
* Real-time dependency graph visualizer that maps service structure and statistics. 
* Server side authentication for secure storage and distribution of analytics. 
* Secure Session authentication.

## The Venus Orbit 

-- Insert flow chart of data. 


There are three key phases of The Venus Orbit:
1. Deployment: 
  - When deploying instances of their app, users will require in a Node.js wrapper that intercepts and logs all HTTP/HTTPS requests to external service dependencies. Each wrapper is configured to write these logs to an AWS Elasticache hosted Redis Cluster in a readable stream. The Redis cluster serves as a secure temporary storage for the raw log data that follows LRU queuing protocols. 
2.  Analysis: 
 - The Redis Cluster stream is connected to a EC2 instance of the Venus client in a pub/sub relationship. At a set interval, the Venus client reads from the stream.


## Getting Started

## Development


### Client
Venus is an Electron cross platform desktop app. It is built with React. For Venus to fully function, it most be configured with AWS Elasticache and EC2. Please review documentation below for setup specifications.  


## Potential for Improvement
* The addition of Metrics for dynamic and historic data.
* Webhook integration for user alerts on threshold triggers.
* Persistent user thresholds. 
*

## Authors
* Akshay Suggula [asuggula](https://github.com/asuggula)
* Oliver Roldan [oproldan1](https://github.com/oproldan1)
* Will Kencel [wkencel](https://github.com/wkencel)
* Vlad Munteanu [vxm5091](https://github.com/colinvandergraaf)
* Evan Perlman [evperlman](https://github.com/evperlman)
## License
