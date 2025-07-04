import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import Footer from "../components/Footer";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <Head>
        <meta
          name="description"
          content="Muhsin Bin Irshad | Security Engineer | Kerala, India. Dynamic security engineer with hands-on experience in vulnerability assessment, penetration testing, and red teaming. Passionate about open-source, OSINT, and continuous learning."
        />
        <meta name="theme-color" content="#2563eb" />
      </Head>
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}

export default MyApp;
