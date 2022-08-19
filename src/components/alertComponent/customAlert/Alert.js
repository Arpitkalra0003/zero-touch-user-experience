/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import "./alert.css";
import BacklogImg from "../../assets/dell-png-logo-0.png";
import { Button } from 'antd';
import useCustomAlertHook from "../../../hooks/useCustomAlertHook";
import { Select } from 'antd';
import React from 'react';
const { Option } = Select;



const Alert = ({

  setStartProcess,  
}) => {
  const { setValidate,updateStartProcess } = useCustomAlertHook();

  function handleChange (value){
    console.log(`selected ${value}`);
   
  };


  useEffect(() => {
    const confirmDialog = () => {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="react-confirm-alert-body">
              <div className="alert-content">
              <img
                    style={{ width: 55, height: 55, marginRight: 12 }}
                    className="react-confirm-alert-img"
                    src={BacklogImg}
                    alt="logo"
                  />
                <div className="logoAlert">
                 
                  <strong style={{ color: "#000" }}>
                    Please check your internet connection
                  </strong>
                </div>
              
              </div>
              <div className="subtitleAlert">
           
    <Button type="primary"  className="go-btn" onClick={() => {
                      onClose();
                      setStartProcess(true)
                    }}>Ok</Button>
  
              </div>
             
            </div>
          );
        },
      });
    };
    confirmDialog();
  }, []);

  return <div className="container"></div>;
};
export default Alert;
