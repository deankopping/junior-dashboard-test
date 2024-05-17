import { useState } from "react";

const cats = [
  {
    id: 1,
    name: "Sneakers",
  },
  {
    id: 2,
    name: "T-shirts",
  },
  {
    id: 3,
    name: "Figurines",
  },
  {
    id: 4,
    name: "Art",
  },
];

const CardFive = () => {
  const [category, setCategory] = useState(cats[0]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <button
        id="dropdownHoverButton"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
        className="bg-gray text-black text-absolute focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        Categories
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
        {isDropdownOpen && (
          <div
            id="dropdownHover"
            className="absolute z-10 mt-2 bg-gray divide-y divide-gray-100 rounded-lg shadow w-44"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <ul
              className="py-2 text-sm text-black"
              aria-labelledby="dropdownHoverButton"
            >
              <li>
                {cats.map((category, key) => (
                  <option
                    key={key}
                    value={category.name}
                    className="block px-4 py-2 hover:bg-white text-black"
                  >
                    {category.name}
                  </option>
                ))}
              </li>
            </ul>
          </div>
        )}
      </button>
    </div>
  );
};

export default CardFive;
