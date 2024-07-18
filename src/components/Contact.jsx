import React from "react";
import PropTypes from "prop-types";

function ContactForm({ onChange }) {
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Optional: You can handle form data submission to an API here if needed
        console.log("Form Data:", data);

        // For demonstration, you can uncomment the following line to submit the form to Netlify
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(data).toString(),
        })
        .then(() => alert("Message sent!"))
        .catch((error) => alert(error));
    };

    return (
        <div className="w-1/2 p-4">
            <form name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit}>
                <input type="hidden" name="form-name" value="contact" />
                <p className="text-2xl mb-4">Feedback & Queries</p>
                <div>
                    <label className="text-sm">Name*</label>
                    <br />
                    <input
                        name="name"
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:border-blue-500 w-full p-2.5 mb-4"
                        placeholder="Your Name"
                        onChange={onChange}
                        required
                    />
                    <label className="text-sm">Email Address*</label>
                    <br />
                    <input
                        name="email"
                        type="email"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:border-blue-500 w-full p-2.5 mb-4"
                        placeholder="abc@gmail.com"
                        onChange={onChange}
                        required
                    />
                    <label className="text-sm">Drop Your Query</label>
                    <br />
                    <textarea
                        name="message"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:border-blue-500 w-full p-2.5 mb-4"
                        rows="4"
                        maxLength="300"
                        placeholder="Max Allowed Characters: 300"
                        onChange={onChange}
                        required
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

ContactForm.propTypes = {
    onChange: PropTypes.func.isRequired,
};

// ContactDetails component remains unchanged

export default function Contact() {
    const handleChange = (e) => {
        // Handle input changes if needed
    };

    return (
        <section id="contact" className="relative">
            <div className="container px-5 py-10 mx-auto flex flex-wrap">
                {/* ContactDetails component */}
                <div className="w-1/2 bg-gray-900 rounded-lg overflow-hidden p-10 flex items-end justify-start relative">
                    {/* Google Maps iframe */}
                    <iframe
                        width="100%"
                        height="100%"
                        title="map"
                        className="absolute inset-0"
                        frameBorder={0}
                        marginHeight={0}
                        marginWidth={0}
                        style={{ filter: "opacity(0.7)" }}
                        src="https://www.google.com/maps/embed/v1/place?q=southampton&key=YOUR_GOOGLE_MAPS_API_KEY_HERE"
                    />
                    {/* Contact information */}
                    <div className="bg-gray-900 relative flex flex-wrap py-6 rounded shadow-md w-2/3">
                        <div className="px-6">
                            <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                                ADDRESS
                            </h2>
                            <p className="mt-1 text-white">
                                Southampton, <br />
                                SO19 2AB
                            </p>
                        </div>
                        <div className="px-6 mt-4">
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
                            <p className="leading-relaxed text-white">07931159357</p>
                        </div>
                    </div>
                </div>
                {/* ContactForm component */}
                <ContactForm onChange={handleChange} />
            </div>
        </section>
    );
}
