import React from 'react';
import Input from '../Input/Input';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../ErrorFallback/ErrorFallback';

function App() {
  return (
    <div>
      <h3>GitHub Repository Search</h3>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Input />
      </ErrorBoundary>
    </div>
  );
}

export default App;
