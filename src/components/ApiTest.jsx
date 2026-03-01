import React, { useState } from 'react';
import { registerUser } from '../services/api';

const ApiTest = () => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const testRegistration = async () => {
    try {
      setResult('');
      setError('');
      console.log('Testing registration...');
      
      const testData = {
        username: 'testuser123',
        email: 'test123@example.com',
        phone: '1234567890',
        password: 'password123',
        confirmPassword: 'password123'
      };
      
      console.log('Sending test data:', testData);
      const response = await registerUser(testData);
      console.log('Test response:', response);
      setResult(JSON.stringify(response, null, 2));
    } catch (err) {
      console.error('Test error:', err);
      setError(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>API Test Component</h2>
      <button onClick={testRegistration} style={{ padding: '10px 20px', marginBottom: '20px' }}>
        Test Registration API
      </button>
      
      {result && (
        <div style={{ background: '#d4edda', padding: '15px', borderRadius: '5px', marginBottom: '10px' }}>
          <h3>Success Response:</h3>
          <pre>{result}</pre>
        </div>
      )}
      
      {error && (
        <div style={{ background: '#f8d7da', padding: '15px', borderRadius: '5px' }}>
          <h3>Error Response:</h3>
          <pre style={{ color: '#721c24' }}>{error}</pre>
        </div>
      )}
      
      <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '5px' }}>
        <h3>Instructions:</h3>
        <p>1. Open browser developer tools (F12)</p>
        <p>2. Go to Console tab</p>
        <p>3. Click the "Test Registration API" button</p>
        <p>4. Check the console for detailed logs</p>
      </div>
    </div>
  );
};

export default ApiTest;