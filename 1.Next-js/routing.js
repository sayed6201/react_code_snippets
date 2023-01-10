// ===============================================
// Next generates auto routes
// ===============================================
    // ○ Example: localhost:300/ -> loads root/pages/index.js component
    // ○ Domain/ninjas/ -> loads root/pages/ninjas/index.js
    // ○ Domain/ninjas/page.js -> loads root/pages/ninjas/page.js component

// ===============================================
// Navbar links to different pages
// ===============================================
    const Navbar = () => {
      return (
        <nav>
          <div className="logo">
            <Image src="/logo.png" alt="site logo" width={128} height={77} />
          </div>
          <Link href="/"><a>Home</a></Link>
          <Link href="/about"><a>About</a></Link>
          <Link href="/ninjas/"><a>Ninja Listing</a></Link>
        </nav>
      );
    }
     
    export default Navbar;

    
// ===============================================
// Redirecting users
// ===============================================
import { useRouter } from 'next/router'

const NotFound = () => {

    //using route redirect users
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      // router.go(-1)
      // router.go(1)
      router.push('/')
    }, 3000)
  }, [])
//   ...
}