import React from "react";
import "./editNetplan.css";
import systemServices from "../apiCallFun";

const EditNetplan = ({
    iface,
    setEdit,
    setFormData,

    addresses,
    setAddresses,

    isDefault,
    setIsDefault,

    gateway,
    setGateway,

    isDhcp,
    setIsDhcp,

    isDns,
    setIsDns,

    dnsServers,
    setDnsServers,

    isRoutes,
    routes,

    handleRoutesChange,
    handleRouteChange,
    handleAddRoute,
    handleRemoveRoute,

    defaultNetplanObject,

    netplan,
    setNetplan
    
}) => {


    // function to handle the form submission
    console.log(addresses,"addresses")

    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = {
            ifaceName: iface.interface,
            addresses: addresses,
            isDefault: isDefault,
            gateway: gateway,
            isDhcp: isDhcp,
            isDns: isDns,
            dnsServers: dnsServers,
            isRoutes: isRoutes,
            routes: routes
        };

        console.log("Form Data:", formData);

        setFormData(formData);


        const updatedNetplanObject =
            systemServices.createNetplanObject(
                formData,
                netplan
            );

        console.log(
            "Updated Netplan Object:",
            updatedNetplanObject
        );

        setNetplan(updatedNetplanObject)
        // Close edit panel
        setEdit(false);

    };


    return (

        <div className="edit-netplan-div">

            {/* Header */}

            <div className="edit-netplan-header">

                <div>

                    <span className="edit-netplan-label">
                        NETWORK CONFIGURATION
                    </span>

                    <h2>
                        Edit {iface.interface}
                    </h2>

                    <p>
                        Configure IP address, routing,
                        DHCP and DNS settings.
                    </p>

                </div>

                <button
                    type="button"
                    className="edit-close-button"
                    onClick={() => setEdit(false)}
                >
                    ×
                </button>

            </div>


            <form
                className="edit-netplan-form"
                onSubmit={handleSubmit}
            >

                {/* =====================================================
                    INTERFACE
                ====================================================== */}

                <div className="form-section">

                    <div className="form-section-title">
                        <span>01</span>
                        Interface
                    </div>

                    <div className="form-group">

                        <label>
                            Interface Name
                        </label>

                        <input
                            type="text"
                            value={iface.interface}
                            disabled
                        />

                    </div>

                </div>


                {/* =====================================================
                    IP ADDRESS
                ====================================================== */}

                <div className="form-section">

                    <div className="form-section-title">
                        <span>02</span>
                        IP Configuration
                    </div>

                    <div className="form-group">

                        <label>
                            IP Address / Subnet
                            <b>*</b>
                        </label>

                        <input
                            type="text"
                            placeholder="192.168.1.57/24"
                            value={addresses}
                            onChange={(e) =>
                                setAddresses(e.target.value)
                            }
                        />

                        <small>
                            Enter the IP address with CIDR subnet.
                        </small>

                    </div>

                </div>


                {/* =====================================================
                    DHCP
                ====================================================== */}

                <div className="form-section">

                    <div className="form-section-title">
                        <span>03</span>
                        DHCP
                    </div>

                    <label className="toggle-option">

                        <input
                            type="checkbox"
                            checked={isDhcp}
                            onChange={(e) =>
                                setIsDhcp(e.target.checked)
                            }
                        />

                        <span className="custom-checkbox"></span>

                        <span className="toggle-content">

                            <strong>
                                Enable DHCP
                            </strong>

                            <small>
                                Automatically obtain an IPv4
                                address from the DHCP server.
                            </small>

                        </span>

                    </label>

                </div>


                {/* =====================================================
                    DEFAULT ROUTE
                ====================================================== */}

                <div className="form-section">

                    <div className="form-section-title">
                        <span>04</span>
                        Default Route
                    </div>

                    <label className="toggle-option">

                        <input
                            type="checkbox"
                            checked={isDefault}
                            onChange={(e) =>
                                setIsDefault(e.target.checked)
                            }
                          
                        />

                        <span className="custom-checkbox"></span>

                        <span className="toggle-content">

                            <strong>
                                Default Interface
                            </strong>

                            <small>
                                Use this interface as the default
                                network route.
                            </small>

                        </span>

                    </label>


                    {isDefault && (

                        <div className="conditional-field">

                            <div className="form-group">

                                <label>
                                    Gateway
                                    <b>*</b>
                                </label>

                                <input
                                    type="text"
                                    placeholder="192.168.1.1"
                                    value={gateway}
                                    onChange={(e) =>
                                        setGateway(e.target.value)
                                    }
                                    required
                                />

                            </div>

                        </div>

                    )}

                </div>


                {/* =====================================================
                    DNS
                ====================================================== */}

                <div className="form-section">

                    <div className="form-section-title">
                        <span>05</span>
                        DNS
                    </div>

                    <label className="toggle-option">

                        <input
                            type="checkbox"
                            checked={isDns}
                            onChange={(e) =>
                                setIsDns(e.target.checked)
                            }
                        />

                        <span className="custom-checkbox"></span>

                        <span className="toggle-content">

                            <strong>
                                Configure DNS
                            </strong>

                            <small>
                                Specify custom DNS resolver addresses.
                            </small>

                        </span>

                    </label>


                    {isDns && (

                        <div className="conditional-field">

                            <div className="form-group">

                                <label>
                                    DNS Servers
                                    <b>*</b>
                                </label>

                                <input
                                    type="text"
                                    placeholder="8.8.8.8, 1.1.1.1"
                                    value={dnsServers}
                                    onChange={(e) =>
                                        setDnsServers(e.target.value)
                                    }
                                />

                                <small>
                                    Separate multiple DNS servers
                                    with commas.
                                </small>

                            </div>

                        </div>

                    )}

                </div>


                {/* =====================================================
                    STATIC ROUTES
                ====================================================== */}

                <div className="form-section">

                    <div className="form-section-title">
                        <span>06</span>
                        Static Routes
                    </div>

                    <label className="toggle-option">

                        <input
                            type="checkbox"
                            checked={isRoutes}
                            onChange={(e) =>
                                handleRoutesChange(
                                    e.target.checked
                                )
                            }
                        />

                        <span className="custom-checkbox"></span>

                        <span className="toggle-content">

                            <strong>
                                Configure Static Routes
                            </strong>

                            <small>
                                Add custom destination and gateway
                                routes.
                            </small>

                        </span>

                    </label>


                    {isRoutes && (

                        <div className="routes-container">

                            {routes.map((route, index) => (

                                <div
                                    className="route-row"
                                    key={index}
                                >

                                    <div className="route-number">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>


                                    <div className="route-field">

                                        <label>
                                            Destination
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="10.0.0.0/24"
                                            value={route.to}
                                            onChange={(e) =>
                                                handleRouteChange(
                                                    index,
                                                    "to",
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>


                                    <div className="route-field">

                                        <label>
                                            Gateway
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="192.168.1.1"
                                            value={route.via}
                                            onChange={(e) =>
                                                handleRouteChange(
                                                    index,
                                                    "via",
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>


                                    <div className="route-actions">

                                        <button
                                            type="button"
                                            className="route-add-button"
                                            onClick={() =>
                                                handleAddRoute(index)
                                            }
                                        >
                                            +
                                        </button>

                                        <button
                                            type="button"
                                            className="route-remove-button"
                                            onClick={() =>
                                                handleRemoveRoute(index)
                                            }
                                            disabled={
                                                routes.length === 1
                                            }
                                        >
                                            −
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>


                {/* =====================================================
                    FOOTER
                ====================================================== */}

                <div className="edit-netplan-footer">

                    <button
                        type="button"
                        className="cancel-netplan-button"
                        onClick={() => setEdit(false)}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="update-netplan-button"
                    >
                        Update Configuration
                    </button>

                </div>

            </form>

        </div>
    );
};

export default EditNetplan;