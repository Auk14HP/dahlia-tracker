import type { ReactNode } from 'react';

export const metadata = {
	title: 'Dahlia Tracker',
};

const RootLayout = ({ children }: { children: ReactNode }) => (
	<html lang="en">
		<body>{children}</body>
	</html>
);

export default RootLayout;
