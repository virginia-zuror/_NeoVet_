import axios from 'axios';

const APIHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  Authorization: {
    toString() {
      return `Bearer ${localStorage.getItem('token')}`;
    },
  },
};

export const API = axios.create({
  baseURL: 'http://localhost:8080/neovet',
  headers: APIHeaders,
  timeout: 6000,
});
