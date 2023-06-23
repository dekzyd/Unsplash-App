import { useQuery } from "@tanstack/react-query";
import { useGlobalContext } from "../Context";
import axios from "axios";

const URL = `https://api.unsplash.com/search/photos?page=1&client_id=${
  import.meta.env.VITE_API_KEY
}`;

const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const response = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      const result = await axios.get(`${URL}&query=${searchTerm}`);

      return result.data;
    },
  });

  if (response.isLoading) {
    return (
      <div className="image-container">
        <h4>Loading...</h4>
      </div>
    );
  }

  if (response.isError) {
    return (
      <div className="image-container">
        <h4>There was an error...</h4>
      </div>
    );
  }

  const result = response.data.results;

  // If nothing is found from search.
  if (result.length < 1) {
    return (
      <div className="image-container">
        <h4>No results found...</h4>
      </div>
    );
  }
  return (
    <section className="image-container">
      {result.map((item) => {
        const url = item?.urls?.regular;
        return (
          <img
            src={url}
            alt={item.alt_description}
            key={item.id}
            className="img"
          />
        );
      })}
    </section>
  );
};

export default Gallery;
