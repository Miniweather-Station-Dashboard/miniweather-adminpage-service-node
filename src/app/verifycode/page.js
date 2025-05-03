'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { 
  setCredentials,
  completeVerification,
  incrementVerificationAttempts,
  setLoading, 
  setError, 
  clearError 
} from '@/redux/slices/authSlice'
import apiClient from '@/lib/apiClient'

export default function VerifyPage() {
  const [code, setCode] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()
  const { verification, isLoading, error } = useSelector((state) => state.auth)

  // Redirect if no email is being verified
  useEffect(() => {
    if (!verification.email) {
      router.push('/login')
    }
  }, [verification.email, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(clearError())
    
    if (!verification.email) {
      dispatch(setError("No email found for verification"))
      return
    }
    
    if (code.length < 6) {
      dispatch(setError("Please enter a valid 6-digit code"))
      return
    }
    
    dispatch(setLoading(true))
    dispatch(incrementVerificationAttempts())

    try {
      const response = await apiClient.post('/v1/auth/verify-code', {
        email: verification.email,
        code
      })

      dispatch(setCredentials({
        user: response.data.data.user,
        accessToken: response.data.data.accessToken,
        refreshToken: response.data.data.refreshToken,
      }))
      
      dispatch(completeVerification())
      router.push('/dashboard')
    } catch (err) {
      dispatch(setError(err.response?.data?.message || 'Verification failed'))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleResendCode = async () => {
    dispatch(clearError())
    
    if (!verification.email) {
      dispatch(setError("No email found for verification"))
      return
    }
    
    dispatch(setLoading(true))

    try {
      await apiClient.post('/v1/auth/resend-verification', {
        email: verification.email
      })
    } catch (err) {
      dispatch(setError(err.response?.data?.message || 'Failed to resend code'))
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We&apos;ve sent a verification code to {verification.email}
          </p>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <input
                id="code"
                name="code"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                required
                value={code}
                onChange={(e) => {
                  if (e.target.validity.valid) {
                    setCode(e.target.value)
                  }
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter 6-digit code"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Verifying...' : 'Verify Account'}
            </button>
          </div>
          
          <div className="text-center text-sm">
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isLoading}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Didn&apos;t receive a code? Resend
            </button>
            {verification.attempts > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                Attempts: {verification.attempts}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}