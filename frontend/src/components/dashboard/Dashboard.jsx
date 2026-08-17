import React from "react";
import "./dashboard.css";

const Dashboard = () => {

    // Dummy data for now
    const systemData = {
        cpu: 24.5,

        memory: {
            used: 3.2,
            total: 8,
            percentage: 40
        },

        disk: {
            used: 67,
            total: 100,
            percentage: 67
        },

        uptime: "12d 04h 32m",

        server: {
            os: "Ubuntu 24.04 LTS",
            hostname: "nect",
            cpu: "Intel(R) Celeron(R) J3455",
            cores: 4,
            ram: "8 GB"
        }
    };

    const networkData = [
        {
            name: "eno1",
            rx: "41.8 GB",
            tx: "141.4 GB"
        },
        {
            name: "eno2",
            rx: "31.9 GB",
            tx: "929 MB"
        },
        {
            name: "eno3",
            rx: "21.9 MB",
            tx: "437 KB"
        },
        {
            name: "eno4",
            rx: "21.4 GB",
            tx: "252 MB"
        }
    ];

    const services = [
        {
            name: "Nginx",
            status: "Running"
        },
        {
            name: "PostgreSQL",
            status: "Running"
        },
        {
            name: "Access Plus API",
            status: "Running"
        }
    ];


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
                        {systemData.cpu}%
                    </div>

                    <div className="progress">
                        <div
                            className="progress-bar"
                            style={{
                                width: `${systemData.cpu}%`
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
                        {systemData.memory.used}
                        <span className="value-unit">
                            / {systemData.memory.total} GB
                        </span>
                    </div>

                    <div className="progress">
                        <div
                            className="progress-bar"
                            style={{
                                width: `${systemData.memory.percentage}%`
                            }}
                        />
                    </div>

                    <span className="card-subtitle">
                        {systemData.memory.percentage}% utilized
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
                        {systemData.disk.percentage}%
                    </div>

                    <div className="progress">
                        <div
                            className="progress-bar"
                            style={{
                                width: `${systemData.disk.percentage}%`
                            }}
                        />
                    </div>

                    <span className="card-subtitle">
                        {systemData.disk.used} GB used
                    </span>

                </div>


                {/* Uptime */}

                <div className="resource-card">

                    <div className="card-top">
                        <span className="card-title">
                            Uptime
                        </span>

                        <span className="card-icon">
                            UP
                        </span>
                    </div>

                    <div className="card-value uptime">
                        {systemData.uptime}
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

                        {networkData.map((network) => (

                            <div
                                className="network-row"
                                key={network.name}
                            >

                                <div className="interface-name">
                                    <span className="status-dot" />
                                    {network.name}
                                </div>

                                <div className="traffic-value">
                                    <span>
                                        ↓ {network.rx}
                                    </span>

                                    <span>
                                        ↑ {network.tx}
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
                            <strong>{systemData.server.os}</strong>
                        </div>

                        <div className="info-row">
                            <span>Hostname</span>
                            <strong>{systemData.server.hostname}</strong>
                        </div>

                        <div className="info-row">
                            <span>CPU</span>
                            <strong>{systemData.server.cpu}</strong>
                        </div>

                        <div className="info-row">
                            <span>CPU Cores</span>
                            <strong>{systemData.server.cores}</strong>
                        </div>

                        <div className="info-row">
                            <span>Total RAM</span>
                            <strong>{systemData.server.ram}</strong>
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

                    {services.map((service) => (

                        <div
                            className="service-item"
                            key={service.name}
                        >

                            <div className="service-info">

                                <span className="service-dot" />

                                <div>
                                    <strong>
                                        {service.name}
                                    </strong>

                                    <span>
                                        {service.status}
                                    </span>
                                </div>

                            </div>

                            <span className="service-status">
                                Running
                            </span>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
};

export default Dashboard;