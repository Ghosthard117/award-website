import Hero from "@/components/Hero"
import About from "@/components/About"
import Features from "@/components/Features"
import Navbar from "@/components/Navbar"
import Story from "@/components/Story"

const Home = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
    </main>
  )
}

export default Home