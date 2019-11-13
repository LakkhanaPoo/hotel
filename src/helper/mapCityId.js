import cityId from "./city-id.json";

const getCityId = cityName => cityId[cityName.toLowerCase().trim()];

export { getCityId };
