import { useState } from 'react'
import { api } from './api.js'
import type { FormResult } from './types.js'

export default function ForgotPassword() {
  const [response, setResponse] = useState<FormResult>()
  if (response?.formMessages)
    return (
      <div>
        We&apos;ve sent a link to your email. Please check your email and click the link and follow
        the instructions. If you don&apos;t receive the link, please ensure you entered the email
        address correctly, and check in your spam folder just in case.
      </div>
    )
  return (
    <form
      onSubmit={ev => {
        ev.preventDefault()
        const body = new URLSearchParams(new FormData(ev.currentTarget) as any)
        api<FormResult>('/forgot-password', { method: 'post', body }).then(res => {
          if (!res.ok) return setResponse(res.error)
          setResponse(res.data)
        })
      }}
    >
      <fieldset>
        <legend>forgot password</legend>
        <div className="form-row">
          <label htmlFor="register-email-input">email:</label>
          <input
            type="text"
            name="email"
            id="register-email-input"
            autoComplete="email"
            aria-describedby="register-email-help"
            aria-invalid={Boolean(response?.fieldErrors?.email)}
            data-cy="forgot-email-input"
          />
          {response?.fieldErrors?.email?.map(e => (
            <div className="field-error" key={e} id="register-email-help">
              {e}
            </div>
          ))}
        </div>

        <div>
          {response?.formMessages?.map(e => (
            <div key={e} className="field-message">
              {e}
            </div>
          ))}
          {response?.formErrors?.map(e => (
            <div className="field-error" key={e}>
              {e}
            </div>
          ))}
          <button type="submit" data-cy="forgot-submit-button">
            Reset Password
          </button>
        </div>
      </fieldset>
    </form>
  )
}
