import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)
  let message

  if (isRouteErrorResponse(error)) {
    message = error.statusText
  } else if (error instanceof Error) {
    message = error.message
  } else {
    message = 'Unknown error'
  }
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{message}</i>
      </p>
    </div>
  )
}
