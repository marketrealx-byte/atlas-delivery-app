import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  return (
    <div style={{ 
      backgroundColor: '#09090b', 
      color: 'white', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ backgroundColor: '#f97316', padding: '20px', borderRadius: '15px', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>🚚</h1>
      </div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
        LogiTrack <span style={{ color: '#f97316' }}>Pro</span>
      </h1>
      <p style={{ color: '#a1a1aa', marginTop: '10px' }}>Atlas Delivery Dashboard is LIVE!</p>
      
      <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #27272a', borderRadius: '10px', backgroundColor: '#18181b' }}>
        <p>System Status: <span style={{ color: '#22c55e' }}>● Connected</span></p>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(React.createElement(App));
}
