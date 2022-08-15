import { Head, Html, Main, NextScript } from 'next/dist/pages/_document';

const MyDocument = (): JSX.Element => {
	return (
		<Html lang="en">
			<Head>
				<link rel="icon" href="/favicon.ico" type="image/svg+xml" />

				<meta name="thema-color" content="#FF7652" />
				<meta name="msapplication-navbutton-color" content="#FF7652" />
				<meta name="apple-mobile-web-app-status-bar-style" content="#FF7652" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default MyDocument;
