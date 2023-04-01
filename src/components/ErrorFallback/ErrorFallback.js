export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </>
  );
};
