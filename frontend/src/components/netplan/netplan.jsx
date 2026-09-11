import React, { useEffect, useState,useMemo } from "react";
import "./netplan.css";
import { dump } from "js-yaml";
import systemServices from "../apiCallFun";
import EditNetplan from "../netplanEditBar/editNetplan";
import ApplyNetplan from "../applyNetplan/applyNetplan";

const NetplanConf = () => {

    const [interfaces, setInterFaces] = useState([]);

    const [edit, setEdit] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [formData, setFormData] = useState(null);

    // Addresses
    const [addresses, setAddresses] = useState("");

    // Default route
    const [isDefault, setIsDefault] = useState(false);
    const [gateway, setGateway] = useState("");

    // DHCP
    const [isDhcp, setIsDhcp] = useState(false);

    // DNS
    const [isDns, setIsDns] = useState(false);
    console.log(isDns,'dns')
    const [dnsServers, setDnsServers] = useState("");

    // Routes
    const [isRoutes, setIsRoutes] = useState(false);
    const [routes, setRoutes] = useState([]);

    // netplan
    const [netplan, setNetplan] = useState(() => {
        const savedNetplan = localStorage.getItem("netplanConfig");
        console.log(JSON.parse(savedNetplan),"daved netplan from the use state")

        return savedNetplan
            ? JSON.parse(savedNetplan)
            : null;
    });

    console.log(netplan,"netplan from netplan page")

    // apply netplan
    const [applyNetplan,setApplyNetplan] = useState(false)
    
    
    
    // get interface function
    const getInterfaces = async () => {

        try {

            const response =
                await systemServices.getNetorkStatus();

            setInterFaces(response.data.slice(1));

        } catch (error) {

            console.log(error);

        }

    };

    // function to get the netplan
    const netplanResult = async()=>{
        try{
            const result = await systemServices.getNetplanFile()
            console.log(result.network.ethernets.enp0s3.addresses,"result from get netplan API")
            setNetplan(result)
        }
        catch(error){
            console.log(error)
        }
    }

    // function to handle the default netplan object
    const defaultNetplanObject = useMemo(() => {

        const obj = {
            network: {
                version: 2,
                ethernets: {}
            }
        };

        interfaces.forEach(iface => {
            obj.network.ethernets[iface.interface] = {
                dhcp4: true
            };
        });

        return obj;

    }, [interfaces]);

    // routes
    const handleRoutesChange = (checked) => {

        setIsRoutes(checked);

        if (checked && routes.length === 0) {

            setRoutes([
                {
                    to: "",
                    via: ""
                }
            ]);

        }

        if (!checked) {
            setRoutes([]);
        }

    };

    // function to handle the route field
    const handleRouteChange = (index, field, value) => {

        setRoutes(prev => {

            const updated = [...prev];

            updated[index] = {
                ...updated[index],
                [field]: value
            };

            return updated;

        });

    };

    // function to handle adding a new route
    const handleAddRoute = (index) => {

        setRoutes(prev => {

            const updated = [...prev];

            updated.splice(index + 1, 0, {
                to: "",
                via: ""
            });

            return updated;

        });

    };

    // function to remove the route from the list
    const handleRemoveRoute = (index) => {

        setRoutes(prev =>
            prev.filter((_, i) => i !== index)
        );

    };

    
    
    useEffect(() => {
        getInterfaces();
        netplanResult()

    }, []);
    
    // use effect to set thenetplan file to local storage
    useEffect(()=>{
        console.log("calling netplan use effect")
        if(netplan){
            localStorage.setItem("netplanConfig",JSON.stringify(netplan))
        }
        console.log("netplan saved in the local storage")
    },[netplan])
    
    //  handle edit function
    const handleEdit = (iface, index) => {

        if (edit) {

            setEdit(false);
            setEditIndex(null);

            return;

        }

        setEdit(true);
        setEditIndex(index);

        // Initialize form
        const interfaceConfig =
        netplan?.network?.ethernets?.[iface.interface];

        console.log("Interface Netplan config:", interfaceConfig);

        setAddresses(
            interfaceConfig?.addresses?.join(", ") || ""
        );



        // DHCP
        setIsDhcp(
            interfaceConfig?.dhcp4 ?? false
        );

        // Routes
        const routes = interfaceConfig?.routes || [];

        const defaultRoute = routes.find(
            route => route.to === "default"
        );

        // Default interface
        setIsDefault(
            !!defaultRoute
        );

        // Gateway
        setGateway(
            defaultRoute?.via || ""
        );

        // Static routes
        const staticRoutes = routes
            .filter(route => route.to !== "default")
            .map(route => ({
                to: route.to || "",
                via: route.via || ""
            }));

        setRoutes(staticRoutes);

        setIsRoutes(
            staticRoutes.length > 0
        );

        // DNS
        const dnsAddresses =
            interfaceConfig?.nameservers?.addresses || [];

        setIsDns(
            dnsAddresses.length > 0
        );

        setDnsServers(
            dnsAddresses.join(", ")
        );


    };


    // function for download button
    const handleDownloadNetplan= ()=>{
        const yamlData = dump(netplan)

        // create blob
        const blob = new Blob([yamlData],{
            type:"text/yaml"
        })

        // create URL
        const url = URL.createObjectURL(blob)

        // create link
        const link = document.createElement("a")
        link.href = url
        link.download = 'netplan.yaml'

        document.body.append(link)
        link.click()

        document.body.removeChild(link)
        URL.revokeObjectURL(url)

    }


    return (

        <div className="netplan-page">

            {/* Header */}

            <div className="netplan-header">

                <div>

                    <h1>Network Interfaces</h1>

                    <p>
                        Manage network interfaces and configure
                        Netplan settings.
                    </p>

                </div>

                <div className="netplan-header-actions">

                    <button onClick={handleDownloadNetplan} className="netplan-secondary-btn">
                        <span>↓</span>
                        Download
                    </button>

                    <button className="netplan-primary-btn" onClick={()=> setApplyNetplan(true)}>
                        Apply Configuration
                    </button>

                    {
                        applyNetplan && (
                            <ApplyNetplan netplan={netplan} setApplyNetplan={setApplyNetplan}/>
                        )
                    }

                </div>

            </div>


            {/* Interface Card */}

            <div className="interface-card">

                <div className="interface-card-header">

                    <div>

                        <h2>Available Interfaces</h2>

                        <p>
                            Configure IP addresses, DHCP,
                            DNS and routing.
                        </p>

                    </div>

                    <div className="interface-count">

                        <span>
                            {interfaces.length}
                        </span>

                        Interfaces

                    </div>

                </div>


                {/* Table Header */}

                <div className="interface-table-header">

                    <div>S.NO</div>

                    <div>INTERFACE</div>

                    <div>STATUS</div>

                    <div>IP ADDRESS</div>

                    <div>DEFAULT</div>

                    <div>DHCP4</div>

                    <div>ACTION</div>

                </div>


                {/* Interface Rows */}

                <div className="interface-list">

                    {interfaces.length === 0 ? (

                        <div className="empty-interface">

                            <div className="empty-icon">
                                ◌
                            </div>

                            <h3>No Interfaces Found</h3>

                            <p>
                                No network interfaces are
                                available.
                            </p>

                        </div>

                    ) : (

                        interfaces.map((iface, index) => {

                            const isUp =
                                iface.interfaceStatus?.status === "UP";

                            return (

                                <div
                                    className="interface-row"
                                    key={iface.interface}
                                >

                                    {/* Serial Number */}

                                    <div className="interface-number">

                                        {String(index + 1).padStart(2, "0")}

                                    </div>


                                    {/* Interface */}

                                    <div className="interface-name">

                                        <div className="interface-icon">
                                            ⇄
                                        </div>

                                        <div>

                                            <strong>
                                                {iface.interface}
                                            </strong>

                                            <span>
                                                Network Interface
                                            </span>

                                        </div>

                                    </div>


                                    {/* Status */}

                                    <div>

                                        <span
                                            className={
                                                isUp
                                                    ? "status-badge status-up"
                                                    : "status-badge status-down"
                                            }
                                        >

                                            <span className="status-dot"></span>

                                            {isUp ? "UP" : "DOWN"}

                                        </span>

                                    </div>


                                    {/* IP */}

                                    <div className="interface-ip">

                                        {iface.interfaceIP || "Not Assigned"}

                                    </div>


                                    {/* Default */}

                                    <div>

                                        <span className="config-badge">
                                            {isDefault ? "true" : "false"}
                                        </span>

                                    </div>


                                    {/* DHCP */}

                                    <div>

                                        <span className="config-badge">
                                            {`${netplan?.network?.ethernets?.[iface?.interface]?.dhcp4}`}
                                        </span>

                                    </div>


                                    {/* Action */}

                                    <div>

                                        <button
                                            className={
                                                edit &&
                                                editIndex === index
                                                    ? "edit-btn active"
                                                    : "edit-btn"
                                            }
                                            onClick={() =>
                                                handleEdit(iface, index)
                                            }
                                        >

                                            <span>
                                                {edit &&
                                                editIndex === index
                                                    ? "×"
                                                    : "✎"}
                                            </span>

                                            {edit &&
                                            editIndex === index
                                                ? "Close"
                                                : "Edit"}

                                        </button>

                                    </div>

                                </div>

                            );

                        })

                    )}

                </div>

            </div>


            {/* Edit Area */}

            {edit &&
                editIndex !== null &&
                interfaces[editIndex] && (

                    <div className="netplan-edit-overlay">

                        <div className="netplan-edit-panel">

                            <EditNetplan

                                iface={interfaces[editIndex]}

                                addresses={addresses}
                                setAddresses={setAddresses}

                                isDefault={isDefault}
                                setIsDefault={setIsDefault}

                                gateway={gateway}
                                setGateway={setGateway}

                                isDhcp={isDhcp}
                                setIsDhcp={setIsDhcp}

                                isDns={isDns}
                                setIsDns={setIsDns}

                                dnsServers={dnsServers}
                                setDnsServers={setDnsServers}

                                isRoutes={isRoutes}
                                setIsRoutes={setIsRoutes}

                                routes={routes}
                                setRoutes={setRoutes}

                                setEdit={setEdit}
                                setFormData={setFormData}

                                interfaces={interfaces}

                                handleRoutesChange={handleRoutesChange}
                                handleRouteChange={handleRouteChange}
                                handleAddRoute={handleAddRoute}
                                handleRemoveRoute={handleRemoveRoute}

                                netplan={netplan}
                                setNetplan={setNetplan}

                            />

                        </div>

                    </div>

                )}

        </div>

    );

};

export default NetplanConf;