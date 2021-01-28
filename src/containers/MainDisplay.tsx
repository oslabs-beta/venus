/**
 * @name MainDisplay
 * @desc Highest component in hierarchy that displays both Navigation Bar and Dashboard
 **/

import React, { Component, useContext, useState } from "react";
import { Dashboard } from "./Dashboard";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { ChartContainer } from "./ChartContainer";
import { DependencyGraphContainer } from "./DependencyGraphContainer";
import { SettingsContainer } from "./ServiceSettingsContainer";
import { SignIn } from "./SignInContainer";
// import { EditableTable } from "./ThresholdsTest";
import { globalContext } from "../contexts/globalContext";
import { HistoricalProvider } from "../contexts/historicalContext";
import { DynamicProvider } from "../contexts/dynamicContext";

import Typography from "antd/es/typography";
import Menu from "antd/es/menu";
import Layout from "antd/es/layout";
import Modal from "antd/es/modal";
import Button from "antd/es/button";
const { Title } = Typography;
const { Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

function MainDisplay(): JSX.Element {

  const { verification, setVerification } = useContext(globalContext)

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSignout = () => {
    setIsModalVisible(false);
    setVerification(false)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    
  };


  const large: any = "large";

  if (verification) {
    return <SignIn />;
  } else {
    return (
    <HistoricalProvider>
      <DynamicProvider>
        <Router>
          <Switch>
            <Layout className="custom" hasSider={true}>
              <Sider theme="light" style={{ position: "fixed" }}>
                <Title level={2} className="title">
                  VENUS
                </Title>
                <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
                  <Menu.Item key="1">
                    <Link to="/">
                      <div style={{ width: "100%", height: "100%" }}>
                        Current Status
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/historicalData">
                      <div style={{ width: "100%", height: "100%" }}>
                        Historical Status
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to="/dependencyGraph">
                      <div style={{ width: "100%", height: "100%" }}>
                        Dependency Graph
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <Link to="/settings">
                      <div style={{ width: "100%", height: "100%" }}>
                        Service Settings
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <div
                      style={{ width: "100%", height: "100%" }}
                      key="5"
                      onClick={showModal}
                    >
                      Sign Out
                    </div>
                    <Modal
                      title="Sign Out"
                      visible={isModalVisible}
                      onOk={handleSignout}
                      onCancel={handleCancel}
                      footer={[
                        <Button key="back" onClick={handleCancel}>
                          Return
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleSignout}>
                          Sign Out
                        </Button>,
                      ]}
                    >
                      Are you sure you want to end this session?
                      <br></br>
                      All unsaved session configurations will be lost.
                    </Modal>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout
                style={{
                  marginLeft: 200,
                  minHeight: "100vh",
                  height: "fit-content",
                }}
              >
                <Content>
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/dependencyGraph" component={DependencyGraphContainer}/>
                  <Route path="/historicalData" component={ChartContainer} />
                  <Route path="/settings" component={SettingsContainer} />
                </Content>
              </Layout>
            </Layout>
          </Switch>
        </Router>
      </DynamicProvider>
    </HistoricalProvider>
    );
  }
}

export { MainDisplay };