import ReactGA from "react-ga";

export const initGA = () => {
  if (window.location.host !== "localhost:3000") {
    ReactGA.initialize(process.env.GA);
  }
  ReactGA.set({ anonymizeIp: true });
};

export const logPageView = () => {
  if (!(window as any).GA_INITIALIZED) {
    initGA();
    (window as any).GA_INITIALIZED = true;
  }

  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
