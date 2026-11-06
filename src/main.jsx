import React from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, theme } from 'antd';
import App from './App.jsx';
import './styles.css';

const tokens = {
  colorPrimary: '#74e5c7', colorInfo: '#7dbbff', colorText: '#edf4ff', colorTextSecondary: '#b2bfd4',
  colorBgBase: '#080e1c', colorBgContainer: '#111d30', colorBorder: '#2a3b54',
  colorLink: '#74e5c7', borderRadius: 14, fontFamily: "'DM Sans', system-ui, sans-serif",
};
createRoot(document.getElementById('root')).render(
  <React.StrictMode><ConfigProvider theme={{ algorithm: theme.darkAlgorithm, token: tokens }}><App /></ConfigProvider></React.StrictMode>
);
