import React, { useState } from "react";
import { assets, facilityIcons, roomsDummyData } from "../src/assets/assets";
import { useNavigate } from "react-router-dom";
import StarRating from "../Component/StarRating";

//  Checkbox component
const CheckBox = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
    <input
      type="checkbox"
      checked={selected}
      onChange={(e) => onChange(e.target.checked, label)}
    />
    <span className="font-light select-none">{label}</span>
  </label>
);

//  RadioButton component
const RadioButton = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
    <input
      type="radio"
      checked={selected}
      onChange={(e) => onChange(e.target.checked, label)}
    />
    <span className="font-light select-none">{label}</span>
  </label>
);

const AllRooms = () => {
  const navigate = useNavigate();
  const [openFilters, setOpenFilters] = useState(false);

  //  Filter & Sort states
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");

  const roomTypes = ["Single Bed", "Double Bed", "Luxury Bed", "Family Suite"];
  const priceRanges = ["0 to 500", "500 to 1000", "1000 to 2000", "2000 to 3000"];
  const sortOptions = ["Price Low to High", "Price High to Low", "Newest First"];

  //  Handle room type filter
  const handleRoomTypeChange = (checked, label) => {
    if (checked) setSelectedRoomTypes((prev) => [...prev, label]);
    else setSelectedRoomTypes((prev) => prev.filter((item) => item !== label));
  };

  //  Handle price range filter
  const handlePriceRangeChange = (checked, label) => {
    if (checked) setSelectedPriceRange((prev) => [...prev, label]);
    else setSelectedPriceRange((prev) => prev.filter((item) => item !== label));
  };

  //  Handle sort change
  const handleSortChange = (_, label) => setSelectedSort(label);

  //  Clear filters
  const clearFilters = () => {
    setSelectedRoomTypes([]);
    setSelectedPriceRange([]);
    setSelectedSort("");
  };

  //  Filter logic
  const filteredRooms = roomsDummyData
    .filter((room) => {
      // Filter by room type
      if (selectedRoomTypes.length > 0 && !selectedRoomTypes.includes(room.roomType))
        return false;

      // Filter by price
      if (selectedPriceRange.length > 0) {
        const priceMatch = selectedPriceRange.some((range) => {
          const [min, max] = range.replace("$", "").split("to").map((v) => parseInt(v.trim()));
          return room.pricePerNight >= min && room.pricePerNight <= max;
        });
        if (!priceMatch) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (selectedSort === "Price Low to High") return a.pricePerNight - b.pricePerNight;
      if (selectedSort === "Price High to Low") return b.pricePerNight - a.pricePerNight;
      return 0;
    });

  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-24 md:pt-32 md:px-16 lg:px-24">
      {/* Left Side - Rooms */}
      <div className="flex-1">
        <div className="flex flex-col items-start text-left mb-6">
          <h1 className="font-playfair text-4xl md:text-[40px]">Hotel Rooms</h1>
          <p className="text-sm md:text-base text-gray-600 mt-2 max-w-[600px]">
            Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
          </p>
        </div>

        {/* Show filtered results */}
        {filteredRooms.length === 0 && (
          <p className="text-gray-500 italic py-10">No rooms match your filters.</p>
        )}

        {filteredRooms.map((room) => (
          <div
            key={room._id}
            className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-16"
          >
            <img
              onClick={() => {
                navigate(`/rooms/${room._id}`);
                window.scrollTo(0, 0);
              }}
              src={room.images[0]}
              alt="hotel"
              title="View Room Details"
              className="max-h-64 md:w-80 rounded-xl shadow-lg object-cover cursor-pointer"
            />
            <div className="flex flex-col gap-2 md:w-1/2">
              <p className="text-gray-500">{room.hotel.city}</p>
              <p
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  window.scrollTo(0, 0);
                }}
                className="text-gray-800 text-3xl font-playfair cursor-pointer"
              >
                {room.hotel.name}
              </p>

              <div className="flex items-center">
                <StarRating />
                <p className="ml-2 text-sm text-gray-600">200+ reviews</p>
              </div>

              <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                <img src={assets.locationIcon} alt="location" />
                <span>{room.hotel.address}</span>
              </div>

              <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                {room.amenities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70"
                  >
                    <img className="h-5 w-5" src={facilityIcons[item]} alt={item} />
                    <p className="text-xs">{item}</p>
                  </div>
                ))}
              </div>

              <p className="text-xl font-medium text-gray-700">
                ${room.pricePerNight}/night
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Side - Filters */}
      <div className="bg-white w-80 border border-gray-300 text-gray-600 mb-10 lg:mb-16 lg:ml-8 rounded-xl overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-300">
          <p className="text-base font-medium text-gray-800">FILTERS</p>
          <div className="text-xs cursor-pointer">
            <span
              onClick={() => setOpenFilters(!openFilters)}
              className="lg:hidden"
            >
              {openFilters ? "HIDE" : "SHOW"}
            </span>
            <span onClick={clearFilters} className="hidden lg:block hover:underline">
              CLEAR
            </span>
          </div>
        </div>

        <div
          className={`transition-all duration-700 ${
            openFilters ? "h-auto" : "h-0 lg:h-auto"
          } overflow-hidden`}
        >
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Popular Filter</p>
            {roomTypes.map((room, index) => (
              <CheckBox
                key={index}
                label={room}
                selected={selectedRoomTypes.includes(room)}
                onChange={handleRoomTypeChange}
              />
            ))}
          </div>

          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Price Range</p>
            {priceRanges.map((range, index) => (
              <CheckBox
                key={index}
                label={`$ ${range}`}
                selected={selectedPriceRange.includes(`$ ${range}`)}
                onChange={handlePriceRangeChange}
              />
            ))}
          </div>

          <div className="px-5 pt-5 pb-7">
            <p className="font-medium text-gray-800 pb-2">Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton
                key={index}
                label={option}
                selected={selectedSort === option}
                onChange={handleSortChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
