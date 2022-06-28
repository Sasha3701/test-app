import { AppProvider } from "../context";
import { useRouter } from "next/router";
import { Layout } from "../layout";
import { useEffect } from "react";
import { getCookie } from "../utils";
import { myInstance } from "../api";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { page, limit } = router.query;

  useEffect(() => {
    myInstance.defaults.headers.common["x-access-token"] =
      getCookie("access-token");
  }, []);

  return (
    <AppProvider currentPage={page} currentLimit={limit}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

export default MyApp;
