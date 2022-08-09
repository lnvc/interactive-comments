import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

// google fonts
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Rubik&display=optional" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=optional" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@700&display=optional" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
