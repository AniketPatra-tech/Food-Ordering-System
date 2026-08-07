import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";

// import heritageImage from "../assets/about/bengali-heritage.jpg";
// import chef1 from "../assets/about/chef-1.jpg";
// import chef2 from "../assets/about/chef-2.jpg";
// import chef3 from "../assets/about/chef-3.jpg";

function About() {
  const chefs = [
    {
      name: "Chef Soudipta Banerjee",
      role: "Executive Chef",
    //   image: chef1,
      description:
        "Specialist in authentic Bengali cuisine with years of experience preserving traditional recipes."
    },
    {
      name: "Chef Arindam Roy",
      role: "Head of Traditional Cuisine",
    //   image: chef2,
      description:
        "Passionate about Bengal's regional dishes, seafood delicacies, and heritage cooking techniques."
    },
    {
      name: "Chef Priyanka Sen",
      role: "Dessert Specialist",
    //   image: chef3,
      description:
        "Creator of signature Bengali sweets and premium dessert experiences."
    }
  ];

  const teams = [
    "Kitchen Team",
    "Service Team",
    "Delivery Team",
    "Management Team"
  ];

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* HERO */}
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
            About Zestora
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
            A Journey Through Bengal's Culinary Heritage
          </h1>

          <p
            className="
            mx-auto
            mt-4
            max-w-3xl
            text-gray-400
            "
          >
            Bringing authentic Bengali flavors, traditions,
            and hospitality to every table.
          </p>
        </section>

        {/* OUR STORY */}
        <section
          className="
          mt-10
          rounded-3xl
          border
          border-white/10
          bg-[#151515]
          p-8
          "
        >
          <h2
            className="
            text-3xl
            font-bold
            text-[#D4AF37]
            "
          >
            Our Story
          </h2>

          <p className="mt-5 leading-8 text-gray-300">
            Zestora was founded with a simple dream —
            to preserve and celebrate the authentic flavors
            of Bengal. Inspired by family traditions and
            recipes passed down through generations,
            we bring together the richness of Bengali
            cuisine and modern dining experiences.
          </p>

          <p className="mt-4 leading-8 text-gray-300">
            Every dish served at Zestora tells a story
            of heritage, festivals, rivers, villages,
            and family gatherings. Our mission is to
            make every guest feel the warmth of a
            Bengali home.
          </p>
        </section>

        {/* HERITAGE */}
        <section
          className="
          mt-10
          grid
          gap-8
          lg:grid-cols-2
          "
        >
          <div>
            <img
            //   src={heritageImage}
            //   alt="Bengali Heritage"
              className="
              h-full
              w-full
              rounded-3xl
              object-cover
              "
            />
          </div>

          <div
            className="
            rounded-3xl
            border
            border-white/10
            bg-[#151515]
            p-8
            "
          >
            <h2
              className="
              text-3xl
              font-bold
              text-[#D4AF37]
              "
            >
              Rooted In Bengali Tradition
            </h2>

            <p className="mt-5 leading-8 text-gray-300">
              Bengali cuisine is more than food —
              it is culture, celebration, and emotion.
              From Shorshe Ilish and Chingri Malai Curry
              to Mishti Doi and Rosogolla, every dish
              carries generations of culinary wisdom.
            </p>

            <p className="mt-4 leading-8 text-gray-300">
              At Zestora, we honor these traditions
              while presenting them with premium quality,
              authentic ingredients, and heartfelt hospitality.
            </p>
          </div>
        </section>

        {/* CHEFS */}
        <section className="mt-12">
          <h2
            className="
            text-center
            text-3xl
            font-bold
            text-[#D4AF37]
            "
          >
            Meet Our Chefs
          </h2>

          <div
            className="
            mt-8
            grid
            gap-6
            md:grid-cols-2
            lg:grid-cols-3
            "
          >
            {chefs.map((chef) => (
              <div
                key={chef.name}
                className="
                rounded-3xl
                border
                border-white/10
                bg-[#151515]
                p-6
                text-center
                "
              >
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="
                  mx-auto
                  h-32
                  w-32
                  rounded-full
                  object-cover
                  "
                />

                <h3 className="mt-5 text-xl font-bold text-white">
                  {chef.name}
                </h3>

                <p className="mt-2 text-[#D4AF37]">
                  {chef.role}
                </p>

                <p className="mt-4 text-sm text-gray-400">
                  {chef.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* TEAM */}
        <section className="mt-12">
          <h2
            className="
            text-center
            text-3xl
            font-bold
            text-[#D4AF37]
            "
          >
            Our Team
          </h2>

          <div
            className="
            mt-8
            grid
            gap-6
            md:grid-cols-2
            lg:grid-cols-4
            "
          >
            {teams.map((team) => (
              <div
                key={team}
                className="
                rounded-3xl
                border
                border-white/10
                bg-[#151515]
                p-6
                text-center
                "
              >
                <h3 className="text-lg font-bold text-white">
                  {team}
                </h3>

                <p className="mt-3 text-gray-400">
                  Dedicated professionals committed
                  to delivering excellence every day.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAMILY MESSAGE */}
        <section
          className="
          mt-12
          rounded-3xl
          border
          border-white/10
          bg-[#151515]
          p-8
          text-center
          "
        >
          <h2
            className="
            text-3xl
            font-bold
            text-[#D4AF37]
            "
          >
            More Than A Restaurant, We Are A Family
          </h2>

          <p
            className="
            mx-auto
            mt-5
            max-w-4xl
            leading-8
            text-gray-300
            "
          >
            At Zestora, every chef, server, delivery partner,
            and manager shares one common purpose —
            serving happiness through food. Together we
            work as one family to create memorable dining
            experiences for every guest.
          </p>
        </section>

        {/* STATS */}
        <section
          className="
          mt-12
          grid
          gap-6
          md:grid-cols-2
          lg:grid-cols-4
          "
        >
          <div className="rounded-3xl border border-white/10 bg-[#151515] p-6 text-center">
            <h3 className="text-4xl font-bold text-[#D4AF37]">100+</h3>
            <p className="mt-2 text-gray-400">Signature Dishes</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#151515] p-6 text-center">
            <h3 className="text-4xl font-bold text-[#D4AF37]">25+</h3>
            <p className="mt-2 text-gray-400">Culinary Experts</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#151515] p-6 text-center">
            <h3 className="text-4xl font-bold text-[#D4AF37]">50K+</h3>
            <p className="mt-2 text-gray-400">Happy Customers</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#151515] p-6 text-center">
            <h3 className="text-4xl font-bold text-[#D4AF37]">4.9★</h3>
            <p className="mt-2 text-gray-400">Average Rating</p>
          </div>
        </section>

        {/* CTA */}
        <section
          className="
          mt-12
          rounded-3xl
          bg-gradient-to-r
          from-[#D4AF37]
          to-[#FFB800]
          p-10
          text-center
          "
        >
          <h2 className="text-3xl font-bold text-black">
            Experience Bengal On A Plate
          </h2>

          <p className="mt-4 text-black/80">
            Discover authentic Bengali flavors crafted with passion.
          </p>

          <Link
            to="/menu"
            className="
            mt-6
            inline-block
            rounded-xl
            bg-black
            px-6
            py-3
            font-semibold
            text-white
            "
          >
            Explore Menu
          </Link>
        </section>

      </main>
    </>
  );
}

export default About;