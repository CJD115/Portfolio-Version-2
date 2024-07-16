import React, { useState } from "react";
import PropTypes from "prop-types";

function encode(data) {
    return Object.keys(data)
        .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
}

function handleSubmit(e, { name, email, message }) {
    e.preventDefault();
    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", name, email, message }),
    })
        .then(() => alert("Message sent!"))
        .catch((error) => alert(error));
}

function ContactForm({ onChange }) {
    return (
        <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0"
            onSubmit={(e) => handleSubmit(e, { name, email, message })}
        >
            <input type="hidden" name="form-name" value="contact" />
            <h2 className="text-white sm:text-4xl text-3xl mb-1 font-medium title-font">
                Work with me!
            </h2>
            <p className="leading-relaxed mb-5">
                Have an exciting project you need help with?<br />
                Send me an email or contact me via instant message!
            </p>
            <div className="relative mb-4">
                <label htmlFor="name" className="leading-7 text-sm text-gray-400">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={onChange}
                />
            </div>
            <div className="relative mb-4">
                <label htmlFor="email" className="leading-7 text-sm text-gray-400">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Johndoe@gmail.com"
                    className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={onChange}
                />
            </div>
            <div className="relative mb-4">
                <label htmlFor="message" className="leading-7 text-sm text-gray-400">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    onChange={onChange}
                />
            </div>
            <button
                type="submit"
                className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
                Submit
            </button>
        </form>
    );
}

ContactForm.propTypes = {
    onChange: PropTypes.func.isRequired,
};

function ContactDetails() {
    return (
        <div className="lg:w-2/3 md:w-1/2 bg-gray-900 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <iframe
                width="100%"
                height="100%"
                title="map"
                className="absolute inset-0"
                frameBorder={0}
                marginHeight={0}
                marginWidth={0}
                style={{ filter: "opacity(0.7)" }}
                src="https://www.google.com/maps/embed/v1/place?q=southampton&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
            />
            <div className="bg-gray-900 relative flex flex-wrap py-6 rounded shadow-md w-2/3">
                <div className="lg:w-1/2 px-6">
                    <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                        ADDRESS
                    </h2>
                    <p className="mt-1">
                        Southampton, <br />
                        SO19 2AB
                    </p>
                </div>
                <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                    <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                        EMAIL
                    </h2>
                    <p className="text-indigo-400 leading-relaxed">
                        <a
                            href="mailto:connordavis115@email.com"
                            className="break-all text-indigo-400"
                        >
                            connordavis115@email.com
                        </a>
                    </p>
                    <h2 className="title-font font-semibold text-white tracking-widest text-xs mt-4">
                        PHONE
                    </h2>
                    <p className="leading-relaxed">07931159357</p>
                </div>
            </div>
        </div>
    );
}

export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") setName(value);
        if (name === "email") setEmail(value);
        if (name === "message") setMessage(value);
    };

    return (
        <section id="contact" className="relative">
            <div className="container px-5 py-10 mx-auto flex sm:flex-nowrap flex-wrap">
                <ContactDetails />
                <ContactForm onChange={handleChange} />
            </div>
        </section>
    );
}
