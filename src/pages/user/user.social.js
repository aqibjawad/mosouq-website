import React from 'react';
import './index.css';

function SocialSettings() {
  return (
    <div className="social-settings">
      <h2>My social settings</h2>
      <button className="social-button apple mt-4" style={{ fontWeight: '400', fontSize: "12px", backgroundColor: 'white', color: "black", border: "1px solid #CECECE" }}>
        <img src="/facebook.png" style={{ width: '24px', height: "24px", marginRight: '0.5rem' }} />  Continue with Apple
      </button>
      <br />
      <div className='mt-2'>
        <a className='' href="/">Disconnect my Google profile from Mosouq</a>
      </div>
    </div>
  );
}

export default SocialSettings;
