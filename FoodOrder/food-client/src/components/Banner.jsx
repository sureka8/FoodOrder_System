import React from "react";

const Banner = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="py-24 flex flex-col md:flex-row justify-between items-center gap-8">
        {/*text */}
        <div className="md:w-1/2 space-y-7 px-4 mb-48">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug ">
            Fast <br />
            <span className="text-green">Delivery</span> & <br /> Easy{" "}
            <span className="text-green">Pickup</span>
          </h2>
          <p className="text-xl text-[#4A4A4A]">
            Enjoy a Healthy Life by Eating Helthy Foods that have Extraordinary
            Flavors that Make your Life Healthier for Today and in the Future.{" "}
          </p>
          <button className="btn bg-green px-8 py-3 font-semibold text-white rounded-full">
            Order Now
          </button>
        </div>

        {/*image */}
        {
        <div className="md:w-1/2 ">
          
          <img src="/public/3b49a518-features-thumb-1_10ep0jl000000000000028.png" alt="" className="ml-32" />
          <div className="flex flex-col md:flex-row items-center justify-around -mt-14 ">
            <div className="flex bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-md w-64">
              <img src="/public/b-food1.png" alt="" className="rounded-2xl" />
              <div className="space-y-1">
                <h5 className="font-medium mb-1">Spicy noodles</h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-4"
                    className="mask mask-star-2 bg-green"
                  />
                  <input
                    type="radio"
                    name="rating-4"
                    className="mask mask-star-2 bg-green"
                    checked
                  />
                  <input
                    type="radio"
                    name="rating-4"
                    className="mask mask-star-2 bg-green"
                  />
                  <input
                    type="radio"
                    name="rating-4"
                    className="mask mask-star-2 bg-green"
                  />
                  <input
                    type="radio"
                    name="rating-4"
                    className="mask mask-star-2 bg-green"
                  />
                </div>
                <p className="text-red ">Rs100.00</p>
              </div>
            </div>
          </div>
        </div>

         }

         {/*

         <div >
         <div className="carousel carousel-center max-w-2xl p-4 space-x-4 bg-white rounded-box ... ring-2 ring-green ring-inset">
  <div className="carousel-item">
    <img src="https://img.freepik.com/free-vector/delicious-american-food-poster-template_23-2148995192.jpg?w=740&t=st=1704220405~exp=1704221005~hmac=2e2e725242e372397452d7239f805dfa0ee0c6ebeb637f680db0304ffabdc004" className="rounded-box w-96 h-96" />
  </div> 
  <div className="carousel-item">
    <img src="/public/6051150.jpg" alt="" className="rounded-box w-96 h-96" />
  </div> 
  <div className="carousel-item">
    <img src="/public/Food-Social-Media-Banner-15.jpg" className="rounded-box w-96 h-96" />
  </div> 
  <div className="carousel-item">
    <img src="/public/260.jpg" className="rounded-box w-96 h-96" />
  </div> 
  <div className="carousel-item">
    <img src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" className="rounded-box" />
  </div> 
  <div className="carousel-item">
    <img src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" className="rounded-box" />
  </div> 
  <div className="carousel-item">
    <img src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" className="rounded-box" />
  </div>
</div>
         </div>
        */}


      </div>
      
    </div>
  );
};

export default Banner;
