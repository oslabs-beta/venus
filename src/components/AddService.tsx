// /**
//  * @name TabContainer
//  * @desc Child of Navbar.jsx, parent container that hosts each tab displayed in NavBar
//  */

import React, { useContext, useState, useEffect, ContextType } from 'react';
import Button from 'antd/es/button';
import Modal from 'antd/es/modal';
import { InputForm } from "./InputForm"




function AddService(): JSX.Element {
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

  return (
    <>
      <Button type="primary" onClick={showModal} shape={"round"} size={"large"}>
        Add Service
      </Button>
      <Modal title="Add Dependency" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <InputForm />
      </Modal>
    </>
  );
};

export { AddService };
