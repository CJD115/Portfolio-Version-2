import React, { useState } from 'react';
import PropTypes from "prop-types";

function ContactForm({ onChange = () => {} }) {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('');

    // Function to validate form data
    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!formData.message) newErrors.message = 'Message is required';
        return newErrors;
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Send form data to the server
        fetch("/.netlify/functions/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'Email sent successfully') {
                    setStatus('Message sent!');
                } else {
                    setStatus(`Error: ${data.message}`);
                }
            })
            .catch((error) => setStatus(`Error: ${error.message}`));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
        onChange(e);
    };

    return (
        <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0"
            onSubmit={handleSubmit}
        >
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" />
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
                    onChange={handleChange}
                    required
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
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
                    onChange={handleChange}
                    required
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="relative mb-4">
                <label htmlFor="message" className="leading-7 text-sm text-gray-400">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    onChange={handleChange}
                    required
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>
            <button
                type="submit"
                className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
                Submit
            </button>
            {status && <p className="text-green-500 text-xs mt-1">{status}</p>}
        </form>
    );
}

ContactForm.propTypes = {
    onChange: PropTypes.func,
};

export default ContactForm;