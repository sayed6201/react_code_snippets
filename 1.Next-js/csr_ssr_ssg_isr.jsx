
// ====================================================
// SSG - Static side generation - getStaticProps ()
// Data+Markup(html) is sent from the server
// During the build time the data is fetched only, 
// so immediate update in database won't be reflected, until a new build is generated
// Build is generated when code is pushed to dev
// SEO optimized
// Example: Blog sites, or static sites where instant interaction or update is not required
// ====================================================

// static site generation
import { YOUR_API_URL } from '../lib/api';

export default function StaticSiteGeneration({ data }) {
  return (
    <>
      {data.map((e) => (
        <h2 key={e.id}>{e.name}</h2>
      ))}
    </>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  const res = await fetch(YOUR_API_URL);
  const data = await res.json();

  return {
    props: {
      data, // will be passed to the page component as props
    },
  };
}


// ====================================================
// ISR - incremental static generation - same as SSR, just add revalidate getStaticProps()
// Data-Markup(html) is sent from the server
// During the build time the data is fetched, also after every interval
// so immediate update in database will be reflected after the interval
// SEO optimized
// Example: blogs where you may not need to show immediate updates
// ====================================================

// incremental static generation
import { YOUR_API_URL } from '../lib/api';

export default function IncrementalStaticRegeneration({ data }) {
  return (
    <>
      {data.map((e) => (
        <h2 key={e.id}>{e.name}</h2>
      ))}
    </>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const res = await fetch(YOUR_API_URL);
  const data = await res.json();

  return {
    props: {
      data, // will be passed to the page component as props
    },

    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 100, // In seconds
  };
}



// ====================================================
// CSR - cient side rendering
// data is fetched from browser, you will have to show loading
// NOT seo optimized
// Example: admin apps where SEO is not required
// ====================================================
// client side rendered
import { useEffect, useState } from 'react';
import { YOUR_API_URL } from '../lib/api';

export default function ClientSideRendered() {
  const [state, setState] = useState([]);

  async function getData() {
    const res = await fetch(YOUR_API_URL);
    const data = await res.json();
    setState(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {state.map((e) => (
        <h2 key={e.id}>{e.name}</h2>
      ))}
    </>
  );
}


// ====================================================
// SSR - server side rendering
// Data+Markup(html) is sent from the server
// the webpages gets rendered with all the data, you don't need to fetch from browser
// SEO optimized
// Example: Reddit, FB etc, AMAZON 
// ====================================================

// server side rendering
import { YOUR_API_URL } from '../lib/api';

export default function ServerSideRendered({ data }) {
  return (
    <>
      {data.map((e) => (
        <h2 key={e.id}>{e.name}</h2>
      ))}
    </>
  );
}

//this method gets called on serverside
export async function getServerSideProps() {
  const res = await fetch(YOUR_API_URL);
  const data = await res.json();

  return {
    props: {
      data, // will be passed to the page component as props
    },
  };
}

