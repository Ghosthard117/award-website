import Hero from "@/components/Hero"
import About from "@/components/About"
import Features from "@/components/Features"
import Navbar from "@/components/Navbar"
import Story from "@/components/Story"
import Contact from "@/components/Contact"

const Home = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
    </main>
  )
}

export default Home