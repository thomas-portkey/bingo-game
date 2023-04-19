import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1" />
      </Head>
      <body>
        <Script id="fontsize" strategy="afterInteractive">
          {`  
            !(function(doc, win) {
              var docEle = doc.documentElement,
                event = "onorientationchange" in window ? "orientationchange" : "resize",
                fn = function() {
                  var width = docEle.clientWidth;
                  var unitWidth = width < 1180 ? 375 : 1920;
                  width && (docEle.style.fontSize = 10 * (width / unitWidth) + "px");
                };

              win.addEventListener(event, fn, false);
              doc.addEventListener("DOMContentLoaded", fn, false);

            }(document, window));     
        `}
        </Script>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
