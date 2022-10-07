import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function NotFound() {
  const history = useHistory()
  const [time, setTime] = useState(3)
  useEffect(() => {
    let timer = setTimeout(() => {
      setTime(time - 1)
    }, 1000)
    if (time === 0) {
      clearTimeout(timer)
      history.push('/home')
    }
  }, [history, time])

  //   useEffect(() => {
  //     let timer = setTimeout(() => {
  //       setTime(time - 1)
  //     }, 1000)
  //     return () => {
  //       clearTimeout(timer)
  //     }
  //   })
  //   useEffect(() => {
  //     if (time === 0) {
  //       history.push('./home')
  //     }
  //   },[time,history])
  return (
    <div>
      <h1>sorry, 404 </h1>
      <p>
        {time} seconds, go back to <Link to="/home">home page</Link>
      </p>
    </div>
  )
}
