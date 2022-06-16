export const searchGateway = (gateways, element) => {
    var result = ''
    gateways.forEach(el => {
        if ( el.gatewayId === element.gatewayId) {
            result = el.name
        }
    });
    return result
}

export const findProjectById = (id, projects) => {
    var result = ''
    if ( id === '' ) {
        result = 'All projects'
    }
    projects.forEach((el) => {
        if ( el.projectId === id ) {
            result = el.name
        }
    })
    return result
}

export const findGatewayById = (id, gateways) => {
    var result = ''
    if ( id === '' ) {
        result = 'All gateways'
    }
    gateways.forEach((el) => {
        if ( el.gatewayId === id ) {
            result = el.name
        }
    })
    return result
}