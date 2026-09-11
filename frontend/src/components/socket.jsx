
import systemServies from "./apiCallFun"

const socketConnection = ({
            setServerData,
            setCpuData,
            setRamPercent,
            setDiskUsage,
            setNetworkStatus,
            serviceData,
            setServiceData,
            setNginxStatus
        })=>{
    const wsUrl = import.meta.env.VITE_WS_URL
    console.log(wsUrl)

    const socket = new WebSocket(wsUrl)

    socket.onopen = ()=>{
        console.log("websocket connected")
    }

    socket.onmessage = (event)=>{
        try{

            const output = JSON.parse(event.data)
            // console.log(output.data,"socket out check")

            if(output.type === "system_data"){
               const {
                    cpuData,
                    diskUsage,
                    networkStatus,
                    serverData,
                    nginxInfo
                } = output.data

  
   
                if(setServerData){
                    setServerData(serverData)
                }
                if(setCpuData){
                    setCpuData(cpuData)
                }
                if(setNetworkStatus){
                    setNetworkStatus(networkStatus)
                }
                if(setDiskUsage){
                    setDiskUsage(diskUsage)
                }
                if(setServiceData){
                    setServiceData(prev => {
                        const existingService = prev.find(
                            service => service.serviceName === nginxInfo.serviceName
                        );
    
                        if (existingService) {
                            return prev.map(service =>
                                service.serviceName === nginxInfo.serviceName
                                    ? nginxInfo
                                    : service
                            );
                        }
    
                        return [...prev, nginxInfo];
                    });

                }
                console.log(nginxInfo,"nginxinfo from socket")
                if(setRamPercent){
                    const ramPercent = systemServies.ramPercentCal(serverData)
                    setRamPercent(ramPercent)
                }

                if(setNginxStatus){
                    setNginxStatus(nginxInfo)
                }
            }
        }
        catch(error){
            console.log(error)
        }
        
    }

    socket.onerror = (error)=>{
        console.log(error,"socket error")
    }

    socket.onclose = ()=>{
        console.log("socket connection close")
    }

    return ()=>{
        socket.close()
    }

}

export default socketConnection