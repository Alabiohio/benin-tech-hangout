'use client';

import ErrorPage from './components/ErrorPage';

export default function GlobalError() {
  return (
    <html lang="en">
      <body>
        <ErrorPage code="500" message={<>Something went wrong<br />on our end.</>} />
      </body>
    </html>
  );
}