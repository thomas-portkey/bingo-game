import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1" />
      </Head>
      <body>
        <Script id="fontsize" strategy="beforeInteractive">
          {`  
            !(function(doc, win) {
              var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
              var docEle = doc.documentElement,
                event = "onorientationchange" in window ? "orientationchange" : "resize",
                fn = function() {
                  var width = docEle.clientWidth;
                  var unitWidth = isMobile ? 375 : 1920;
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
