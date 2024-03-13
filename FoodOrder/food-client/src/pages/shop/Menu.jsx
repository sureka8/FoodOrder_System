import { iterate } from "localforage";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import { FaFilter } from "react-icons/fa"

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteritem] = useState([]);
  const [selectcatagory, setSelectcatagory] = useState("all");
  const [shortoption, setShortoption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items to display per page

  //loadin data

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
       // const response = await fetch("menu.json");
       const response = await fetch("http://localhost:6001/menu");
        const data = await response.json();
        //console.log(data)
        setMenu(data);
        setFilteritem(data); // Initially, display all items
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //filtring data base on catagory
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);

    setFilteritem(filtered);
    setSelectcatagory(category);
    setCurrentPage(1);
  };

  //show all data
  const showAll = () => {
    setFilteritem(menu);
    setSelectcatagory("all");
    setCurrentPage(1);
  };

  //sorting based on a-z low-hight price
  const handleSortChange = (option) => {
    setShortoption(option);

    let sortedItems = [...filteredItems];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        // Do nothing for the "default" case
        break;
    }

    setFilteritem(sortedItems);
    setCurrentPage(1);
  };

  //pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  //

  return (
    <div>
      {/*menu baner */}

      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-24 flex flex-col  justify-center items-center gap-8">
          
          <div className="text-center space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug ">
              For the Loves of Delicious{" "}
              <span className="text-green">Food</span>
            </h2>
            <p className="text-[#4A4A4A] text-xl md:w-4/5 mx-auto">
              Come with family & feel the joy of mouthwatering food such as
              Greek Salad, Lasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas
              Rellenas and more for a moderate cost
            </p>
            <button className="btn bg-green px-8 py-3 font-semibold text-white rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/*menu shop section */}

      <div className="section-container mt-7">

        {/*filtring and sort */}
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 ">
          {/* all catogory button */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap ">
            <button onClick={showAll} className={selectcatagory === "all" ? "active" :""}>All</button>
            <button onClick={() =>filterItems ("salad")}className={selectcatagory === "salad" ? "active" :""} >Salad</button>  
            <button onClick={() =>filterItems ("pizza")}className={selectcatagory === "pizza" ? "active" :""}>Pizza</button>
            <button onClick={() =>filterItems ("soup")}className={selectcatagory === "soup" ? "active" :""}>Soups</button>
            <button onClick={() =>filterItems ("dessert")}className={selectcatagory === "dessert" ? "active" :""}>Desserts</button>
            <button onClick={() =>filterItems ("drinks")}className={selectcatagory === "drinks" ? "active" :""}>Drink</button>
          </div>
        </div>

        {/*shorting base filter */}
        <div className="flex justify-end mb- rounded-sm " >
          <div className="bg-black py-2">
           <FaFilter className="h-4 w-4 text-white  "/>
          </div>
          {/*sorting options */}
          <select name="sort" id="sort" onChange={(e) =>handleSortChange(e.target.value)} value={shortoption} 
          className="bg-black text-white px-2 py-1 rounded-sm">
            <option value="default">Default</option>
            <option value="A-Z">A-z</option>
            <option value="Z-A">Z-A</option>
            <option value="low-to-high">Low to Hight</option>
            <option value="high-to-low">Hight to Low</option>
            
          </select>
        </div>

        {/*product card */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4  mt-5">
          {currentItems.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      </div>


      {/* pagination */}
      <div className="flex justify-center my-8">
        {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
