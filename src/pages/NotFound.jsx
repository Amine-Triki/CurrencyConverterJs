import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export const NotFound = () => {
  return (
    <main className="notfound-page d-flex align-items-center justify-content-center">
      <section className="notfound-card text-center">
        <p className="notfound-code mb-2">404</p>
        <h1 className="notfound-title mb-3">Page Not Found</h1>
        <p className="notfound-subtitle mb-4">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="notfound-actions d-flex gap-2 justify-content-center flex-wrap">
          <Link to="/" className="btn notfound-btn-primary">
            Back Home
          </Link>
          <Link to="/currencyConverter" className="btn notfound-btn-secondary">
            Open Converter
          </Link>
        </div>
      </section>
    </main>
  );
};
