'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

export default function ProtectedRoute({ children, requireVerification = true }) {
  const router = useRouter()
  const { accessToken, verification } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!accessToken) {
      router.push('/login')
    } else if (requireVerification && verification.status !== 'verified') {
      router.push('/verifycode')
    }
  }, [accessToken, verification.status, requireVerification, router])

  if (!accessToken || (requireVerification && verification.status !== 'verified')) {
    return null 
  }

  return <>{children}</>
}