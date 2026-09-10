import React from "react";
import { dump } from "js-yaml";
import "./applyNetplan.css";
import systemServices  from "../apiCallFun"

const ApplyNetplan = ({
    netplan,
    setApplyNetplan
}) => {

    const yamlData = dump(netplan);

    const handleConfirmApply = async() => {

        console.log("Netplan configuration to apply:");
        console.log(yamlData);

        // Backend API call will be added here
        const applyNetplanRes = await systemServices.applyNetplan(netplan)
        // await systemServices.applyNetplan(netplan);

        setApplyNetplan(false);
    };


    return (
        <div className="apply-netplan-overlay">

            <div className="apply-netplan-modal">

                {/* Header */}

                <div className="apply-netplan-header">

                    <div>
                        <h2>
                            Verify Netplan Configuration
                        </h2>

                        <p>
                            Review the configuration before applying.
                        </p>
                    </div>

                    <button
                        className="apply-netplan-close"
                        onClick={() => setApplyNetplan(false)}
                    >
                        ×
                    </button>

                </div>


                {/* YAML */}

                <div className="apply-netplan-content">

                    <pre>
                        {yamlData}
                    </pre>

                </div>


                {/* Actions */}

                <div className="apply-netplan-actions">

                    <button
                        className="apply-netplan-cancel"
                        onClick={() => setApplyNetplan(false)}
                    >
                        Cancel
                    </button>

                    <button
                        className="apply-netplan-confirm"
                        onClick={handleConfirmApply}
                    >
                        Confirm & Apply
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ApplyNetplan;