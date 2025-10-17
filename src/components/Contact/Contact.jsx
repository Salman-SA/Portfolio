import React from 'react'
import './Contact.css'
import contactme from '../../assets/contactme.svg'
import gps from '../../assets/gps.png'
import email from '../../assets/email.png'
import telephone from '../../assets/telephone.png'

const Contact = () => {

    const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "88da21d4-6b7b-441b-9c48-16d2a8fc265b");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      alert(res.message);
      event.target.reset();
    }
  };

    return (
        <div id='contact' className="contact">
            <div className="contact-title">
                <img src={contactme} alt="Contact Me" />
            </div>

            <div className="contact-section">
                <div className="contact-left">
                    <h1>Let's Talk</h1>
                    <p>
                        I’m currently available and actively seeking new opportunities. <br />
                        Feel free to reach out to discuss potential collaborations or positions.
                    </p>

                    <div className="contact-detail">
                        <img src={email} alt="Email icon" />
                        <p>Salmanalyahyaa@gmail.com</p>
                    </div>

                    <div className="contact-detail">
                        <img src={telephone} alt="Phone icon" />
                        <p>+966 53 829 1205</p>
                    </div>

                    <div className="contact-detail">
                        <img src={gps} alt="Location icon" />
                        <p>Riyadh, Saudi Arabia</p>
                    </div>
                </div>
                <form onSubmit={onSubmit} className="contact-right">
                    <label htmlFor="name">Your Name</label>
                    <input type="text" id="name" name="name" placeholder="Enter your name" required />

                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" required />

                    <label htmlFor="message">Your Message</label>
                    <textarea id="message" name="message" placeholder="Write your message..." rows="5" required></textarea>

                    <button type="submit" className="contact-submit">Submit Message</button>
                </form>
            </div>
        </div>
    )
}

export default Contact
