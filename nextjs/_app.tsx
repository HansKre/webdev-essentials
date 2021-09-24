import '../styles/globals.css';
import '../styles/xglb-theme.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;

// get layout example
// https://stackblitz.com/github/vercel/next.js/tree/canary/examples/layout-component?file=pages%2F_app.js
