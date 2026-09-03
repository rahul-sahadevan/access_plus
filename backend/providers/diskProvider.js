const fs = require("fs/promises")
const {spawn} = require("child_process")
const runCommand = require("../utils/runCommand")


const diskProvider  = async()=>{
    try{

        const diskInfo = await runCommand("df",["-k"])
        if(!diskInfo.status){
            return diskInfo.error
        }

        const lines = diskInfo.data.trim().split('\n');
        let totalKib = 0;
        let freeKib = 0;

        // Skip the header row (index 0)
        for (let i = 1; i < lines.length; i++) {
            // Split line by whitespace
            const columns = lines[i].split(/\s+/);
            
            // Safety check for empty or malformed lines
            if (columns.length < 6) continue;

            const filesystem = columns[0];
            const totalSize = parseInt(columns[1], 10);
            const freeSize = parseInt(columns[3], 10); // Column 4 is "Available" space

            // Filter out pseudo/virtual filesystems (tmpfs, udev, loop devices)
            if (
            filesystem.startsWith('/dev/') && 
            !filesystem.includes('/dev/loop')
            ) {
            totalKib += totalSize;
            freeKib += freeSize;
            }
        }

        // Convert Kilobytes to Gigabytes (GB)
        const totalGB = (totalKib / (1024 * 1024)).toFixed(2);
        const freeGB = (freeKib / (1024 * 1024)).toFixed(2);
        const usedGB = (totalGB - freeGB).toFixed(2);

        console.log(`=== GLOBAL DISK USAGE ===`);
        console.log(`Total Capacity : ${totalGB} GB`);
        console.log(`Used Space     : ${usedGB} GB`);
        console.log(`Free Space     : ${freeGB} GB`);

        return {
            totalGB,
            freeGB,
            usedGB
        }

    } 
    catch(error){
        return error.message
    }
}

module.exports = diskProvider