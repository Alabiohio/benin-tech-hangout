import ErrorPage from "./components/ErrorPage";

export default function NotFound() {
  return <ErrorPage code="404" message={<>Looking for something<br />you can&apos;t find?</>} />;
}