import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom';
import ErrorBoundary from '../error/ErrorBoundary';
import Loading from '../compressimage/reflex/Loading';

const LayoutOutlet = () => {
  return (
    <Suspense fallback={
      // <LoadingPlaceholder />
      <Loading />
    }>
      <ErrorBoundary reloadOnReset>
        <Outlet />

      </ErrorBoundary>
    </Suspense>
  )
}

export default LayoutOutlet;