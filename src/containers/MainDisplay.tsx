/**
 * @name MainDisplay
 * @desc Highest component in hierarchy that holds Dashboard, DependencyGraphContainer, ChartContainer, and ServiceSettingsContainer
 **/

import React, { useContext, useState } from "react";
import { Dashboard } from "./Dashboard";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { ChartContainer } from "./ChartContainer";
import { DependencyGraphContainer } from "./DependencyGraphContainer";
import { SettingsContainer } from "./ServiceSettingsContainer";
import { SignIn } from "./SignInContainer";
import { globalContext } from "../contexts/globalContext";
import { HistoricalProvider } from "../contexts/historicalContext";
import { DynamicProvider } from "../contexts/dynamicContext";
import Typography from "antd/es/typography";
import Menu from "antd/es/menu";
import Layout from "antd/es/layout";
import Modal from "antd/es/modal";
import Button from "antd/es/button";
const { Title } = Typography;
const { Sider, Content } = Layout;


function MainDisplay(): JSX.Element {
  const { verification, setVerification } = useContext(globalContext);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSignout = () => {
    console.log("handleSignout");
    setIsModalVisible(false);
    setVerification(false);
    console.log(isModalVisible);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const large: any = "large";

  if (!verification) {
    return <SignIn />;
  } else {
    return (
      <HistoricalProvider>
        <DynamicProvider>
          <Router>
            <Switch>
              <Layout hasSider={true}>
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
                    <div style={{ width: 200, justifyContent: "center" }}>
                      <Button
                      
                        onClick={showModal}
                        block={false}
                        type={"primary"}
                        style={{
                          position: "absolute",
                          zIndex: 10,
                          bottom: 20,
                          marginBottom: 70,
                          marginLeft: 50,
                        }}
                      >
                        Sign Out
                      </Button>
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
                        <Button
                          key="submit"
                          type="primary"
                          onClick={handleSignout}
                        >
                          Sign Out
                        </Button>,
                      ]}
                    >
                      Are you sure you want to end this session?
                      <br></br>
                      All unsaved session configurations will be lost.
                    </Modal>
                    {/* <h1 style={{ position: 'absolute', zIndex: 10, marginLeft: 20, bottom: 20, marginBottom: 100}}>test</h1> */}
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
                    <Route
                      path="/dependencyGraph"
                      component={DependencyGraphContainer}
                    />
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
