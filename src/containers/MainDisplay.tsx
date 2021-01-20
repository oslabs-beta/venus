/**
 * @name MainDisplay
 * @desc Highest component in hierarchy that displays both Navigation Bar and Dashboard
 **/

//imports to be used in file
import React, { Component, useContext } from "react";
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Dashboard } from "./Dashboard";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { AddService } from "../components/AddService";
import { ChartContainer } from "./ChartContainer";
import { DependencyGraph } from "./DependencyGraph";
import Button from "antd/es/button";
import Typography from "antd/es/typography";
import Menu from "antd/es/menu";
import Layout from "antd/es/layout"
import Space from "antd/es/space"
const { Title } = Typography;
const { Header, Sider, Content} = Layout

// import 'antd/dist/antd.less';



function MainDisplay(): JSX.Element {
  const large: any = "large";
  return (
    <Router>
      <Switch>
        <Layout className="custom" style={{minHeight:"100vh", minWidth: "100vw"}} hasSider={true}>
          <Sider theme="light">
          <Title level={2} className="title">VENUS</Title>
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" >
                <Link to="/">
                  <div style={{width: "100%", height: "100%"}}>
                    Current Status
                  </div>
                </Link>
              </Menu.Item>
              <Menu.Item key="2" >
                <Link to="/historicalData">
                <div style={{width: "100%", height: "100%"}}>
                    Historical Status
                  </div>
               </Link>
              </Menu.Item>
              <Menu.Item key="3" >
                <Link to="dependencyGraph">  
                  <div style={{width: "100%", height: "100%"}}>
                    Dependency Graph
                  </div>
                </Link>
              </Menu.Item>
            </Menu>
              <div className="addService">
                <AddService />
              </div>
            </Sider>
          <Layout>
            <Header style={{backgroundColor: "#fff"}}/>
              <Content>
                <Route path="/" exact component={Dashboard} />
                <Route path="/historicalData" component={ChartContainer} />
                <Route path="/dependencyGraph" component={DependencyGraph} />
              </Content>
          </Layout>
        </Layout>  
      </Switch>
    </Router>
  );
}

export { MainDisplay };
