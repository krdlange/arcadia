import React from 'react'
import Searchbar from '../components/Searchbar'
import Mostpopulargames from '../components/Mostpopulargames'
import Mostanticipated from '../components/Mostanticipated'
export default function Homepage() {
  return (
    <div className="container mt-4">
    <div className="row mb-4">
      <Mostpopulargames/>
      <Mostanticipated/>
      <h3>Recent searches:</h3>
      <h3>Recently viewed:</h3>
    </div>
    </div>
  )
}
