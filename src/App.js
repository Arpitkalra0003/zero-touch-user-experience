import Layout, { Content, Header } from "antd/lib/layout/layout";
import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import BacklogImg from "./components/assets/dell-png-logo-0.png";
import "./App.css";
import { Collapse } from 'antd';

import { Offline, Online } from "react-detect-offline";
import useMobile from "./hooks/useMobile";
// import NoMobile from "./components/assets/smartphone.svg";
import useCustomAlertHook from "./hooks/useCustomAlertHook";
import "antd/dist/antd.css";
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Steps } from 'antd';

const { Panel } = Collapse;

const WMStext = 
// WMS local server with citrix credential
['Connecting to WMS server',
  'wms: device tries to check-in.',
  'wms: checked in to WMS server.',
  'wms: sync group list, the number of added group: 0, removed group: 0',
  'wms: tries to get full configuration.',
  'wms: tries to get package policy from server.',
  'wms: received Group Policy Changed command.',
  'wms: connected to MQTT broker: tcp://N038URVVVWYSE01.sof.socds.mil:1883',' ',
  'Connecting to the Citrix server',
'[Citrix] login to broker "http://citrixready.cloud.com"',
'LOCAL APP: access sensitive data.',
'WLAN0: Obtain IP Address 172.16.205.156',
'IP Address -> "172.16.205.156"',
'Subnet Mask -> "255.255.224.0"',
'Gateway -> "172.16.192.1"',
"DHCP lease time -> '01:46:29'",
"DHCP Server -> '192.168.0.10'",
"Connected",
"Redirecting to default Configuration…"] 
// WMS local server with citrix server failed and trying local vmware connection
/* 
  ['Connecting to WMS server',
    'wms: device tries to check-in.',
    'wms: checked in to WMS server.',
    'wms: sync group list, the number of added group: 0, removed group: 0',
    'wms: tries to get full configuration.',
    'wms: tries to get package policy from server.',
    'wms: received Group Policy Changed command.',
    'wms: connected to MQTT broker: tcp://N038URVVVWYSE01.sof.socds.mil:1883',' ',
    'Connecting to the Citrix server',
  '[Citrix] login to broker "http://citrixready.cloud.com"',
  'LOCAL APP: access sensitive data.',
  "Citrix: login failed",

  "vmware-view:  VMwarelogin to broker '100.100.1.90'",

  "vmware-view: Horizon: connection broker initialized.",

  "LOCAL APP: access sensitive data.",

  "launch vmware-view daemon success",

  "vmware-view    /vmware-view    Horizon daemon start, Owner id is: 1.",

  "vmware-view: connection is established"]  */
// WMS local server failed 
/* ['Connecting to WMS server',
  'wms: device tries to check-in.',' ',
"Failed to login",
"Fail to check-in: read ECONNRESET"]; */

// WMS local server with citrix and vmware failed and redirecting to login page
/* 

['Connecting to WMS server',
'wms: device tries to check-in.',
'wms: checked in to WMS server.',
'wms: sync group list, the number of added group: 0, removed group: 0',
'wms: tries to get full configuration.',
'wms: tries to get package policy from server.',
'wms: received Group Policy Changed command.',
'wms: connected to MQTT broker: tcp://N038URVVVWYSE01.sof.socds.mil:1883',' ',
'Connecting to the Citrix server',
'[Citrix] login to broker "http://citrixready.cloud.com"',
'LOCAL APP: access sensitive data.',
"Citrix: login failed",

"vmware-view:  VMwarelogin to broker '100.100.1.90'",

"vmware-view: Horizon: connection broker initialized.",

"vmware-view: login failed",
"Redirecting to default Configuration…"
] 

 */
const { Step } = Steps;
const StyledLayout = styled(Layout)`
  /* We can't use "height: 100vh; width: 100vw;" here.
  Otherwise, when there is a horizontal scrollbar etc,
  because that we set a constant height, there will be a vertical one too.  */
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  background-color: #fff;
`;

const StyledContent = styled(Content)`
  background-color: rgba(236, 236, 236, 0.67);
`;

function App() {

  const { isMobile } = useMobile();
  const { onConfirm, validate,connectionCheck,onDefautConfig } = useCustomAlertHook();
  const [stepValue, setStepValue] = useState(0)
  const [startProcess, setStartProcess] = useState(false);
  const[percentValue,setPercentValue] = useState(0)
  const [lineShown, setLineShown] = useState(0)
  // const [status, setStatus] = useState('success')

  if (startProcess) {
    setTimeout(() => {
      if (percentValue < 100) {
        setPercentValue(percentValue+20);
      }
      else
      {
        setPercentValue(0)
      }

    }, 2000);
    setTimeout(() => {
      
      if (stepValue < 3) {
      
        setStepValue(stepValue + 1);
      

      }

    }, 12500);

   
  }
   if(WMStext[lineShown] == 'Redirecting to default Configuration…' && stepValue == 2){
    onDefautConfig()
   }

  useEffect(() => {

    if (startProcess) {
      if (lineShown, WMStext.length) {
        setTimeout(() => setLineShown(lineShown + 1), 1000)
      }
    }
  
  

  }, [stepValue, lineShown]);


  return (
    <StyledLayout>
      {!isMobile ? (
        <Fragment>

          {startProcess ?
            <Fragment>
              <StyledHeader>
                <div className="projectName-container"     onClick={()=>{localStorage.setItem('status','fail')
                window.location.reload();
              }}>
                  <img
                    style={{ width: 45, height: 45, marginRight: 12 }}
                    onClick={()=>{localStorage.setItem('status','fail')}}
                    className="react-confirm-alert-img"
                    src={BacklogImg}
                    alt="logo"
                  />
                  <span>Zero Touch User Experience</span>
                </div>
              </StyledHeader>

              <StyledContent>
                <div style={{ display: 'block', width: 580, padding: 30 }}>
              
                 <Steps current={stepValue} percent={percentValue}>
                 <Step title="Configuration"
                   description="Configure checkup" />
                 <Step title="Connection"
                   description="Connecting to server" />
                 <Step title="Connected"
                   description="Ready to go" />
                 </Steps>
            
                
                </div>
                <div>
                  <Collapse defaultActiveKey={['1']} ghost>
                    <Panel header="System Fallback Details" key="1" >
                      <div className="logs">

                        <div>
                          {WMStext.map((e, index) => (index <= lineShown) ? <p>
                           {e}</p> : null)}
                        </div>
                       


                      </div>
                    </Panel>
                  </Collapse>

                </div>
              </StyledContent>
            </Fragment>
            :
            <Fragment>
              {validate ? null : onConfirm(setStartProcess)}
              {/* {validate ? <Alert startProcess={startProcess} setStartProcess={setStartProcess} /> : null} */}
            </Fragment>
          }
    
    {/* <Offline>{connectionCheck()}</Offline> */}
        </Fragment>
      ) : (
        <div
          style={{
            background: "white",
            width: "100%",
            height: "100vh",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {/* <img
            className="rotate-in-center"
            style={{ marginTop: -40, marginBottom: 45 }}
            src={NoMobile}
            alt="noMobile"
            width="125"
          /> */}
          <strong
            className="tracking-in-expand"
            style={{ fontSize: 22, marginBottom: 12 }}
          >
            This app is not for mobile devices
          </strong>
          <p
            className="tracking-in-contract-bck-bottom"
            style={{ fontStyle: "italic" }}
          >
            To see the app correctly, open it to desktop computer...
          </p>
        </div>
      )}

    </StyledLayout>
  );
}

export default App;
