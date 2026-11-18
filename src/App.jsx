import Header from './components/Header'
import Page3 from './pages/Page3'          
import Page5 from './pages/Page5'
import Page6 from './pages/Page6'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <h1>Daily Card App</h1>
        <Page3 />                          
        <Page5 />
        <Page6 />
      </main>
    </>
  )
}

export default App