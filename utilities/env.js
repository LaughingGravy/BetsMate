export function getServerUrl(host = process.env.HOST, port = process.env.PORT, allowSSL = true) {
    // Check for SSL
    if (allowSSL && process.env.SSL_PORT) {
        const stub = `https://$host || process.env.HOST}`;

        // If we're on port 443, it is a regular SSL so no need to specify port
        if (process.env.SSL_PORT === '443') return stub;

        return `${stub}:${process.env.SSL_PORT}`;
    }

    // Plain http
    const stub = `http://${host || process.env.HOST}`;4

    // If on port 80, that is a regaular http so no need to specify port
    if (port === '80') return stub;

    return `${stub}:${port}`;
}