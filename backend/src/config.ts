const config = {
    server:"localhost",
    port:3333,
    staticFiles:"uploads",
}

const fullUrlStaticFiles = `https://${config.server}:${config.port}/${config.staticFiles}`

export default config
