import axios from 'axios';

const NAMESPACE = 'ingress-nginx';
const SERVICE_NAME = 'ingress-nginx-controller';
const BASE_URL = `http://${SERVICE_NAME}.${NAMESPACE}.svc.cluster.local`;

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL: BASE_URL,
      headers: req.headers,
    });
  } else {
    return axios.create({
      baseURL: '/',
    });
  }
};

export default buildClient;
