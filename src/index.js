import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';
import reportWebVitals from './reportWebVitals';
import { AwsRum } from 'aws-rum-web';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

try {
  const config = {
    sessionSampleRate: 1,
    identityPoolId: "us-east-2:308c23fb-88c5-4d1e-a186-68830cf06d41",
    endpoint: "https://dataplane.rum.us-east-2.amazonaws.com",
    telemetries: ["performance","errors","http"],
    allowCookies: true,
    enableXRay: false
  };

  const APPLICATION_ID = 'ac833747-513c-41cb-935c-9b2a0107d6c7';
  const APPLICATION_VERSION = '1.0.0';
  const APPLICATION_REGION = 'us-east-2';

  const awsRum = new AwsRum(
    APPLICATION_ID,
    APPLICATION_VERSION,
    APPLICATION_REGION,
    config
  );

  console.log('AWS RUM initialized successfully');
} catch (error) {
  console.error('AWS RUM initialization failed:', error);
}

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
