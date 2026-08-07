function FoodTypeBadge({ type }) {

  const isVeg = type === "veg";

  const color = isVeg
    ? "#16a34a"
    : "#dc2626";


  return (

    <div
      className="
        flex
        h-6
        w-6
        items-center
        justify-center

        rounded-[3px]

        border-2
      "
      style={{
        borderColor: color
      }}
    >

      <div
        className="
          h-3.5
          w-3.5
          rounded-full
        "
        style={{
          backgroundColor: color
        }}
      />

    </div>

  );

}


export default FoodTypeBadge;