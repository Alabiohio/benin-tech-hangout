import ErrorPage from './components/ErrorPage';

export default function Forbidden() {
  return <ErrorPage code="403" message={<>This page is off limits<br />for your account.</>} />;
}