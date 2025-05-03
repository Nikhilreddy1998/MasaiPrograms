import React, { useState, useEffect } from 'react';

export function JokeCard() {
  const [joke, setJoke] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchJoke = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setJoke(`${data.setup} ${data.punchline}`)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }

    fetchJoke()
  }, [])

  const handleGetNewJoke = () => {
    setLoading(true);
    setError(null);
    fetch('https://official-joke-api.appspot.com/random_joke')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json();
      })
      .then(data => {
        setJoke(`${data.setup} ${data.punchline}`)
      })
      .catch(e => {
        setError(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (loading) {
    return <div>Loading joke...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', width: '300px' }}>
      <p>{joke}</p>
      <button onClick={handleGetNewJoke}>Get Another Joke</button>
    </div>
  )
}

