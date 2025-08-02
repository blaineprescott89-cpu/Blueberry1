import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Switch } from 'wouter'

function Landing() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>🫐 Blueberry</h1>
      <h2>Law School Application Tracker</h2>
      <p>Your comprehensive platform for law school applications</p>
      <div style={{ margin: '30px 0' }}>
        <a href="/signup" style={{ background: '#007bff', color: 'white', padding: '12px 24px', textDecoration: 'none', borderRadius: '5px', margin: '0 10px' }}>
          Sign Up
        </a>
        <a href="/login" style={{ background: '#28a745', color: 'white', padding: '12px 24px', textDecoration: 'none', borderRadius: '5px', margin: '0 10px' }}>
          Login
        </a>
      </div>
    </div>
  )
}

function Signup() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>🫐 Sign Up for Blueberry</h1>
      <p>Create your account to start tracking law school applications</p>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <input 
          type="email" 
          placeholder="Email" 
          style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button 
          style={{ width: '100%', padding: '12px', margin: '10px 0', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Create Account
        </button>
      </div>
      <p><a href="/">Back to Home</a></p>
    </div>
  )
}

function Login() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>🫐 Login to Blueberry</h1>
      <p>Access your law school application dashboard</p>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <input 
          type="email" 
          placeholder="Email" 
          style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button 
          style={{ width: '100%', padding: '12px', margin: '10px 0', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Sign In
        </button>
      </div>
      <p><a href="/">Back to Home</a></p>
    </div>
  )
}

function App() {
  return (
    <Switch>
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/" component={Landing} />
    </Switch>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)