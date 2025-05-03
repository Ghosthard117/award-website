import Hero from "@/components/Hero"
import About from "@/components/About"
import Features from "@/components/Features"

const Home = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Hero />
      <About />
      <Features />
    </main>
  )
}

export default Home