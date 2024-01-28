import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (

      <>
        <Header />
        <main>Principal</main>
        <Footer />
      
      
      </>

  )
}

export default App
