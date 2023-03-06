const asyncHandler = require("express-async-handler");

const getFishTable = asyncHandler(async (req, res) => {
  let response;
  try {
    const res = await fetch(
      "https://www.wikitable2json.com/api/List_of_freshwater_aquarium_fish_species"
    );
    const json = await res.json();
    response = json;
  } catch (error) {
    console.log(error);
  }
  res.status(200).json(response);
});

const getFishListWikipedia = asyncHandler(async (req, res) => {
  let response;
  try {
    const res = await fetch(
      "http://en.wikipedia.org/w/api.php?action=parse&format=json&page=List_of_freshwater_aquarium_fish_species"
    );
    const json = await res.json();
    response = json;
  } catch (error) {
    console.log(error);
  }
  res.status(200).json(response);
});

const getFishWikipedia = asyncHandler(async (req, res) => {
  let response;
  try {
    const res = await fetch(
      `http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=1&explaintext=1&titles=${req.query.fish.replace(
        / /g,
        "_"
      )}`
    );
    const json = await res.json();
    response = json;
  } catch (error) {
    console.log(error);
  }
  res.status(200).json(response);
});

module.exports = {
  getFishTable,
  getFishListWikipedia,
  getFishWikipedia,
};
