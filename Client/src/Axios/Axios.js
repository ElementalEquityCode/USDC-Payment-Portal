import axios from 'axios';

const testInstance = axios.create({
  baseURL: 'http://localhost:8080/',
});

const productionInstance = axios.create({
  baseURL: 'https://test.iredullc.com/'
});

export { testInstance, productionInstance };
