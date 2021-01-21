/**
 * @name MainDisplay
 * @desc Highest component in hierarchy that displays both Navigation Bar and Dashboard
 **/

//imports to be used in file
import React, { Component, useContext, useState } from "react";
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Dashboard } from "./Dashboard";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { ChartContainer } from "./ChartContainer";
import {  DependencyGraphContainer } from "./DependencyGraphContainer";
import Typography from "antd/es/typography";
import Menu from "antd/es/menu";
import Layout from "antd/es/layout"
// import Space from "antd/es/space"
import Modal from 'antd/es/modal';
import { InputForm } from "../components/InputForm"
import { SignIn } from "./SignInContainer";
const { Title } = Typography;
const {Footer, Sider, Content} = Layout
const { SubMenu } = Menu

function MainDisplay(): JSX.Element {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
              <Menu.Item key="3">
                <Link to="/dependencyGraph">  
                  <div style={{width: "100%", height: "100%"}}>
                    Dependency Graph
                  </div>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <div style={{width: "100%", height: "100%"}} key="4" onClick={showModal}>
                  Add Service
                </div>
                <Modal title="Add Dependency" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                  <InputForm />
                </Modal>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/signin">  
                  <div style={{width: "100%", height: "100%"}}>
                    Sign In
                  </div>
                </Link>
              </Menu.Item>
            </Menu>
            </Sider>
          <Layout>
              <Content>
                <Route path="/" exact component={Dashboard} />
                <Route path="/dependencyGraph" component={DependencyGraphContainer} />
                <Route path="/historicalData" component={ChartContainer} />
                <Route path="/signin" component={SignIn} />
              </Content>
          </Layout>
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>  
      </Switch>
    </Router>
  );
}

export { MainDisplay };
