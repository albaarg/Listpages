import React, { useState, useEffect } from "react";
import DataApi from "../src/api";
import Modal from "../src/Modal";

const api = new DataApi();
const App = () => {
  const [dataList, setDataList] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  },);

  const fetchData = () => {
    api
      .getList({ number: 30, offset: 0 })
      .then((data) => {
        const filteredData = data.filter((d) => {
          return (
            d.first_name
              .toString()
              .toLowerCase()
              .includes(search.toString().toLowerCase()) ||
            d.last_name
              .toString()
              .toLowerCase()
              .includes(search.toString().toLowerCase())
          );
        });
        const sortedData = filteredData.sort((a, b) => {
          const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
          const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        setDataList(sortedData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNameClick = (data) => {
    api
      .get(data.id)
      .then((details) => {
        setSelectedData(details);
        setShowModal(true);
        setDetails(details);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const hasResults = dataList.length > 0;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: 30,
      }}
    >
      <div>
        <input
          type="search"
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "40%",
          paddingTop: 50,
        }}
      >
        {!hasResults && (
          <p style={{ color: "red" }}> Not results found</p>
        )}
        {hasResults &&
          dataList.map((data) => (
            <div key={data.id}>
              <div
                style={{
                  border: "solid",
                  padding: 8,
                  margin: 3,
                  textAlign: "center",
                }}
                onClick={() => handleNameClick(data)}
              >
                {data.first_name} {data.last_name} {data.phone}
              </div>
            </div>
          ))}
      </div>
      {showModal && (
        <Modal details={selectedData} onClose={() => handleCloseModal()} />
      )}
    </div>
  );
};

export default App;
