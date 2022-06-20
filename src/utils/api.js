import axios from "axios";
import { BASE_API_URL } from "./constants";
import { searchGateway } from "./helpers";

export const fetchData = async (endpoint) => {
    try {
        let response = await axios.get(BASE_API_URL + '/' + endpoint)
        return response.data
    } catch ( err ) {
        throw err
    }

}

export const fetchProjects = async () => {
    try {
        let response = await axios.get(BASE_API_URL + '/projects')
        return response.data
    } catch ( err ) {
        throw err
    }

}

export const fetchGateways = async () => {
    try {
        let response = await axios.get(BASE_API_URL + '/gateways')
        return response.data
    } catch ( err ) {
        throw err
    }

}

export const fetchReport = async (data) => {
    try {
        let response = await axios.post(BASE_API_URL + '/report', data)
        return response.data
    } catch ( err ) {
        throw err
    }

}

export const fetchGrouped = async (from, to, projectId, gatewayId) => {
    let response = []
    try {
        var projects = await axios.get(BASE_API_URL + '/projects')
        if ( projectId === '' ) {
            response.projects = projects.data.data
        } else {
            projects.data.data.forEach((e) => {
                if ( e.projectId === projectId ) {
                    response.projects = []
                    response.projects.push(e)
                }
            })
        }
    } catch ( err ) {
        throw err
    }

    try {
        var gateways = await axios.get(BASE_API_URL + '/gateways')
        if ( gatewayId === '' ) {
            response.gateways = gateways.data.data
        } else {
            gateways.data.data.forEach((e) => {
                if ( e.gatewayId === gatewayId ) {
                    response.gateways = []
                    response.gateways.push(e)
                }
            })
        }
        
    } catch ( err ) {
        throw err
    }

    try {
        let data = {from:from, to:to, projectId:projectId, gatewayId:gatewayId}
        var reports = await axios.post(BASE_API_URL + '/report', data)
    } catch ( err ) {
        throw err
    }

    response.projects.forEach(project => {
        let transactions = []
        let totalAmount = 0
        reports.data.data.forEach(report => {
            if ( report.projectId === project.projectId ) {
                report.gatewayName = searchGateway(gateways.data.data, report)
                transactions.push(report)
                totalAmount += report.amount
            }
        });
        project.transactions = transactions
        project.totalAmount = totalAmount.toFixed(2)
    });

    response.gateways.forEach(gateway => {
        let transactions = []
        let totalAmount = 0
        reports.data.data.forEach(report => {
            if ( report.gatewayId === gateway.gatewayId ) { 
                transactions.push(report)
                totalAmount += report.amount
            }
        });
        gateway.transactions = transactions
        gateway.totalAmount = totalAmount.toFixed(2)
    })
    return response
}

