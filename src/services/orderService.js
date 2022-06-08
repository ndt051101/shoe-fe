import axios from "../axios";

const getOrderByStatus = (status) => {
    return axios.get(`/api/admin/order/${status}`, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    });
}

const orderDelivering = (id) => {
    return axios.post(`/api/admin/order/delivering`, { id }, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    });
}

const orderDelivered = (id) => {
    return axios.post(`/api/admin/order/delivered`, { id }, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    });
}

export {
    getOrderByStatus,
    orderDelivering,
    orderDelivered
}
