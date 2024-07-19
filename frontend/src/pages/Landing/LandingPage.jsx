import React from 'react'
import { Navigate } from 'react-router-dom';

export default function LandingPage() {
  const IS_LOGGED_IN = localStorage.getItem('IS_LOGGED_IN')
  if (IS_LOGGED_IN) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div>LandingPage</div>
  )
}
