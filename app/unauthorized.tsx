import ErrorPage from './components/ErrorPage';

export default function Unauthorized() {
  return <ErrorPage code="401" message={<>You need permission<br />to view this page.</>} />;
}