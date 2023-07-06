import React from 'react'
import Mostpopulargames from '../components/Mostpopulargames'
import Mostanticipated from '../components/Mostanticipated'
import Recentreleases from '../components/Recentreleases'

export default function Homepage() {
  return (
    <div className="container mt-4">
    <div className="row mb-4">
        <Recentreleases/>
      <Mostpopulargames/>
      <Mostanticipated/>
      <h3>Recent searches:</h3>
      <h3>Recently viewed:</h3>
    </div>
    </div>
  )
}
