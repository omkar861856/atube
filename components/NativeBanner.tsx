'use client';

import Script from 'next/script';

/**
 * Native Banner ad for atube.vercel.app
 * Place anywhere in the page body — renders a native ad widget.
 */
export default function NativeBanner() {
  return (
    <div style={{ width: '100%', minHeight: 60 }}>
      <Script
        async
        data-cfasync="false"
        src="https://developdomicile.com/4f617d7e65fa02a2b621f9487d1e16be/invoke.js"
        strategy="lazyOnload"
      />
      <div id="container-4f617d7e65fa02a2b621f9487d1e16be" />
    </div>
  );
}
