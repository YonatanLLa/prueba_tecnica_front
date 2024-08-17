import axios from "axios";
import { useEffect, useState } from "react";

export const Datos = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7113/api/Person")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Personas</h1>
      {data.map((item: any) => (
        <div key={item.id}>
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};
