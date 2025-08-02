import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1>🫐 Blueberry Law School Tracker</h1>
      <p>Your comprehensive law school application platform</p>
      <div style={{ margin: '20px 0' }}>
        <button onClick={() => setCount((count) => count + 1)}>
          Test Counter: {count}
        </button>
      </div>
      <p>✅ Deployment successful! Railway is working.</p>
    </div>
  )
}

export default App
