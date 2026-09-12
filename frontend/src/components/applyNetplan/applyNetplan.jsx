import React from "react";
import { dump } from "js-yaml";
import "./applyNetplan.css";
import systemServices  from "../apiCallFun"
import { toast } from "react-toastify";

const ApplyNetplan = ({
    netplan,
    setApplyNetplan
}) => {

    
    const yamlData = dump(netplan);

    const handleConfirmApply = async() => {
        try{       
            console.log(yamlData,"netplan yaml conversion before apply");
    
            const id = toast.loading("Applying Netplan")
            // API call for applying netplan
            const applyNetplanRes = await systemServices.applyNetplan(netplan)

            // toast
            await new Promise((resolve)=> setTimeout(resolve,3000))
            toast.update(id,{
                render: "Netplan applied successfully!", 
                type: "success", 
                isLoading: false, // Disables the loader spinner
                autoClose: 3000 
            })
    
            setApplyNetplan(false);

        }
        catch(error){
            toast.update(id,{
                render: error?.message || "Netplan apply failed!", 
                type: "error", 
                isLoading: false, 
                autoClose: 3000 
            })
            console.log(error)
        }
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