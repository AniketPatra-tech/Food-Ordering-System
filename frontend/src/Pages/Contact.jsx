// Contact.jsx

import Navbar from "../components/Navbar/Navbar";

function Contact() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* COMPACT HERO */}
        <section
          className="
          rounded-3xl
          border
          border-white/10
          bg-[#151515]
          p-8
          text-center
          "
        >
          <span
            className="
            rounded-full
            bg-[#D4AF37]/10
            px-4
            py-2
            text-sm
            font-medium
            text-[#D4AF37]
            "
          >
            Contact Zestora
          </span>

          <h1
            className="
            mt-4
            text-3xl
            font-bold
            text-white
            md:text-4xl
            "
          >
            We'd Love To Hear From You
          </h1>

          <p
            className="
            mx-auto
            mt-3
            max-w-2xl
            text-gray-400
            "
          >
            Questions, reservations, catering requests or feedback —
            our team is always ready to help.
          </p>
        </section>

        {/* CONTACT INFO */}
        <section
          className="
          mt-8
          grid
          gap-6
          md:grid-cols-3
          "
        >
          <div
            className="
            rounded-3xl
            border
            border-white/10
            bg-[#151515]
            p-6
            "
          >
            <h3 className="text-lg font-bold text-white">
              📞 Call Us
            </h3>

            <p className="mt-3 text-gray-400">
              +91 98765 43210
            </p>

            <p className="text-gray-500">
              10:00 AM – 11:00 PM
            </p>
          </div>

          <div
            className="
            rounded-3xl
            border
            border-white/10
            bg-[#151515]
            p-6
            "
          >
            <h3 className="text-lg font-bold text-white">
              📧 Email
            </h3>

            <p className="mt-3 text-gray-400">
              hello@zestora.com
            </p>

            <p className="text-gray-500">
              support@zestora.com
            </p>
          </div>

          <div
            className="
            rounded-3xl
            border
            border-white/10
            bg-[#151515]
            p-6
            "
          >
            <h3 className="text-lg font-bold text-white">
              📍 Location
            </h3>

            <p className="mt-3 text-gray-400">
              Park Street
            </p>

            <p className="text-gray-500">
              Kolkata, West Bengal
            </p>
          </div>
        </section>

        {/* FORM + HOURS */}
        <section
          className="
          mt-8
          grid
          gap-6
          lg:grid-cols-2
          "
        >
          {/* FORM */}
          <div
            className="
            rounded-3xl
            border
            border-white/10
            bg-[#151515]
            p-6
            "
          >
            <h2
              className="
              text-2xl
              font-bold
              text-white
              "
            >
              Send A Message
            </h2>

            <div className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#0F0F0F]
                px-4
                py-3
                text-white
                outline-none
                "
              />

              <input
                type="email"
                placeholder="Email Address"
                className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#0F0F0F]
                px-4
                py-3
                text-white
                outline-none
                "
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#0F0F0F]
                px-4
                py-3
                text-white
                outline-none
                "
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#0F0F0F]
                px-4
                py-3
                text-white
                outline-none
                "
              />

              <button
                className="
                w-full
                rounded-xl
                bg-gradient-to-r
                from-[#D4AF37]
                to-[#FFB800]
                py-3
                font-semibold
                text-black
                "
              >
                Send Message
              </button>
            </div>
          </div>

          {/* HOURS */}
          <div
            className="
            rounded-3xl
            border
            border-white/10
            bg-[#151515]
            p-6
            "
          >
            <h2
              className="
              text-2xl
              font-bold
              text-white
              "
            >
              Opening Hours
            </h2>

            <div className="mt-6 space-y-4 text-gray-300">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span>10 AM - 11 PM</span>
              </div>

              <div className="flex justify-between">
                <span>Saturday</span>
                <span>9 AM - 12 AM</span>
              </div>

              <div className="flex justify-between">
                <span>Sunday</span>
                <span>9 AM - 12 AM</span>
              </div>
            </div>

            <div
              className="
              mt-8
              flex
              h-64
              items-center
              justify-center
              rounded-2xl
              bg-[#0F0F0F]
              text-gray-500
              "
            >
              Google Map Here
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

export default Contact;