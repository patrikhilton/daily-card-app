import Header from './components/Header'
import ProfileMenu from './components/ProfileMenu'
import Page3 from './pages/Page3'          
import Page5 from './pages/Page5'
import Page6 from './pages/Page6'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <main>
        {/* Title row: name + tagline on the left, profile on the right */}
        <div className="app-top">
          <div>
            <h1 className="app-title">Tarot 22</h1>
            <p className="app-tagline">One card. One minute. One calm reflection.</p>
          </div>
          <ProfileMenu />
        </div>
        <Page3 />                          
        <Page5 />
        <Page6 />
      </main>
    </>
  )
}

export default App