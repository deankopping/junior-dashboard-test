import { SetStateAction, useMemo, useState } from "react";

const categories = [
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

const CardFive = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Revenue ↓");
  const [isSortMenuOpen, setSortMenuOpen] = useState(false);

  const sortedProducts = useMemo(() => {
    let filteredProducts =
      selectedCategory !== 0
        ? products.filter((product) => product.categoryId === selectedCategory)
        : products;

    return filteredProducts.sort((a, b) => {
      switch (selectedSort) {
        case "Revenue ↓":
          return b.salesRevenue - a.salesRevenue;
        case "Revenue ↑":
          return a.salesRevenue - b.salesRevenue;
        case "Cost ↓":
          return b.cost - a.cost;
        case "Cost ↑":
          return a.cost - b.cost;
        default:
          return 0;
      }
    });
  }, [selectedCategory, selectedSort]);

  const totalRevenue = useMemo(
    () =>
      sortedProducts.reduce(
        (total, product) => total + product.salesRevenue,
        0
      ),
    [sortedProducts]
  );

  const totalCost = useMemo(
    () => sortedProducts.reduce((total, product) => total + product.cost, 0),
    [sortedProducts]
  );

  const handleCategorySelect = (id: number) => {
    setSelectedCategory(id);
    setDropdownOpen(false);
  };

  const handleCategorySelectAll = () => {
    setSelectedCategory(0);
    setDropdownOpen(false);
  };

  const handleSortMethodSelect = (method: SetStateAction<string>) => {
    setSelectedSort(method);
    setSortMenuOpen(false);
  };

  const TableRow = ({
    id,
    name,
    revenue,
    cost,
  }: {
    id: number;
    name: string;
    revenue: number;
    cost: number;
  }) => (
    <div className="text:base grid grid-cols-4 border-b border-stroke dark:border-strokedark odd:bg-gray-2 dark:odd:bg-meta-4 tracking-wide">
      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black dark:text-white">{id}</p>
      </div>
      <div className="flex items-center justify-center p-2.5 xl:p-5 text-left">
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
      <div className="flex items-center justify-center p-2.5 xl:p-5 whitespace-nowrap">
        <p className="sm-text-xs text-meta-1">
          {`( ${cost.toLocaleString("us-US", {
            style: "currency",
            currency: "USD",
          })} )`}
        </p>
      </div>
    </div>
  );

  const ProductCard = ({
    id,
    name,
    revenue,
    cost,
  }: {
    id: number;
    name: string;
    revenue: number;
    cost: number;
  }) => (
    <div className="relative bg-gray-2 py-2 px-3 rounded-lg shadow text-xs bg-gray-2 dark:bg-meta-4">
      <div className="absolute right-3 text-black dark:text-white">
        ID: {id}
      </div>
      <div className="text-xs font-semibold flex flex-wrap text-black dark:text-white mb-0.5">
        {name}
      </div>
      <div className="text-xs flex flex-wrap justify-between text-black dark:text-white mb-0.5">
        Revenue:
        <p className="text-right text-meta-3">
          {revenue.toLocaleString("us-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>
      <div className="text-xs flex flex-wrap justify-between text-black dark:text-white">
        Cost:
        <p className="text-right text-meta-1">
          {cost.toLocaleString("us-US", { style: "currency", currency: "USD" })}
        </p>
      </div>
    </div>
  );

  return (
    <div className="relative rounded-sm border border-stroke bg-white py-6 px-4 sm:px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h4 className="text-title-md font-bold text-black dark:text-white">
          Products
        </h4>
        <div className="right-7.5 flex flex-row items-center mb-4">
          <label className="hidden md:block text-xs sm:text-sm dark:text-white text-black font-medium rounded-lg text-center items-start px-2.5">
            Category:
          </label>
          <button
            id="dropdownHoverButton"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
            className="relative mr-2 text-xs md:text-sm bg-whiter p-1.5 dark:bg-meta-4 text-black dark:text-white text-absolute font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center"
            type="button"
          >
            {selectedCategory !== 0
              ? categories.find((cat) => cat.id === selectedCategory)?.name
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
                className="absolute top-9 right-0 z-10 w-30 bg-gray divide-y divide-gray-100 rounded-lg shadow dark:bg-meta-4"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <ul>
                  <li
                    className="block px-4 py-2 hover:bg-white text-black rounded-lg dark:text-white hover:shadow-card dark:hover:bg-boxdark"
                    onClick={handleCategorySelectAll}
                  >
                    All
                  </li>
                  {categories.map((category, key) => (
                    <li
                      key={key}
                      value={category.name}
                      className="block px-4 py-2 hover:bg-white text-black rounded-lg dark:text-white hover:shadow-card dark:hover:bg-boxdark"
                      onClick={() => handleCategorySelect(category.id)}
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </button>
          <label className="hidden md:block text-xs sm:text-sm dark:text-white text-black font-medium rounded-lg text-center px-2.5">
            Sort By:
          </label>
          <button
            id="SortMenu"
            onMouseEnter={() => setSortMenuOpen(true)}
            onMouseLeave={() => setSortMenuOpen(false)}
            className="text-xs md:text-sm relative bg-whiter p-1.5 dark:bg-meta-4 text-black dark:text-white text-absolute font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center"
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
                className="absolute top-9 right-0 z-10 w-30 bg-gray divide-y divide-gray-100 rounded-lg shadow dark:bg-meta-4"
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
        </div>
      </div>

      <div className="flex flex-col text-base hidden md:block">
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 border border-stroke dark:border-strokedark">
          <div className="p-2.5 text-center sm:block xl:p-5">
            <h5 className="font-medium uppercase">ID</h5>
          </div>
          <div className="p-2.5 text-center sm:block xl:p-5">
            <h5 className="font-medium uppercase">Name</h5>
          </div>
          <div className="p-2.5 text-center sm:block xl:p-5">
            <h5 className="font-medium uppercase">Revenue</h5>
          </div>
          <div className="p-2.5 text-center sm:block xl:p-5">
            <h5 className="font-medium uppercase">Cost</h5>
          </div>
        </div>

        {sortedProducts.map((item) => (
          <TableRow
            key={item.id}
            id={item.id}
            name={item.name}
            revenue={item.salesRevenue}
            cost={item.cost}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 md:hidden">
        {sortedProducts.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            revenue={item.salesRevenue}
            cost={item.cost}
          />
        ))}
      </div>

      <div className="p-2.5 mt-3 flex">
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
