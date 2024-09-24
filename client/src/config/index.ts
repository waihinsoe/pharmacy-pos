interface Config {
    apiBaseUrl: string;
    socketUrl: string;
}

export const config: Config = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    socketUrl: import.meta.env.VITE_SOCKET_URL,
};
