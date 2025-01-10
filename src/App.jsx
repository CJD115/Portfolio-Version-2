import MouseLocator from "./components/MouseLocator";
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
// import Testimonials from "./components/Testimonials";

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export default function App() {
    return (
        <main className="text-gray-400 bg-gray-900 body-font relative">
            <Navbar/>
            <About/>
            <Projects/>
            <Skills/>
            {/*<Testimonials/>*/}
            <Contact/>
            {!isMobile && <MouseLocator />}
        </main>
    );
}
