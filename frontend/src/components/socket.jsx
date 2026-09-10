

const socketConnection = ()=>{
    const wsUrl = import.meta.env.VITE_WS_URL
    console.log(wsUrl)

    const socket = new WebSocket(wsUrl)

    socket.onopen = ()=>{
        console.log("websocket connected")
    }

    socket.onmessage = (event)=>{
        const output = event.data
        console.log(JSON.parse(output),"socket output")
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