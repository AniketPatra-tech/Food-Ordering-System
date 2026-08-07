import {
  Utensils,
  Soup,
  Pizza,
  Coffee,
  Cake,
  Sandwich,
  Drumstick,
  IceCreamBowl
} from "lucide-react";


const categories = [

{
name:"Bengali Special",
icon:Soup,
items:"Traditional Meals",
color:"from-yellow-500 to-orange-500"
},

{
name:"Biriyani",
icon:Drumstick,
items:"Aromatic Rice Meals",
color:"from-red-500 to-orange-500"
},

{
name:"Pizza",
icon:Pizza,
items:"Cheesy Delights",
color:"from-orange-500 to-red-500"
},

{
name:"Chinese",
icon:Utensils,
items:"Noodles & More",
color:"from-green-500 to-emerald-500"
},

{
name:"Burger",
icon:Sandwich,
items:"Loaded Burgers",
color:"from-purple-500 to-pink-500"
},

{
name:"Desserts",
icon:Cake,
items:"Sweet Cravings",
color:"from-pink-500 to-rose-500"
},

{
name:"Ice Cream",
icon:IceCreamBowl,
items:"Cold Treats",
color:"from-blue-500 to-cyan-500"
},

{
name:"Drinks",
icon:Coffee,
items:"Refreshing Drinks",
color:"from-indigo-500 to-purple-500"
}

];



function Categories(){

return(

<section className="
mx-auto
max-w-7xl
px-6
mt-16
">


<div className="mb-8">


<h2 className="
flex
items-center
gap-2

text-3xl
font-bold
text-white
md:text-4xl
">

🍴 Explore Our Menu

</h2>


<p className="
mt-2
text-gray-400
">

Discover your favourite dishes from Zestora

</p>


</div>




<div className="
grid
grid-cols-4
gap-6
">


{
categories.map((item,index)=>{


const Icon=item.icon;


return(

<div

key={index}

className="
group
relative

overflow-hidden

rounded-3xl

border

border-white/10

bg-white/5

p-6

backdrop-blur-md

transition

duration-300

hover:-translate-y-2

hover:shadow-2xl
"

>


<div className={`
absolute
inset-0

bg-gradient-to-br

${item.color}

opacity-0

transition

duration-300

group-hover:opacity-20

`}>
</div>




<div className={`
relative

flex

h-16

w-16

items-center

justify-center

rounded-2xl

bg-gradient-to-br

${item.color}

text-white

shadow-lg

`}>

<Icon size={32}/>

</div>




<h3 className="
relative

mt-5

text-xl

font-bold

text-white
">

{item.name}

</h3>



<p className="
relative

mt-2

text-sm

text-gray-400
">

{item.items}

</p>



<button className="
relative

mt-5

text-sm

font-semibold

text-orange-400

opacity-0

transition

group-hover:opacity-100
">

View Menu →

</button>



</div>


)

})

}


</div>


</section>

)

}


export default Categories;