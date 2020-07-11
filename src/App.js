import React from 'react'
import { data } from './assets/data'
import List from './components/List'

function App() {

  const allItems = data.shop.categories.map((item, index) => {
    return {
      ...item,
      active: false,
      counter: 0,
      index: index
    }
  })

  return (
    <div className="App">
      <List data={allItems}/>
    </div>
  )
}

export default App;
