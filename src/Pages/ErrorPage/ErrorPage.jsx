import React from 'react';

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {/* Decorative Element */}
        <p className="text-6xl font-black text-indigo-600">404</p>
        
        {/* Main Content */}
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
          >
            Go back home
          </a>
          <a href="/support" className="text-sm font-semibold text-gray-900 hover:text-indigo-600">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        {/* Optional: Helpful Links */}
        <div className="mt-16 border-t border-gray-200 pt-10">
          <p className="text-sm text-gray-500">Try searching for something else or visit our:</p>
          <div className="mt-4 flex justify-center space-x-6 text-sm font-medium text-indigo-600">
            <a href="/blog" className="hover:underline">Blog</a>
            <a href="/faq" className="hover:underline">FAQs</a>
            <a href="/sitemap" className="hover:underline">Sitemap</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;