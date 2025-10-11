"use client";
import { X } from "lucide-react";
import { useRef } from "react";

const SearchModal = ({
  isSearchOpen,
  searchTerm,
  filteredProducts,
  closeSearch,
  handleSearchClick,
  stopPropagation,
  handleSearchChange,
  router,
}) => {
  const searchWrapRef = useRef(null);

  return (
    <>
      <div
        className={`search-wrap  ${isSearchOpen ? "open" : ""}`}
        ref={searchWrapRef}
        onClick={handleSearchClick}
      >
        <div className="search-inner">
          <form
            method="get"
            onSubmit={(e) => e.preventDefault()}
            className="search-form"
          >
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              autoFocus
              onClick={stopPropagation}
            />
            <button
              type="button"
              onClick={closeSearch}
              className="search-btn-go"
            >
              <X />
            </button>
          </form>

          {searchTerm && (
            <ul className="search-results">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <li
                    key={product.id}
                    onClick={() => {
                      closeSearch();
                      router.push(`/shop/${product.id}`);
                    }}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <img
                        src={product.images[0].asset.url}
                        style={{
                          width: "35px",
                          borderRadius: "5px",
                          marginRight: "8px",
                        }}
                        alt={product.title}
                      />
                      {product.title}
                    </div>
                  </li>
                ))
              ) : (
                <li>No results found</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchModal;
