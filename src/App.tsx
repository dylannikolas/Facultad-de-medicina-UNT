import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Nosotros from './components/sections/Nosotros'
import PlanEstudios from './components/sections/PlanEstudios'
import PlanaDocente from './components/sections/PlanaDocente'
import Noticias from './components/sections/Noticias'
import Convenios from './components/sections/Convenios'
import Historia from './components/sections/Historia'

export default function App() {
  return (
    <>
      <div className="banda-oro" />
      <Header />
      <main>
        <Hero />
        <Nosotros />
        <PlanEstudios />
        <PlanaDocente />
        <Noticias />
        <Convenios />
        <Historia />
      </main>
      <Footer />
    </>
  )
}
