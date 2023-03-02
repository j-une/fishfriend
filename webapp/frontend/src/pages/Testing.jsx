import React, { useEffect, useState } from "react";
// import { Button } from "@mui/material";

// const handleClick = async () => {
//   try {
//     const response = await fetch("/api/hello", {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Error! status: ${response.status}`);
//     }

//     const result = await response.json();

//     console.log("result is: ", JSON.stringify(result, null, 4));
//   } catch (err) {
//     console.log("error");
//   }
// };

function Testing() {
  const [sensorData, setSensorData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/sensors");
        const json = await res.json();
        setSensorData(json);
      } catch (error) {
        console.log(error);
      }
    };

    const id = setInterval(() => {
      fetchData();
    }, 3000);

    fetchData();

    return () => clearInterval(id);
  }, []);

  // const data = {
  //   ph: "1",
  //   temperature: "2",
  //   food_level: "3",
  //   feeder: "off",
  //   status: "normal",
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch("/api/sensors");
  //       const json = await res.json();
  //       setSensorData(json);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   const postData = async () => {
  //     try {
  //       const res = await fetch("/api/sensors", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       });
  //       const json = await res.json();
  //       console.log(json);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const id = setInterval(() => {
  //     fetchData();
  //     postData();
  //   }, 1000);

  //   postData();
  //   fetchData();

  //   return () => clearInterval(id);
  // }, []);

  return (
    <>
      <h1>testing</h1>
      {sensorData && (
        <>
          <p>pH: {sensorData.ph}</p>
          <p>temperature: {sensorData.temperature}</p>
          <p>food level: {sensorData.food_level}</p>
          <br />
          <h5>Send commands:</h5>
          <iframe
            name="dummyframe"
            title="dummyframe"
            id="dummyframe"
            style={{ display: "none" }}
          ></iframe>
          <form
            action="http://localhost:2000/api/commands"
            method="POST"
            target="dummyframe"
          >
            <label htmlFor="temperature">temperature: </label>
            <input id="temperature" type="text" name="temperature" />
            <br />
            <label htmlFor="feeder">feeder: </label>
            <input id="feeder" type="text" name="feeder" />
            <br />
            <label htmlFor="water_change">water change: </label>
            <input id="water_change" type="text" name="water_change" />
            <br />
            <button>send</button>
          </form>
          <br />{" "}
        </>
      )}
      {/* <p>set led on/off</p>
      <iframe
        name="dummyframe"
        id="dummyframe"
        style={{ display: "none" }}
      ></iframe>
      <form
        action="http://localhost:2000/api/hello"
        method="GET"
        target="dummyframe"
      >
        <button name="led" value="on">
          Turn LED ON
        </button>
        <button name="led" value="off">
          Turn LED OFF
        </button>
      </form>
      <p>set temperature</p>
      <form
        action="http://localhost:2000/api/hello"
        method="GET"
        target="dummyframe"
      >
        <input id="temperature" type="text" name="temperature" />
      </form>
      <br />
      <br />
      <Button variant="contained" onClick={handleClick}>
        GET
      </Button> */}
    </>
  );
}

export default Testing;
