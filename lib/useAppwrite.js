import React, { useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppwrite = (fn) => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);

  const fetchData = async () => {
    setloading(true);
    try {
      const res = await fn();
      setdata(res);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, loading, refetch };
};

export default useAppwrite;
