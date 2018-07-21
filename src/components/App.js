import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (e) => {
    console.log(this.state.pets)
    this.setState({
      filters: {
        type: e.target.value
      }
    })
  }

  getPets = () => {
    if (this.state.filters.type === 'all') {
      fetch('/api/pets').then(response => 
      response.json()).then(
        pets => this.setState({
          pets
        })
      )
    } else {
    fetch(`/api/pets?type=${this.state.filters.type}`).then(response =>
      response.json()).then(
      pets => this.setState({
        pets
      })
      )
    }
  }

  onAdoptPet = (petID) => {
    let pets = this.state.pets
    const adoptedPet = pets.find(pet => pet.id === petID)
    adoptedPet.isAdopted = true
    this.setState({
      pets
    })
  }

  render () {
    return (
      <div className='ui container'>
        <header>
          <h1 className='ui dividing header'>React Animal Shelter</h1>
        </header>
        <div className='ui container'>
          <div className='ui grid'>
            <div className='four wide column'>
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.getPets} />
            </div>
            <div className='twelve wide column'>
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
