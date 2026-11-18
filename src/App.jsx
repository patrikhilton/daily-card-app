import Header from './components/Header'
import ProfileMenu from './components/ProfileMenu'
import Page3 from './pages/Page3'          
import Page5 from './pages/Page5'
import Page6 from './pages/Page6'
import './App.css'

function App() {
  // Fake for now. Later: the logged-in user from Tharanga's login part.
  // Written once here, then given to the pages that need it (as a "prop").
  const username = 'Qiqi'

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
          <ProfileMenu username={username} />
        </div>
        {/* Thin line between the title row and the page */}
        <hr className="app-divider" />
        <Page3 username={username} />
        <Page5 />
        <Page6 />
      </main>
    </>
  )
}

export default App