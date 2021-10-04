import axios from 'axios';

const testInstance = axios.create({
  baseURL: 'http://localhost:8080/',
});

const productionInstance = axios.create({
  baseURL: 'https://pay.iredullc.com/'
});

export { testInstance, productionInstance };
