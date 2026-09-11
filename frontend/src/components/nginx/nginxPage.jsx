import React, { useEffect, useState } from "react";
import systemServices from "../apiCallFun"
import "./nginxPage.css"


const NginxPage = ({nginxStatus,setNginxStatus})=>{

 
    const [cmd,setCmd] = useState("")
    const[nginxTestOutput,setNginxTestOutput] = useState("")

    
    const nginxStatusCall = async()=>{
        try{
            const output = await systemServices.getNginxStatus()
            console.log(output)
            setNginxStatus(output)
        }
        catch(error){
            console.log(error)
        }
    }

    const handleCmd = async(cmd)=>{
        try{
            setCmd(cmd)
            const out = await systemServices.nginxCmdFun(cmd)

            if(cmd === "test"){
                setNginxTestOutput(out)
            }

            if(cmd === "stop" || cmd === "start" || cmd === "restart" || cmd === "reload"){
                await nginxStatusCall()
            }
        }
        catch(error){
            console.log(error)
        }
    }
    
    useEffect(()=>{
        nginxStatusCall()
    },[])



    return (
        <div className="nginx-card">

            {/* ================================
                NGINX HEADER
            ================================= */}

            <div className="nginx-card-header">

                <div>
                    <h2>Nginx Status</h2>

                    <p>
                        Manage and monitor Nginx service
                    </p>
                </div>

                <span
                    className={`nginx-status-badge ${
                        nginxStatus.activeState === "active"
                            ? "nginx-status-active"
                            : "nginx-status-inactive"
                    }`}
                >
                    <span className="nginx-status-dot"></span>

                    {nginxStatus.activeState === "active"
                        ? "Running"
                        : "Not Running"}
                </span>

            </div>


            {/* ================================
                STATUS INFORMATION
            ================================= */}

            <div className="nginx-status-grid">

                <div className="nginx-info-item">

                    <span className="nginx-info-label">
                        Service
                    </span>

                    <span className="nginx-info-value">
                        {nginxStatus.service || "N/A"}
                    </span>

                </div>


                <div className="nginx-info-item">

                    <span className="nginx-info-label">
                        Active State
                    </span>

                    <span className="nginx-info-value">
                        {nginxStatus.activeState || "N/A"}
                    </span>

                </div>


                <div className="nginx-info-item">

                    <span className="nginx-info-label">
                        Sub State
                    </span>

                    <span className="nginx-info-value">
                        {nginxStatus.subState || "N/A"}
                    </span>

                </div>

            </div>


            {/* ================================
                NGINX OPERATIONS
            ================================= */}

            <div className="nginx-operations">

                <div className="nginx-operations-header">

                    <div>
                        <h3>Nginx Operations</h3>

                        <span>
                            Service Control
                        </span>
                    </div>

                </div>


                <div className="nginx-buttons">

                    {/* NGINX TEST */}

                    <button
                        className="nginx-btn nginx-test-btn"
                        onClick={() => handleCmd("test")}
                    >

                        <span className="nginx-btn-icon">
                            ✓
                        </span>

                        <span>
                            Nginx -t
                        </span>

                    </button>


                    {/* RELOAD */}

                    <button
                        className="nginx-btn nginx-reload-btn"
                        onClick={() => handleCmd("reload")}
                    >

                        <span className="nginx-btn-icon">
                            ↻
                        </span>

                        <span>
                            Reload
                        </span>

                    </button>


                    {/* RESTART */}

                    <button
                        className="nginx-btn nginx-restart-btn"
                        onClick={() => handleCmd("restart")}
                    >

                        <span className="nginx-btn-icon">
                            ⟳
                        </span>

                        <span>
                            Restart
                        </span>

                    </button>


                    {/* START */}

                    <button
                        className="nginx-btn nginx-start-btn"
                        onClick={() => handleCmd("start")}
                    >

                        <span className="nginx-btn-icon">
                            ▶
                        </span>

                        <span>
                            Start
                        </span>

                    </button>


                    {/* STOP */}

                    <button
                        className="nginx-btn nginx-stop-btn"
                        onClick={() => handleCmd("stop")}
                    >

                        <span className="nginx-btn-icon">
                            ■
                        </span>

                        <span>
                            Stop
                        </span>

                    </button>

                </div>

            </div>


            {/* ================================
                NGINX TEST OUTPUT
            ================================= */}

            {nginxTestOutput && (

                <div className="nginx-test-output">

                    <div className="nginx-test-output-header">

                        <div>

                            <span className="nginx-output-status-dot"></span>

                            <h3>
                                Nginx Configuration Test
                            </h3>

                        </div>


                        <button
                            className="nginx-output-close"
                            onClick={() =>
                                setNginxTestOutput("")
                            }
                        >
                            ×
                        </button>

                    </div>


                    <div className="nginx-output-body">

                        <pre>
                            {nginxTestOutput.error ? nginxTestOutput.error : "Nginx test ok 200"}
                        </pre>

                    </div>

                </div>

            )}

        </div>
    )
}

export default NginxPage