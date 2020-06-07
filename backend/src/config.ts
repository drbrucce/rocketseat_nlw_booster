const config = {
    server:"192.168.0.3",
    port:3333,
    staticFiles:"uploads",
}

const fullUrlStaticFiles = `https://${config.server}:${config.port}/${config.staticFiles}`

export default config
