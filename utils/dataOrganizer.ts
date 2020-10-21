import { findIndex } from "./findIndex";

export const organizeData = (dataHeader, data) => {
  const result = {
    countries: {},
    pages: {},
    devices: {},
    sources: {},
    days: {},
  };

  const PAGEVIEWS_INDEX = findIndex(dataHeader, "ga:pageviews");
  const USERS_INDEX = findIndex(dataHeader, "ga:users");
  const COUNTRY_INDEX = findIndex(dataHeader, "ga:country");
  const PAGEPATH_INDEX = findIndex(dataHeader, "ga:pagePath");
  const DEVICE_INDEX = findIndex(dataHeader, "ga:deviceCategory");
  const SOURCE_INDEX = findIndex(dataHeader, "ga:source");
  const DATE_INDEX = findIndex(dataHeader, "ga:date");

  (data || []).forEach((row) => {
    const pageviews = parseInt(row[PAGEVIEWS_INDEX]);
    const users = parseInt(row[USERS_INDEX]);

    result.countries[row[COUNTRY_INDEX]] = result.countries[row[COUNTRY_INDEX]]
      ? result.countries[row[COUNTRY_INDEX]] + pageviews
      : pageviews;
    result.pages[row[PAGEPATH_INDEX]] = result.pages[row[PAGEPATH_INDEX]]
      ? result.pages[row[PAGEPATH_INDEX]] + pageviews
      : pageviews;
    result.devices[row[DEVICE_INDEX]] = result.devices[row[DEVICE_INDEX]]
      ? result.devices[row[DEVICE_INDEX]] + pageviews
      : pageviews;
    result.sources[row[SOURCE_INDEX]] = result.sources[row[SOURCE_INDEX]]
      ? result.sources[row[SOURCE_INDEX]] + pageviews
      : pageviews;
    result.days[row[DATE_INDEX]] = result.days[row[DATE_INDEX]]
      ? {
          views: result.days[row[DATE_INDEX]].views + pageviews,
          users: result.days[row[DATE_INDEX]].users + users,
        }
      : {
          views: pageviews,
          users,
        };
  });

  return result;
};
