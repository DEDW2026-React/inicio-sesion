import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Navigate } from 'react-router'

const LOGIN_URL = 'https://dedw-artistas.fly.dev/api/v1/login/'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, token } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    // Aquí va el inicio de sesión
    // POST ---> API de inicio de sesión

    fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      })
    }).then((response) => {
      return response.json()
    }).then((json) => {
      login(json.token)
      navigate("/")
    })
  }

  console.log(token)

  if (token) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="container">
      <article style={{ maxWidth: 420, margin: '4rem auto' }}>
        <header>
          <h2 style={{ marginBottom: 0 }}>🎸 Iniciar sesión</h2>
        </header>
        <form onSubmit={handleSubmit}>
          <label>
            Usuario
            <input
              name="username"
              autoComplete="username"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Entrar</button>
        </form>
      </article>
    </main>
  )
}
