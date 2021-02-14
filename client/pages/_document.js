import Document, { Html, Head, Main, NextScript } from 'next/document';

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SCRIPT = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script async src={PAYPAL_SCRIPT}></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
