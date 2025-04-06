import axios from 'axios'
const baseUrl = "http://localhost:3001"

const getAll = () => {
    return axios
        .get(`${baseUrl}/persons`)
        .then(resp => resp.data)
}

const create = (person) => {
    return axios
        .post(`${baseUrl}/persons`, person)
        .then(resp => resp.data)
}

const update = (id, person) => {
    return axios
        .put(`${baseUrl}/persons/${id}`, person)
        .then(resp => resp.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/persons/${id}`)
}

export default { getAll, create, update, remove }