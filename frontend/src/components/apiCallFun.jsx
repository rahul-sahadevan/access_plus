import React, { useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL
console.log(apiUrl)
const osInformation = async()=>{
    try{
        const response =  await axios.get(`${apiUrl}/sys/sysInfo`)
        const respData = response.data.data
        console.log(respData)
        return respData
    }
    catch(error){
        alert(error.message)
    }
}

// function to find the RAM usage percentage
const ramPercentCal = (osData)=>{
    const percent = ((osData.freeMemGb/osData.totalMemGb) * 100).toFixed(2)
    return percent
}

// function to find the CPU usage percentage
const cpuInfomation = async()=>{
    try{
        const response = await axios.get(`${apiUrl}/sys/cpuinfo`)
        return response.data
    }
    catch(error){
        alert(error.message)
    }
}

// function to get disk information
const diskInformation = async()=>{
    try{
        const response  = await axios.get(`${apiUrl}/sys/diskinfo`)
        return response.data.data
        
    }
    catch(error){
        alert(error.message)
    }
}

// function to get the network interface status
const getNetorkStatus = async()=>{
    try{
        const response =  await axios.get(`${apiUrl}/iface/status`)
        return response.data
    }
    catch(error){
        console.log(error.message)
        return error.message
    }
}

// function to getthe nginx status
const getNginxStatus = async()=>{
    try{

        const response = await axios.get(`${apiUrl}/nginx/status`)
        console.log(response.data.data)
        return response.data.data

    }
    catch(error){
        console.log(error.message)
        return error.message
    }
}

// function to get the existing netplan file
const getNetplanFile = async()=>{
    try{

        const savedNetplan = localStorage.getItem("netplanConfig")
        if(savedNetplan){
            return JSON.parse(savedNetplan)
        }
        const response =  await axios.get(`${apiUrl}/iface/readNet`)
        console.log(response.data)

        return response.data.data

    }
    catch(error){
        return error.message
    }
}

// function to create valid netplan object
const createNetplanObject = (formData, netplan) => {
    console.log(netplan,"netplan file from the backend")

    if (!formData) {
        return "Form data is empty";
    }

    const {
        ifaceName,
        addresses,
        isDefault,
        gateway,
        isDhcp,
        isDns,
        dnsServers,
        isRoutes,
        routes
    } = formData;


    // --------------------------------------------------
    // Addresses
    // --------------------------------------------------

    const splitAddresses = addresses
        ? addresses
            .split(",")
            .map(addr => addr.trim())
            .filter(addr => addr !== "")
        : [];


    // --------------------------------------------------
    // DNS
    // --------------------------------------------------

    const splitDnsServers = dnsServers
        ? dnsServers
            .split(",")
            .map(dns => dns.trim())
            .filter(dns => dns !== "")
        : [];


    // --------------------------------------------------
    // Routes
    // --------------------------------------------------

    let netplanRoutes = [];


    // Default route
    if (isDefault) {

        netplanRoutes.push({
            to: "default",
            via: gateway
        });

    }


    // Static routes
    if (isRoutes) {

        const staticRoutes = routes
            .filter(route => route.to && route.via)
            .map(route => ({
                to: route.to,
                via: route.via
            }));

        netplanRoutes.push(...staticRoutes);

    }

    // create new netplan obj

       const updatedNetplan = {
        ...netplan,

        network: {
            ...netplan.network,

            ethernets: {
                ...netplan.network.ethernets,

                [ifaceName]: {
                    dhcp4: isDhcp,
                    addresses: splitAddresses,
                    routes: netplanRoutes,
                    nameservers: {
                        addresses: isDns
                            ? splitDnsServers
                            : []
                    }
                }
            }
        }
    };


    return updatedNetplan;
};

// function to apply the netplan
const applyNetplan = async(netplan)=>{
    try{
        const response =  await axios.post(`${apiUrl}/iface/netplan`, netplan)
        console.log(response.data)

    }
    catch(error){
        return error
    }
}

// function to execute nginx cmd
const nginxCmdFun = async(cmd)=>{
    console.log(cmd)
    try{
        const response = await axios.get(`${apiUrl}/nginx/operation?op=${cmd}`)
        console.log(response.data)
        return response.data
    }
    catch(error){
        console.log(error)
    }
}



// function to get the system lovel logs
const getSysLogs = async(cmd)=>{
    try{
        console.log(cmd)
        const response = await axios.get(`${apiUrl}/logs/sysLog?log=${cmd}`)
        console.log(response.data.data.data)

        return (response.data.data.data)
    }
    catch(error){
        console.log(error)
    }
}





export default {
    osInformation,
    ramPercentCal,
    cpuInfomation,
    diskInformation,
    getNetorkStatus,
    getNginxStatus,
    createNetplanObject,
    getNetplanFile,
    applyNetplan,
    nginxCmdFun,
    getSysLogs
}