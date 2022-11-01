export const parseRequestUrl = () => {
    const url = document.location.pathname.toLowerCase()
    const request = url.split('/')
    return {
        resource: request[1],
        id: request[2],
        action: request[3]
    }
}