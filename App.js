import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      backgroundColor: '#09090b', 
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ background: '#f97316', padding: '20px', borderRadius: '50%', marginBottom: '20px' }}>
        <span style={{ fontSize: '40px' }}>🚚</span>
      </div>
      <h1 style={{ fontSize: '48px', margin: '0' }}>
        LogiTrack <span style={{ color: '#f97316' }}>Pro</span>
      </h1>
      <p style={{ color: '#71717a', fontSize: '18px', marginTop: '10px' }}>
        Atlas Delivery Dashboard is Now **LIVE**!
      </p>
      <div style={{ marginTop: '20px', padding: '10px 20px', border: '1px solid #27272a', borderRadius: '8px' }}>
        Status: <span style={{ color: '#22c55e' }}>● System Online</span>
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(React.createElement(App));
}
