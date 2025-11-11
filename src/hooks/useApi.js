import { useState, useEffect, useCallback} from 'react';

const useApi = (urlBuilder) => {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback( async () => {
    
    setIsLoading(true);
    setError(null);

    const url = urlBuilder(); // call the function to get the current URL
    if(!url){ // if no URL then dongt try to fetch data
      setIsLoading(false);
      return;
    }

    try{
      const response = await fetch(url);
      
      if(!response.ok){
        throw new Error('Something went wrong, unable to fetch movies');
      }

      const result = await response.json();
      setData(result.results); // Assuming the API always returns data in a .results property
    } catch (err){
      setError(err.message);
    }finally {
      setIsLoading(false);
    }
  }, [urlBuilder]); // Re-run if the urlBuilder function changes

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Re-run the effect if the fetchData function changes

  return { data, isLoading, error, refetch: fetchData};
};

export default useApi;
