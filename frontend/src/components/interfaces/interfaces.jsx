import React, { useEffect, useState } from "react";
import systemServices from "../apiCallFun"
import "./interfaces.css"



const Interfaces = ()=>{

    const [interfaces,setInterfaces] = useState([])
    console.log(interfaces)

    const getInterfaces = async()=>{
        try{
            const ifaces = await systemServices.getNetorkStatus()
            setInterfaces(ifaces.data)
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getInterfaces()
    },[])


    return(
        <div className="interface-page">

            {/* Header */}

            <div className="interface-header">

                <div>
                    <h1>Network Interfaces</h1>

                    <p>
                        Monitor interface status and network statistics
                    </p>
                </div>

                <div className="interface-count">
                    {interfaces.length} Interfaces
                </div>

            </div>


            {/* Interface List */}

            <div className="interface-grid">

                {interfaces.map((item) => {

                    const isUp =
                        item.interfaceStatus?.status === "UP";

                    return (

                        <div
                            className="interface-card"
                            key={item.interface}
                        >

                            {/* Card Header */}

                            <div className="interface-card-header">

                                <div className="interface-title">

                                    <span
                                        className={
                                            isUp
                                                ? "interface-status-dot up"
                                                : "interface-status-dot down"
                                        }
                                    />

                                    <div>
                                        <h2>
                                            {item.interface}
                                        </h2>

                                        <span>
                                            {item.interfaceIP || "No IP assigned"}
                                        </span>
                                    </div>

                                </div>


                                <span
                                    className={
                                        isUp
                                            ? "interface-status up"
                                            : "interface-status down"
                                    }
                                >
                                    {item.interfaceStatus?.status}
                                </span>

                            </div>


                            {/* Traffic */}

                            <div className="interface-traffic">

                                {/* RX */}

                                <div className="traffic-card">

                                    <div className="traffic-header">
                                        <span>↓</span>
                                        Receive
                                    </div>

                                    <strong>
                                        {item.rxMb}
                                        <small> MiB</small>
                                    </strong>

                                    <p>
                                        {item.rxPackets.toLocaleString()}
                                        {" "}packets
                                    </p>

                                </div>


                                {/* TX */}

                                <div className="traffic-card">

                                    <div className="traffic-header">
                                        <span>↑</span>
                                        Transmit
                                    </div>

                                    <strong>
                                        {item.txMb}
                                        <small> MiB</small>
                                    </strong>

                                    <p>
                                        {item.txPackets.toLocaleString()}
                                        {" "}packets
                                    </p>

                                </div>

                            </div>


                            {/* Error Statistics */}

                            <div className="interface-statistics">

                                <div className="interface-stat">
                                    <span>RX Errors</span>
                                    <strong className={
                                        item.rxErrors > 0
                                            ? "stat-warning"
                                            : ""
                                    }>
                                        {item.rxErrors}
                                    </strong>
                                </div>


                                <div className="interface-stat">
                                    <span>TX Errors</span>
                                    <strong className={
                                        item.txErrors > 0
                                            ? "stat-warning"
                                            : ""
                                    }>
                                        {item.txErrors}
                                    </strong>
                                </div>


                                <div className="interface-stat">
                                    <span>RX Drops</span>
                                    <strong>
                                        {item.rxDrops}
                                    </strong>
                                </div>


                                <div className="interface-stat">
                                    <span>TX Drops</span>
                                    <strong>
                                        {item.txDrops}
                                    </strong>
                                </div>

                            </div>

                        </div>

                    );

                })}

            </div>

        </div>
    )
}


export default Interfaces