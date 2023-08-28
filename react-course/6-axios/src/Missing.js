import { Link } from 'react-router-dom';

function Missing() {
  return (
    <main className="Missing">
      <h2>Page Not Found</h2>

      <p>
        <Link to="/">Back to Homepage</Link>
      </p>
    </main>
  )
}

export default Missing;