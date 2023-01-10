// ========================================
// Layout component
// adding navbar, footer common components in all pages
// ========================================
import Footer from "./Footer"
import Navbar from "./Navbar"

const Layout = ({ children }) => {
  return (
    <div className="content">
      <Navbar />
      { children }
      <Footer />
    </div>
  );
}
 
export default Layout;


// ========================================
// Wrapping with layout component..
// ========================================
import Layout from '../comps/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    //layout -> has nav , footer component
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
