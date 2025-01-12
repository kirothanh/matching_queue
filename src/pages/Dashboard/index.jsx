import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL);

export default function Dashboard() {
  const [noti, setNoti] = useState([]);

  useEffect(() => {
    socket.on('pushNoti', (data) => {
      console.log('receive: ', data)
      setNoti((prev) => [...prev, data])
    })
    return () => {
      socket.off('pushNoti')
    }
  }, [])

  return (
    <>
      <div>Dashboard</div>
      <ul>
        {
          noti.map((notihi, index) => (
            <li key={index}>{notihi.message}</li>
          ))
        }
      </ul>
    </>
  )
}
