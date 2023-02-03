import { Button } from "@mui/material";

const handleClick = async () => {
  try {
    const response = await fetch("/api/hello", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();

    console.log("result is: ", JSON.stringify(result, null, 4));
  } catch (err) {
    console.log("error");
  }
};

function Testing() {
  return (
    <>
      <h1>testing</h1>
      <p>set led on/off</p>
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
      </Button>
    </>
  );
}

export default Testing;
