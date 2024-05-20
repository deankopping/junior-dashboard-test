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

const sortMethods = ["Revenue ↓", "Revenue ↑", "Cost ↓", "Cost ↑"];

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
  const [selectedCategory, setSelectedCategory] = useState(products);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [selectedSort, setSelectedSort] = useState("Revenue ↓");
  const [isSortMenuOpen, setSortMenuOpen] = useState(false);

  let currentCategoryID = 0;
  let totalRevenue = findTotalRevenue();
  let totalCost = findTotalCost();

  function handleCategorySelect({ id }: { id: number }) {
    currentCategoryID = id;
    relevantProducts = products.filter(
      (product) => product.categoryId === currentCategoryID
    );
    setSelectedCategory(relevantProducts);
    totalRevenue = findTotalRevenue();
    totalCost = findTotalCost();
    setDropdownOpen(false);
  }
  function handleCategorySelectAll() {
    relevantProducts = products;
    setSelectedCategory(products);
    totalRevenue = findTotalRevenue();
    totalCost = findTotalCost();
    setDropdownOpen(false);
  }
  function handleSortMethodSelect(method: SetStateAction<string>) {
    if (method === "Revenue ↓")
      relevantProducts = relevantProducts.sort((a, b) =>
        b.salesRevenue > a.salesRevenue ? 1 : -1
      );

    if (method === "Revenue ↑")
      relevantProducts = relevantProducts.sort((a, b) =>
        b.salesRevenue > a.salesRevenue ? -1 : 1
      );

    if (method === "Cost ↓")
      relevantProducts = relevantProducts.sort((a, b) =>
        b.cost > a.cost ? 1 : -1
      );

    if (method === "Cost ↑")
      relevantProducts = relevantProducts.sort((a, b) =>
        b.cost > a.cost ? -1 : 1
      );

    setSelectedSort(method);
    setSortMenuOpen(false);

    handleCategorySelect(cats[currentCategoryID + 1]);
  }

  function findTotalRevenue() {
    return relevantProducts.reduce(function (totalRevenue, product) {
      return totalRevenue + product.salesRevenue;
    }, 0);
  }
  function findTotalCost() {
    return relevantProducts.reduce(function (totalCost, product) {
      return totalCost + product.cost;
    }, 0);
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
      <div className="sm-text-xs grid grid-cols-4 border-b border-stroke dark:border-strokedark odd:bg-gray-2 dark:odd:bg-meta-4 ">
        <div className="flex items-center justify-center p-2.5 xl:p-5">
          <p className="sm-text-xs text-black dark:text-white ">{id}</p>
        </div>

        <div className="flex items-center justify-center p-2.5 xl:p-5">
          <p className="sm-text-xs text-black dark:text-white">{name}</p>
        </div>

        <div className="flex items-center justify-center p-2.5 xl:p-5">
          <p className="sm-text-xs text-meta-3">
            {revenue.toLocaleString("us-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>

        <div className="flex items-center justify-center p-2.5 xl:p-5">
          <p className="sm-text-xs text-meta-1">
            {`( ${cost.toLocaleString("us-US", {
              style: "currency",
              currency: "USD",
            })} )`}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <span className="flex flex-row items-start min-w-47.5 items-start">
        <h4 className="mb-6 text-title-md font-bold text-black dark:text-white">
          Products
        </h4>
        <div className="absolute right-7.5 flex flex-row items-center">
          <label className="dark:text-white text-black  font-medium rounded-lg text-sm text-center px-2.5 ">
            Sort By:
          </label>
          <button
            id="SortMenu"
            onMouseEnter={() => setSortMenuOpen(true)}
            onMouseLeave={() => setSortMenuOpen(false)}
            className=" mr-2 relative bg-whiter p-1.5 dark:bg-meta-4 text-black dark:text-white text-absolute font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center"
            type="button"
          >
            {selectedSort}
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
            {isSortMenuOpen && (
              <div
                id="SortMenuHover"
                className="absolute top-9 right-0  z-10  w-30  bg-gray divide-y divide-gray-100 rounded-lg shadow dark:bg-meta-4"
                onMouseEnter={() => setSortMenuOpen(true)}
                onMouseLeave={() => setSortMenuOpen(false)}
              >
                <ul>
                  {sortMethods.map((method, key) => (
                    <li
                      key={key}
                      value={method}
                      className="block px-4 py-2 hover:bg-white text-black rounded-lg dark:text-white hover:shadow-card dark:hover:bg-boxdark"
                      onClick={() => handleSortMethodSelect(method)}
                    >
                      {method}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </button>
          <label className="dark:text-white text-black  font-medium rounded-lg text-sm text-center items-start px-2.5 ">
            Category:
          </label>

          <button
            id="dropdownHoverButton"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
            className="relative mb-0 bg-whiter p-1.5 dark:bg-meta-4 text-black dark:text-white text-absolute font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center"
            type="button"
          >
            {relevantProducts.length !== products.length
              ? cats[selectedCategory[0].categoryId - 1].name
              : "All"}
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
                className="absolute top-9 right-0 z-10 w-30   bg-gray divide-y divide-gray-100 rounded-lg shadow dark:bg-meta-4"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <ul>
                  <li
                    className="block px-4 py-2 hover:bg-white text-black rounded-lg dark:text-white hover:shadow-card dark:hover:bg-boxdark"
                    onClick={() => handleCategorySelectAll()}
                  >
                    All
                  </li>
                  {cats.map((category, key) => (
                    <li
                      key={category.id}
                      value={category.name}
                      className="block px-4 py-2 hover:bg-white text-black rounded-lg dark:text-white hover:shadow-card dark:hover:bg-boxdark"
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </button>
        </div>
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
              key={key}
              id={item.id}
              name={item.name}
              revenue={item.salesRevenue}
              cost={item.cost}
            ></TableRow>
          ))}
        </div>
      </div>
      <div className="p-2.5 flex w-full flex-wrap gap-3 sm:gap-5">
        <div className="flex min-w-47.5">
          <div className="w-full">
            <p className="font-semibold text-primary">Total Revenue</p>
            <p className="text-sm font-medium">
              {totalRevenue.toLocaleString("us-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
        </div>
        <div className="flex min-w-47.5">
          <div className="w-full">
            <p className="font-semibold text-secondary">Total Profit</p>
            <p className="text-sm font-medium">
              {(totalRevenue - totalCost).toLocaleString("us-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFive;
