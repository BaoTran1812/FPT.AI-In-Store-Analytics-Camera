import axios from 'axios';
import isTokenExpired from '../utils/localStorage';

//https://github.com/auth0/jwt-decode/issues/53

const configKeys = require('../config/keys');
const client = axios.create({
  baseURL: configKeys.apiUrl
});
export default client;


