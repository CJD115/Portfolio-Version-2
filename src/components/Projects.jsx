import { CodeIcon } from "@heroicons/react/solid";
import { projects } from "../data";

export default function Projects() {
    return (
        <section id="projects" className="text-gray-400 bg-gray-900 body-font">
            <div className="container px-5 py-10 mx-auto text-center lg:px-40">
                <div className="flex flex-col w-full mb-20">
                    <CodeIcon className="mx-auto inline-block w-10 mb-4" />
                    <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4 text-white">
                        Apps I&apos;ve Built
                    </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                        I am constantly expanding my portfolio with new personal and professional projects that showcase a diverse range of skills in both frontend and backend development.
                        These projects highlight my proficiency in various programming languages and technologies.
                    </p>
                </div>
                <div className="flex flex-wrap -m-4">
                    {projects.map((project) => (
                        <a
                            href={project.link}
                            key={project.image}
                            className="sm:w-1/2 w-full p-4"
                            itemScope
                            itemType="https://schema.org/CreativeWork"
                        >
                            <div className="flex relative h-64">
                                <img
                                    alt="gallery of projects"
                                    className="absolute inset-0 w-full h-full object-cover object-center"
                                    src={project.image}
                                    itemProp="image"
                                />
                                <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-800 bg-gray-900 opacity-0 hover:opacity-100">
                                    <h2 className="tracking-widest text-sm title-font font-medium text-green-400 mb-1" itemProp="genre">
                                        {project.subtitle}
                                    </h2>
                                    <h1 className="title-font text-lg font-medium text-white mb-3" itemProp="name">
                                        {project.title}
                                    </h1>
                                    <p className="leading-relaxed" itemProp="description">{project.description}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}