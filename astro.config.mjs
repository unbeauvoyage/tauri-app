import {defineConfig} from 'astro/config';

import react from "@astrojs/react";

const isProd = import.meta.env.PROD


let internalHost = null;

if (!isProd) {
    const {internalIpV4} = await import('internal-ip');
    internalHost = await internalIpV4();
    console.log(`Internal IP: ${internalHost}`);
}

// https://astro.build/config
export default defineConfig({
    integrations: [react()],
    server: {
        host: internalHost,
        port: 4323
    },
    vite: {
        // Better support for Tauri CLI output
        clearScreen: false,
        // Enable environment variables
        // Additional environment variables can be found at
        // https://tauri.app/2/reference/environment-variables/
        envPrefix: ['VITE_', 'TAURI_'],
        server: {
            // Tauri requires a consistent port
            strictPort: true,
            // Enables the development server to be discoverable by other devices for mobile development
            // host: '0.0.0.0',
            host: internalHost,
            hmr: {
                // Use websocket for mobile hot reloading
                protocol: 'ws',
                // Make sure it's available on the network
                // host: '0.0.0.0',
                host: internalHost,
                // Use a specific port for hmr
                port: 5183,
            },
        },
    },
});