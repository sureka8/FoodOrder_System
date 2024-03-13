import React from 'react'
const serviceLists = [
    {id:1, title: "Catering", des: "Delight your guests with our flavors and  presentation", img: "/public/food-service.png"},
    {id:2, title: "Fast delivery", des: "We deliver your order promptly to your door", img: "/public/fast-delivery.png"},
    {id:3, title: "Online Ordering", des: "Explore menu & order with ease using our Online Ordering n", img: "/public/bag.png"},
    {id:4, title: "Gift Cards", des: "Give the gift of exceptional dining with Foodi Gift Cards", img: "/public/gift-card.png"},
]


const Services = () => {
  return (
    <div className="section-container my-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Our Story & Services</p>
            <h2 className="title">Our Culinary Journey And Services</h2>
            <p className="my-5 text-black leading-[30px]">
              Rooted in passion, we curate unforgettable dining experiences and
              offer exceptional services, blending culinary artistry with warm
              hospitality.
            </p>

            <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
              Explore
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
                {
                    serviceLists.map((service) => (
                        <div key={service.id} className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-green cursor-pointer hover:border hover:border-green transition-all duration-200">
                            <img src={service.img} alt=" " className=" mx-auto bg-contain w-20 h-20"/>
                            <h5 className="pt-3 font-semibold"> {service.title}</h5>
                            <p className="text-[#90BD95]">{service.des}</p>
                        </div>
                    ))
                }
            </div>
        </div>
      </div>
    </div>
  )
}

export default Services