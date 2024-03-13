import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { data } from 'autoprefixer';
import Card from '../../components/Card';
import { FaAngleRight, FaAngleLeft  } from "react-icons/fa6";


const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      NEXT
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    >
      BACK
    </div>
  );
};



const SpacialDish = () => {
    const [recipes, setRecipes] = useState([]);
    const slider = React.useRef(null);
  
    useEffect(() => {
      fetch("menu.json")
        .then((res) => res.json())
        .then((data) => {
          const specials = data.filter((item) => item.category === "popular");
           console.log(specials)
          setRecipes(specials);
        });
    }, []);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ],


       nextArrow: <SampleNextArrow />,
       prevArrow: <SamplePrevArrow />,
      };

     

  return (
    <div className='section-container my-15'>
         <div className='text-left px-10'>
            <p className='text-red uppercase tracking-wide font-semibold text-lg'>Spacial Dishes</p>
            <h2 className='text-4xl md:text-5xl font-bold my-2 md:leading-snug leading-snug md:w-[520px]'>Standout Diahes From Our Menu</h2>
        </div>

        {/* arrow buton */}

        <div>
          <button onClick={()=>slider?.current?.slickPrev()} className='btn p2 rounded-full ml-5'><FaAngleLeft className='h-8 w-8 p-1'/></button>
          <button onClick={()=>slider?.current?.slickNext()} className='btn p-2 rounded-full ml-5 bg-green'><FaAngleRight className='h-8 w-8 p-1'/></button>
        </div>

      
        <Slider ref={slider} {...settings} className='mt-12 overflow-hidden  space-x-5 '>
        
        {
            recipes.map((item,i) =>(
              <Card key={i} item={item}/>
            ))
        }
        
        </Slider>

    </div>
  )
}

export default SpacialDish