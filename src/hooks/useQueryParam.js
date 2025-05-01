import { useSearchParams } from "react-router-dom";

/* 
-A small hook for handling a single query parameter from the URL
-Can be used repeatedly for multiple path queries, remember to rename the return variables!
*/
export function useQueryParam(key) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get(key);

  function setQueryParam(value) {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  }
  return { queryParam, setQueryParam };
}
