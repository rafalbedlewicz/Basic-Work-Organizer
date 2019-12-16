const routers = require.context('./components/', true, /\.router\.js$/);
const components = require.context('./components/', true, /\.component\.js$/);
const services = require.context('./services/', true, /\.service\.js$/);
const constants = require.context('./constants/', true, /\.constant\.js$/);

routers.keys().forEach(routers);
components.keys().forEach(components);
services.keys().forEach(services);
constants.keys().forEach(constants);