// src/utils/get-internal-ip.js

const { internalIpV4 } = require('internal-ip');
const { execSync } = require('child_process');

async function setInternalIpAndRunCommand(command) {
    const internalHost = await internalIpV4();
    process.env.INTERNAL_HOST = internalHost;
    console.log(`Internal IP: ${internalHost}`);

    // Execute the provided command with the environment variable set
    execSync(command, { stdio: 'inherit', env: { ...process.env, INTERNAL_HOST: internalHost } });
}

// Get the command from command-line arguments
const command = process.argv.slice(2).join(' ');

// Run the function with the provided command
setInternalIpAndRunCommand(command);


// import {internalIpV4} from "internal-ip";
//
// async function setInternalIp() {
//     const internalHost = await internalIpV4();
//     console.log(`Internal IP... in get internal ip: ${process.env.INTERNAL_HOST}`);
//     process.env.INTERNAL_HOST = internalHost;
//     console.log(`Internal IP... in get internal ip: ${process.env.INTERNAL_HOST}`);
// }
//
// setInternalIp();
