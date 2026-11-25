import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'

const ARTISTS_URL = "https://dedw-artistas.fly.dev/api/v1/artists/"

export default function Home() {
  const [artists, setArtists] = useState([])
  const { token } = useAuth()

  useEffect(() => {
    if (token) {
      fetch(ARTISTS_URL, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then(res => res.json()).then((artists) => {
        console.log(artists)
        setArtists(artists)
      })
    }
  }, [token])

  return (
    <>
      <header className="container">
        <nav>
          <ul>
            <li><strong>🎸 Artistas</strong></li>
          </ul>
          {!token && (
            <ul>
              <li><Link to="/login">Iniciar sesión</Link></li>
            </ul>
          )}
        </nav>
      </header>
      <main className="container">
        <h1>Inicio</h1>
        {token && <p>Bienvenido. Aquí estarán tus artistas</p>}
        {!token && <p>Bienvenido. Inicia sesión para ver tus artistas.</p>}
      </main>
    </>
  )
}
