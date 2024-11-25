import { useState } from 'react'
import { useAuth } from './Auth.ctx'
import type { FormErrorResult } from './types.js'

export default function Settings() {
  const auth = useAuth()
  const [response, setResponse] = useState<FormErrorResult>()
  return (
    <form
      method="post"
      onSubmit={ev => {
        ev.preventDefault()
        const body = new URLSearchParams(new FormData(ev.currentTarget) as any)
        fetch('/api/settings', { method: 'post', body })
          .then(res => res.json())
          .then(res => {
            if (res.username) {
              setResponse(undefined)
              return auth.setUser(res)
            }
            setResponse(res)
          })
      }}
    >
      <fieldset>
        <legend>profile settings</legend>

        <div className="form-row">
          <label htmlFor="settings-username-input">username:</label>
          <input
            type="text"
            name="username"
            id="settings-username-input"
            defaultValue={auth.user.username}
          />
          {response?.fieldErrors?.username &&
            response.fieldErrors.username.map(e => (
              <div className="field-error" key={e}>
                {e}
              </div>
            ))}
        </div>
        <div>
          {response?.formErrors &&
            response.formErrors.map(e => (
              <div className="field-error" key={e}>
                {e}
              </div>
            ))}
          <button type="submit">update</button>
        </div>
      </fieldset>
    </form>
  )
}
