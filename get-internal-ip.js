// const { internalIpV4 } = import('internal-ip');
//
// async function setInternalIp() {
//     const internalHost = await internalIpV4();
//     process.env.INTERNAL_HOST = internalHost;
//     console.log(`Internal IP: ${internalHost}`);
// }
//
// setInternalIp();
//

import {internalIpV4} from "internal-ip";

async function setInternalIp() {
    const internalHost = await internalIpV4();
    process.env.INTERNAL_HOST = internalHost;
    console.log(`Internal IP: ${internalHost}`);
}

setInternalIp();
