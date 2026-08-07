import sunilBanner from "../../assets/SunilChhetriBanner4.png";

function PromotionBanner() {
  return (
    <section className="mx-auto max-w-7xl px-0 pt-8">
      <div
        className="
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-[#151515]
        shadow-xl
        aspect-[19/7]
        "
      >
        <img
          src={sunilBanner}
          alt="Zestora Premium Banner"
          className="
          h-full
          w-full
          object-cover
          object-center
          "
        />
      </div>
    </section>
  );
}

export default PromotionBanner;