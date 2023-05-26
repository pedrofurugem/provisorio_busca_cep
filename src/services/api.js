import axios from 'axios'

/*
baseUrl: ​https://viacep.com.br/ws
resto: /79560000/json
*/

const api = axios.create({
    //temque escrever certo a baseURL
    baseURL: 'https://viacep.com.br/ws'
})

export default api