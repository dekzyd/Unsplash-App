import { useGlobalContext } from "../Context";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value;
    if (!searchValue) return;
    setSearchTerm(searchValue);
  };

  return (
    <section>
      <h1 className="title">Unsplash Images</h1>
      <form className="search-form" onSubmit={handleFormSubmit}>
        <input
          name="search"
          placeholder="cat"
          className="form-input search-input"
          type="text"
        />
        <button type="submit" className="btn">
          Search
        </button>
      </form>
    </section>
  );
};

export default SearchForm;
