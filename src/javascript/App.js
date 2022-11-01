import Error404Screen from "./screens/Error404Screen"
import WorkScreen from "./screens/WorkScreen"
import { parseRequestUrl } from "./utils"

const routes = {
    '/work/:id': WorkScreen
}

const router = () => {
    const request = parseRequestUrl()
    const parseUrl = (request.resource ? `/${request.resource}` : '/') +
    (request.id? `/:id`: '') +
    (request.action ? `/${request.action}` : '')
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
}