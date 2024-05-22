import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider , SignedIn, SignedOut, SignIn} from '@clerk/clerk-react'
import App from './App.jsx'
import './App.css'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <SignedIn>
      <App />
    </SignedIn>
    <SignedOut>
      <SignIn/>
    </SignedOut>
    </ClerkProvider>
  </React.StrictMode>,
)
