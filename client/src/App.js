import { useState } from "react";
import { getResultItems } from "./utils/resultFields";

export default function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  return (
    <div className="App">
      <NavBar />
      <main className="main-container">
        <ShortUrlSection result={result} error={error} setResult={setResult} setError={setError} />
        <ResultSection result={result} error={error} />
      </main>
    </div>
  );
}

function NavBar() {
  return (
    <nav className="navbar">
      <h1>URL SHORTENER</h1>
      <p>Turn long URLs into short, shareable links</p>
    </nav>
  );
}

function ShortUrlSection({ result, error, setResult, setError }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  function handleOnChange(e) {
    setError(null);
    setResult(null);
    setUrl(e.target.value);
  }

  function handleClear() {
    setResult(null);
    setError(null);
    setUrl("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setResult(null);
      setError(null);
      setLoading(true);

      const response = await fetch("/api/shorturl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Something went wrong");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="url-section">
      <div className="section-card">
        <form onSubmit={handleSubmit}>
          <label className="input-label" htmlFor="url">
            Enter URL
          </label>
          <input
            type="url"
            name="url"
            id="url"
            className="input"
            placeholder="https://example.com/your-long-url"
            value={url}
            onChange={handleOnChange}
            required
          />
          <div className="btn-container">
            <button type="submit" className="btn submit-btn">
              {!loading ? "Shorten URL" : "Shortening..."}
            </button>
            {(result || error) && (
              <button type="button" className="btn btn-clear" onClick={handleClear}>
                Clear
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

function ResultSection({ result, error }) {
  let resultItems;

  if (!result && !error) return null;

  if (result) {
    resultItems = getResultItems(result);
  }

  return (
    <section className="result-section">
      <div className="section-card result">
        <h4 className="result-title">{error ? "Oops!" : "Your Short URL"}</h4>

        {error ? (
          <p className="error-msg">{error}</p>
        ) : (
          resultItems.map((item) => (
            <ResultItem key={item.id} label={item.label} value={item.value} href={item.href} />
          ))
        )}
      </div>
    </section>
  );
}

function ResultItem({ label, value, href }) {
  return (
    <div className="result-item">
      <span>{label}</span>

      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {value}
        </a>
      ) : (
        <strong>{value}</strong>
      )}
    </div>
  );
}
