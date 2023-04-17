import Script from 'next/script';

export default function InlineScript() {
  return (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-LEHZKJQ2F5"></Script>
      <Script id="googletagmanager" strategy="afterInteractive">
        {`  window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-LEHZKJQ2F5');`}
      </Script>
    </>
  );
}
