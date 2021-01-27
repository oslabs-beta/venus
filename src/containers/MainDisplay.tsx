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
import { SettingsContainer } from './ServiceSettingsContainer'
import Typography from "antd/es/typography";
import Menu from "antd/es/menu";
import Layout from "antd/es/layout"
import Modal from 'antd/es/modal';
import Button from 'antd/es/button';
import { SignIn } from "./SignInContainer";
import { myContext } from '../contexts/globalContext';
import { DynamicProvider } from '../contexts/dynamicContext';
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

  const { verification } = useContext(myContext);

  const large: any = "large";


  if (false){
    return <SignIn />
  } else {
  return (
    <DynamicProvider>
    <Router>
      <Switch>
        <Layout className="custom" hasSider={true}>
          <Sider theme="light" style={{position: 'fixed'}}>
          <Title level={2} className="title">VENUS</Title>
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}> 

              <Menu.Item key="1">
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
              <Menu.Item key="4">
                <Link to="/settings">  
                  <div style={{width: "100%", height: "100%"}}>
                     Service Settings
                  </div>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <div style={{width: "100%", height: "100%"}} key="5" onClick={showModal}>
                  Sign Out
                </div>
                <Modal 
                title="Sign Out"
                visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[
                  <Button key="back" onClick={handleCancel}>
                    Return
                  </Button>,
                  <Button key="submit" type="primary" onClick={handleOk}>
                    Sign Out
                  </Button>,
                ]}>
                  Are you sure you want to end this session? 
                  <br></br>
                  All unsaved session configurations will be lost. 
                </Modal>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{marginLeft: 200, minHeight: '100vh', height: 'fit-content',}}>
              <Content>
                <Route path="/" exact component={Dashboard} />
                <Route path="/dependencyGraph" component={DependencyGraphContainer} />
                <Route path="/historicalData" component={ChartContainer} />
                <Route path="/settings" component={SettingsContainer} />
              </Content>
          </Layout>
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>  
      </Switch>
    </Router>
  </DynamicProvider>
  );
}
}

export { MainDisplay };
