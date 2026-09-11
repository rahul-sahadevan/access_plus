import React, { useEffect, useState } from "react";
import systemServices from "../apiCallFun"
import "./logs.css"


const Logs = ()=>{

    const [log,setLog] = useState("")
    const [cmd,setCmd] = useState("")

    const getLogs = async()=>{
        try{
            const out = await systemServices.getSysLogs(cmd)
            setLog(out)
        }
        catch(error){
            console.log(error)
        }
    }


    useEffect(()=>{
        getLogs()
    },[cmd,log])

    return (
        <div className="system-logs-card">

            {/* Header */}

            <div className="system-logs-header">

                <div>
                    <h2>System Logs</h2>

                    <p>
                        View system and service logs
                    </p>
                </div>

            </div>


            {/* Log Controls */}

            <div className="system-logs-controls">

                <button
                    className={`system-log-btn ${
                        cmd === "dmesg"
                            ? "system-log-btn-active"
                            : ""
                    }`}
                    onClick={() => setCmd("dmesg")}
                >
                    dmesg
                </button>


                <button
                    className={`system-log-btn ${
                        cmd === "journal"
                            ? "system-log-btn-active"
                            : ""
                    }`}
                    onClick={() => setCmd("journal")}
                >
                    journal
                </button>


                <button
                    className={`system-log-btn ${
                        cmd === "systemctl"
                            ? "system-log-btn-active"
                            : ""
                    }`}
                    onClick={() => setCmd("systemctl")}
                >
                    systemctl
                </button>

            </div>


            {/* Log Output */}

            {log && (

                <div className="system-log-output">

                    <div className="system-log-output-header">

                        <div className="system-log-terminal-title">

                            <span className="system-log-dot"></span>

                            <span>
                                {cmd || "System Output"}
                            </span>

                        </div>


                        <span className="system-log-live">
                            OUTPUT
                        </span>

                    </div>


                    <div className="system-log-terminal">

                        <pre>
                            {log}
                        </pre>

                    </div>

                </div>

            )}

        </div>
    )
}


export default Logs