import React, { useEffect, useState } from "react";
import systemServices from "../apiCallFun"
import socketConnection from "../socket";
import "./interfaces.css"



const Interfaces = ({networkStatus,setNetworkStatus})=>{
    console.log(networkStatus)


    const getInterfaces = async()=>{
        try{
            const ifaces = await systemServices.getNetorkStatus()
            console.log(ifaces.data)
            setNetworkStatus(ifaces.data)
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
                    {networkStatus.length} Interfaces
                </div>

            </div>


            {/* Interface List */}

            <div className="interface-grid">

                {networkStatus.map((item) => {

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
                                    {
                                        item.rxMbps < 1 ? (
                                            <strong>
                                                {(item.rxMbps * 1000).toFixed(2)}
                                                <small> Kbps</small>
                                            </strong>

                                        )
                                        :
                                        (
                                            <strong>
                                                {item.rxMbps}
                                                <small> Mbps</small>
                                            </strong>
                                        )
                                    }

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
                                    {
                                        item.txMbps < 1 ? (
                                            <strong>
                                                {(item.txMbps * 1000).toFixed(2)}
                                                <small> Kbps</small>
                                            </strong>

                                        )
                                        :
                                        (
                                            <strong>
                                                {item.txMbps}
                                                <small> Mbps</small>
                                            </strong>
                                        )
                                    }
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