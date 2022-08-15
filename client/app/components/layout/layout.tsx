import Head from 'next/head';
import React, { FC, PropsWithChildren } from 'react';

import { Header } from './header/header';
import styles from './layout.module.scss';
import { Sidebar } from './sidebar/sidebar';

interface ILayoutProps extends PropsWithChildren {
	title: string;
}

const Layout: FC<ILayoutProps> = ({ title, children }) => {
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<main className={styles.main}>
				<Sidebar />
				<section className={styles.content}>
					<Header />
					<div className={styles.wrapper}>{children}</div>
				</section>
			</main>
		</>
	);
};

export default Layout;
