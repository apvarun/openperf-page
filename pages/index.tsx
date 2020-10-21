import React, { useEffect } from "react";
import { google } from "googleapis";
import Head from "next/head";
import Link from "next/link";
import StatCard from "../components/statCard";
import Heatmap from "../components/heatmap";
import Trend from "../components/trend";
import googleAuth from "../utils/google";
import { logPageView } from "../components/googleAnalytics";
import Header from "../components/Header";
import { organizeData } from "../utils/dataOrganizer";
import { num, percent, time } from "../utils/helpers";

const site = process.env.SITENAME;

const metrics = {
  PAGE_VIEWS: "ga:pageviews",
  USERS: "ga:users",
  BOUNCE_RATE: "ga:bounceRate",
  SESSION_DURATION: "ga:avgSessionDuration",
};

const dimensions = [
  "ga:source",
  "ga:pagePath",
  "ga:country",
  "ga:deviceCategory",
  "ga:browser",
  "ga:date",
];

export async function getServerSideProps(context) {
  const view_id = process.env.VIEW_ID;

  try {
    const result = await google.analytics("v3").data.ga.get({
      auth: googleAuth,
      ids: "ga:" + view_id,
      "start-date": "30daysAgo",
      "end-date": "today",
      metrics: Object.values(metrics).join(","),
      dimensions: dimensions.join(","),
    });

    // Add Caching
    context.res.setHeader(
      "Cache-Control",
      "public, max-age=21600 s-maxage=21600, stale-while-revalidate"
    );

    return {
      props: {
        ...result.data.totalsForAllResults,
        dataHeader: result.data.columnHeaders,
        data: result.data.rows,
        site,
      },
    };
  } catch (err) {
    console.log(err);
    if (err.code === "ETIMEDOUT") {
      return {
        props: {
          status: "Timeout",
          site,
        },
      };
    }
    return {
      props: {
        status: "Setup Incomplete",
        site,
      },
    };
  }
}

export default function Stat(props) {
  useEffect(() => {
    logPageView();
  });

  if (
    props.status &&
    (props.status === "Setup Incomplete" || props.status === "Timeout")
  ) {
    return (
      <>
        <Header site={props.site} />

        <div className="my-32 text-center">
          <h1 className="text-xl font-semibold">
            {props.status === "Timeout"
              ? "Google Analytics Timeout"
              : "Site configuration is incomplete"}
          </h1>
          <p className="opacity-50">
            {props.status === "Timeout"
              ? "We are not getting data from Google Analytics. Try again after a few minutes."
              : "If you are the owner of this site, login and complete the configuration."}
          </p>
        </div>
      </>
    );
  }

  const data = organizeData(props.dataHeader, props.data);

  return (
    <>
      <Head>
        <title>Analytics Dashboard for {props.site}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/icons/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Header site={props.site} />

      <div className="container mx-auto opacity-25 m-2 flex justify-end items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        Last 30 days
      </div>

      <div className="container mx-auto">
        {/* Top Grid */}
        <div className="grid sm:grid-cols-4 grid-cols-2 mb-2 p-4 bg-gray-100 rounded shadow-md">
          <dl className="p-2 flex flex-col justify-between">
            <dt className="text-gray-500">PAGE VIEWS</dt>
            <dd className="md:text-4xl text-2xl font-bold">
              {num(props[metrics.PAGE_VIEWS])}
            </dd>
          </dl>
          <dl className="p-2 flex flex-col justify-between">
            <dt className="text-gray-500">USERS</dt>
            <dd className="md:text-4xl text-2xl font-bold">
              {num(props[metrics.USERS])}
            </dd>
          </dl>
          <dl className="p-2 flex flex-col justify-between">
            <dt className="text-gray-500">BOUNCE RATE</dt>
            <dd className="md:text-4xl text-2xl font-bold">
              {percent(props[metrics.BOUNCE_RATE])}
            </dd>
          </dl>
          <dl className="p-2 flex flex-col justify-between">
            <dt className="text-gray-500">SESSION DURATION</dt>
            <dd className="md:text-4xl text-2xl font-bold">
              {time(props[metrics.SESSION_DURATION])}
            </dd>
          </dl>
        </div>

        <Trend list={Object.entries(data.days)} />

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 my-4">
          <StatCard
            list={Object.entries(data.pages)}
            heading="Top Pages"
            listHeadings={["PAGE URL", "VISITORS"]}
            disableCapitalize={true}
          />
          <StatCard
            list={Object.entries(data.devices)}
            heading="Devices"
            listHeadings={["SIZE", "VISITORS"]}
          />
          <StatCard
            list={Object.entries(data.sources)}
            heading="Top Sources"
            listHeadings={["SOURCE", "VISITORS"]}
            disableCapitalize={true}
          />

          <Heatmap
            list={Object.entries(data.countries)}
            heading="Top Countries"
          />
        </div>
      </div>
      <div className="container mx-auto opacity-25 m-2 flex justify-start items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <polyline points="23 4 23 10 17 10"></polyline>
          <polyline points="1 20 1 14 7 14"></polyline>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
        Updated every 6 hours
      </div>

      {/* Footer */}
      <section className="mt-16 mb-8 flex items-center">
        <span className="opacity-75">Powered by&nbsp;</span>
        <Link href="/">
          <a className="text-2xl font-bold flex items-start">
            <svg
              width="18"
              viewBox="0 0 51 119"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-2"
            >
              <path
                d="M19 40L5 66L22 113.5M19 5L46 40L30 74M19 5L13 21.5M19 5H38"
                stroke="black"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            OpenPerf
            <span className="rounded bg-red-200 text-xs ml-2 py-0 px-2 font-normal">
              Beta
            </span>
          </a>
        </Link>
      </section>
    </>
  );
}
