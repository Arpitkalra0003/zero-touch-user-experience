/* eslint-disable no-unused-vars */
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


const useCustomAlertHook = () => {
  const MySwal = withReactContent(Swal);

  const [validate, setValidate] = useState(
    localStorage.getItem("validate") ?? false
  );
 


  // TIMETRACKER COMPONENT
  const connectionCheck = () => {
    MySwal.fire({
      title: "Network Issue",
      text: "Please check internet connection",
      icon: "error",
      showCancelButton: false,
      showConfirmButton:false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    })
  };
  let timerInterval
  // ALERTCOMPONENT
  const onConfirm = (setStartProcess) => {
    MySwal.fire({
      title: 'Connection Error',
      html:
        'Unable to connect with server, Trying to connect with <b>WMS</b> server in <strong></strong> seconds.<br/><br/>',
      timer: 5000,
      showConfirmButton:false,
      icon:'warning',
      didOpen: () => {
        const content = MySwal.getHtmlContainer()
        const $ = content.querySelector.bind(content)
    
        timerInterval = setInterval(() => {
          MySwal.getHtmlContainer().querySelector('strong')
            .innerText = (MySwal.getTimerLeft() / 1000)
              .toFixed(0)
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      setStartProcess(true)
    });
  };

  const onDefautConfig = () => {
    MySwal.fire({
      title: 'Server Login',
      html:
        '<input type="text" placeholder="Username" class="user"/>'+
        '<input type="text" placeholder="Password" class="user"/>'
        ,
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Login",
     
    }).then((result) => {
     
    });
  };

 
  return {
    connectionCheck,
    onDefautConfig,
    onConfirm,
    validate,
    setValidate,
  };
};

export default useCustomAlertHook;
