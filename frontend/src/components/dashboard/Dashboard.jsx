import React from "react";
import "./dashboard.css";
import { useEffect ,useState} from "react";
import socketConnection from "../socket";
import axios from "axios";
import systemService from "../apiCallFun"


const Dashboard = () => {

    const [serverData,setServerData] = useState({})
    const [ramPercent,setRamPercent] = useState(0)
    const [cpuData,setCpuData] = useState({})
    const [diskUsage,setDiskUsage] = useState({})
    const [networkStatus,setNetworkStatus] = useState([])
    const [serviceData,setServiceData] = useState([])


    const getApiCallFun = async()=>{
        try{
            // os information function
            const osData = await systemService.osInformation()
            setServerData(osData)

            // ram percent calculation
            const ramPercentOutput = systemService.ramPercentCal(osData)
            setRamPercent(ramPercentOutput)

            // cpu information
            const cpuInfo = await systemService.cpuInfomation()
            console.log(cpuInfo)
            setCpuData(cpuInfo)

            // disk information
            const diskInfo = await systemService.diskInformation()
            console.log(diskInfo)
            setDiskUsage(diskInfo)

            // interface information
            const ifaceInfo = await systemService.getNetorkStatus()
            setNetworkStatus(ifaceInfo.data)

            // nginx information
            const nginxInfo = await systemService.getNginxStatus()
            setServiceData([...serviceData,nginxInfo])
            

        }
        catch(error){
            console.log(error.message)
        }
    }
    useEffect(()=>{
        getApiCallFun()
    },[])


    return (
        <div className="dashboard">

            {/* Header */}

            <div className="dashboard-header">

                <div>
                    <h1>System Overview</h1>

                    <p>
                        Monitor your server health and resource utilization
                    </p>
                </div>

            </div>


            {/* Resource Cards */}

            <div className="resource-grid">

                {/* CPU */}

                <div className="resource-card">

                    <div className="card-top">
                        <span className="card-title">
                            CPU Usage
                        </span>

                        <span className="card-icon">
                            CPU
                        </span>
                    </div>

                    <div className="card-value">
                        {cpuData.cpuPercent}%
                    </div>

                    <div className="progress">
                        <div
                            className="progress-bar"
                            style={{
                                width: `${cpuData.cpuPercent}%`
                            }}
                        />
                    </div>

                    <span className="card-subtitle">
                        Current utilization
                    </span>

                </div>


                {/* Memory */}

                <div className="resource-card">

                    <div className="card-top">
                        <span className="card-title">
                            Memory
                        </span>

                        <span className="card-icon">
                            RAM
                        </span>
                    </div>

                    <div className="card-value">
                        {serverData.freeMemGb}
                        <span className="value-unit">
                            / {serverData.totalMemGb} GB
                        </span>
                    </div>

                    <div className="progress">
                        <div
                            className="progress-bar"
                            style={{
                                width: `${ramPercent}%`
                            }}
                        />
                    </div>

                    <span className="card-subtitle">
                        {ramPercent}% utilized
                    </span>

                </div>


                {/* Disk */}

                <div className="resource-card">

                    <div className="card-top">
                        <span className="card-title">
                            Disk Usage
                        </span>

                        <span className="card-icon">
                            DISK
                        </span>
                    </div>

                    <div className="card-value">
                        {diskUsage.diskUsagePercent}%
                    </div>

                    <div className="progress">
                        <div
                            className="progress-bar"
                            style={{
                                width: `${diskUsage.diskPercentage}%`
                            }}
                        />
                    </div>

                    <span className="card-subtitle">
                        {diskUsage.usedGB} GB used
                    </span>

                </div>


                {/* Uptime */}

                <div className="resource-card">

                    <div className="card-top">
                        <span className="card-title">
                            Uptime
                        </span>

                        <span className="card-icon">
                            {serverData.uptimeData === "" ? "DOWN" : "UP"}
                        </span>
                    </div>

                    <div className="card-value uptime">
                        {serverData.uptimeData}
                    </div>

                    <span className="card-subtitle">
                        System uptime
                    </span>

                </div>

            </div>


            {/* Middle Section */}

            <div className="dashboard-grid">

                {/* Network */}

                <div className="dashboard-card">

                    <div className="section-header">

                        <div>
                            <h2>Network Traffic</h2>

                            <p>
                                Interface traffic statistics
                            </p>
                        </div>

                    </div>


                    <div className="network-list">

                        {networkStatus.map((network) => (

                            <div
                                className="network-row"
                                key={network.interface}
                            >

                                <div className="interface-name">
                                    <span className="status-dot" />
                                    {network.interface}
                                </div>

                                <div className="traffic-value">
                                    <span>
                                        ↓ {network.rxMb}mb
                                    </span>

                                    <span>
                                        ↑ {network.txMb}mb
                                    </span>
                                </div>

                            </div>

                        ))}

                    </div>

                </div>


                {/* Server Information */}

                <div className="dashboard-card">

                    <div className="section-header">

                        <div>
                            <h2>Server Information</h2>

                            <p>
                                System configuration
                            </p>
                        </div>

                    </div>


                    <div className="server-info">

                        <div className="info-row">
                            <span>Operating System</span>
                            <strong>{serverData.osRelease}</strong>
                        </div>

                        <div className="info-row">
                            <span>Hostname</span>
                            <strong>{serverData.hostName}</strong>
                        </div>

                        <div className="info-row">
                            <span>CPU</span>
                            <strong>{cpuData.cpuModel}</strong>
                        </div>

                        <div className="info-row">
                            <span>CPU Cores</span>
                            <strong>{cpuData.cpuCore}</strong>
                        </div>

                        <div className="info-row">
                            <span>Total RAM</span>
                            <strong>{serverData.totalMemGb} GB</strong>
                        </div>

                    </div>

                </div>

            </div>


            {/* Services */}

            <div className="dashboard-card services-card">

                <div className="section-header">

                    <div>
                        <h2>Service Status</h2>

                        <p>
                            Important services running on the server
                        </p>
                    </div>

                </div>


                <div className="services-grid">

                    {serviceData.map((service) => (

                        <div
                            className="service-item"
                            key={service.service}
                        >

                            <div className="service-info">

                                <span className={service.subState === "running" ? 'service-dot-grn':'service-dot-red'} />

                                <div>
                                    <strong>
                                        {service.service}
                                    </strong>

                                    <span className= {service.subState === "running" && service.enabled ? "service-substate-grn" : "service-substate-red"}>
                                        {service.subState},
                                        {service.enabled ? "enabled" : "disabled"}
                                    </span>
                                </div>

                            </div>

                            <span className={service.subState === "running" ? 'service-status-grn':'service-status-red'}>
                               {service.subState === "running" ? "Running" : "Not Running"}
                            </span>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
};

export default Dashboard;