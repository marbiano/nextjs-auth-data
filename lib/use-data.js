import React, { useState, useContext, createContext } from "react";

const API_URL = "https.testurl.com";

const DataContext = createContext();

export function ProvideData({ children, initialData = {} }) {
  const data = useProvideData(initialData);
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export const useData = () => {
  return useContext(DataContext);
};

function useProvideData(initialData) {
  const initState = () => ({
    topPosts: [],
    summaryMetrics: []
  });

  const [data, setData] = useState({ ...initState(), ...initialData });

  const fetchPosts = async () => {
    // function to fetch posts
    const posts = [];
    setData({ ...data, topPosts: posts });
  };

  const fetchMetrics = async () => {
    // function to fetch metrics
    const metrics = [];
    setData({ ...data, summaryMetrics: metrics });
  };

  return {
    ...data,
    setData,
    fetchPosts,
    fetchMetrics
  };
}
