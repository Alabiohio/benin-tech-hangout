'use client';

import ErrorPage from './components/ErrorPage';

export default function Error() {
  return <ErrorPage code="500" message={<>Something went wrong<br />on our end.</>} />;
}