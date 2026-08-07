function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 md:px-6">
      <div className="grid items-center gap-10 md:grid-cols-2">

        {/* Left Content */}
        <div>
          <span className="inline-block rounded-full border border-[#FF6B35]/30 bg-[#FF6B35]/10 px-4 py-2 text-sm text-[#FF6B35]">
            🔥 30% OFF On First Order
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight md:text-7xl">
            Delicious Food
            <span className="block text-[#FF6B35]">
              Delivered Fast
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg text-gray-400">
            Fresh ingredients, expert chefs, and lightning-fast
            delivery right to your doorstep.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-xl bg-[#FF6B35] px-8 py-4 font-semibold text-white transition hover:scale-105">
              Order Now
            </button>

            <button className="rounded-xl border border-white/10 px-8 py-4 font-semibold text-white transition hover:bg-white/5">
              View Menu
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative flex justify-center">

          {/* Glow Effect */}
          <div className="absolute h-72 w-72 rounded-full bg-[#FF6B35]/30 blur-3xl md:h-96 md:w-96"></div>

          {/* Food Image */}
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
            alt="Burger"
            className="relative z-10 h-[420px] w-auto rounded-3xl object-cover shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;