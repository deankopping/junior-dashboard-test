import { SetStateAction, useState } from "react";

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

const products = [
  {
    id: 1,
    name: "Nike air force ones",
    salesRevenue: 5000,
    cost: 100,
    categoryId: 1,
  },
  {
    id: 2,
    name: "I love shirts print",
    salesRevenue: 18982,
    cost: 100,
    categoryId: 2,
  },
  {
    id: 3,
    name: "Adidas shoes",
    salesRevenue: 123,
    cost: 100,
    categoryId: 1,
  },
  {
    id: 4,
    name: "Batman funko-pop",
    salesRevenue: 199,
    cost: 100,
    categoryId: 3,
  },
  {
    id: 5,
    name: "Mona Lisa",
    salesRevenue: 1428,
    cost: 100,
    categoryId: 4,
  },
  {
    id: 6,
    name: "Plain white T",
    salesRevenue: 82,
    cost: 100,
    categoryId: 2,
  },
  {
    id: 7,
    name: "Plain green T",
    salesRevenue: 901,
    cost: 100,
    categoryId: 2,
  },
];
let relevantProducts = products;
const CardFive = () => {
  const [selectedCategory, setSelectedCategory] = useState(relevantProducts);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  let currentCategoryID = 0;
  let currentCategoryName = "Categories";

  function handleCategorySelect({ id }: { id: number }) {
    currentCategoryID = id;
    currentCategoryName = cats[id - 1].name;

    setSelectedCategory(
      products.filter((product) => product.categoryId === currentCategoryID)
    );
    setDropdownOpen(false);
  }

  function TableRow({
    id,
    name,
    revenue,
    cost,
  }: {
    id: number;
    name: string;
    revenue: number;
    cost: number;
  }) {
    return (
      <div className="sm-text-xs grid grid-cols-4 border-b border-stroke dark:border-strokedark">
        <div className="flex items-center justify-center p-2.5 xl:p-5">
          <p className="sm-text-xs text-black dark:text-white ">{id}</p>
        </div>

        <div className="flex items-center justify-center p-2.5 xl:p-5">
          <p className="sm-text-xs text-black dark:text-white">{name}</p>
        </div>

        <div className="flex items-center justify-center p-2.5 xl:p-5">
          <p className="sm-text-xs text-black dark:text-white">{revenue}</p>
        </div>

        <div className="flex items-center justify-center p-2.5 xl:p-5">
          <p className="sm-text-xs text-black dark:text-white">{cost}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      {/**drop down menu */}

      {/**table */}

      <span className="flex items-start">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Products
        </h4>
        <button
          id="dropdownHoverButton"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
          className="absolute right-7.5 bg-gray text-black text-absolute font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          type="button"
        >
          {currentCategoryName}
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
              <ul>
                {cats.map((category, key) => (
                  <li
                    key={category.id}
                    value={category.name}
                    className="block px-4 py-2 hover:bg-white text-black rounded-lg"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </button>
      </span>
      <div>
        <div className="flex flex-col">
          <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4">
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                ID
              </h5>
            </div>
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Name
              </h5>
            </div>
            <div className="p-2.5 text-center sm:block xl:p-5 ">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Revenue
              </h5>
            </div>
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Cost
              </h5>
            </div>
          </div>

          {selectedCategory.map((item, key) => (
            <TableRow
              key={item.id}
              id={item.id}
              name={item.name}
              revenue={item.salesRevenue}
              cost={item.cost}
            ></TableRow>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardFive;
