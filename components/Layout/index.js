import Head from 'next/head';
import Header from '../Header';
import HeaderTwo from '../HeaderTwo';


export default function Layout({
  children,
  title ,
  headerTwo = true,
}) {
  
  if(title && !Array.isArray(title)) {
    title = [title];
  }
  const pageTitle = title && title.length ? [...title, 'Jalo Market'].join(' - ') : 'Jalo Market';
  return (
  <div>
    <Head>
    <link rel="preconnect" href="https://app.snipcart.com" />
         <link rel="preconnect" href="https://cdn.snipcart.com" />
      <link
           rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.0.16/default/snipcart.css"    />
      <script src="https://cdn.snipcart.com/themes/v3.0.16/default/snipcart.js" />
    <title>{pageTitle}</title>
    <meta httpEquiv="content-language" content="en-gb"/>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=5.0"/>
        <meta name="audience" content="all"/>
        <meta name="robots" content="index,follow"/>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_NG" />
    </Head>
    <Header />
 { headerTwo &&  <HeaderTwo/>}
    <main className="leading-loose main">
      {children}
    </main>
  </div>  
  );
}
