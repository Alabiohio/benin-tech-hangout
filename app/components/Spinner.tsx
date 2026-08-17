'use client'
import { useEffect } from 'react'

export default function Spinner({ size = "20", color = "white", stroke = "2" }) {
  useEffect(() => {
    async function getRing() {
      const { ring } = await import('ldrs')
      ring.register()
    }
    getRing()
  }, [])

  // @ts-ignore
  return <l-ring size={size} stroke={stroke} bg-opacity="0" speed="2" color={color}></l-ring>
}
