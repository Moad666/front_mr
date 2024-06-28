// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SideBar from "./components/SideBar";
import KanbanPage from "./pages/KanbanPage"
import BusnessRuleDisplay from "./pages/BusnessRuleDisplay";
import Sidebar2 from "./components/Sidebars/Sidebar2";
import { Outlet } from "react-router-dom";
import { Modal } from 'antd';
import { useState } from "react";
import Chatbotassiatance from "./pages/Chatbotassiatance";

function Main() {


  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{display:"flex",width:"100%"}}>
      <div style={{width:"5%"}}>
        <Sidebar2 open={showModal}  close={handleCancel}/>
      </div>
      <div style={{width:"95%"}}>
      <Outlet />
      </div>
    </div>
  );
}

export default Main;
