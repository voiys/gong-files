import fs from 'fs-extra';
import _ from 'lodash';
import { GetStaticPaths, GetStaticProps } from 'next';

type Props = {
	downloadLinks: string[];
};

export default function Home(props: Props) {
	return (
		<div className='bg-gray-200 h-screen w-screen flex items-center justify-center'>
			<ul
				role='list'
				className='flex flex-col gap-y-3  w-full max-w-3xl overflow-y-auto'
			>
				{props.downloadLinks.map((downloadLink) => (
					<a key={downloadLink} href={`/${downloadLink}`} download>
						<li className='overflow-hidden bg-white px-4 py-4 shadow sm:rounded-md sm:px-6'>
							{/* Your content */}
							{downloadLink}
						</li>
					</a>
				))}
			</ul>
		</div>
	);
}

const excludedFiles = ['favicon.ico', 'vercel.svg'];

export const getStaticProps: GetStaticProps<Props> = async () => {
	const dir = await fs.readdir('./public');

	const downloadLinks = _.difference(dir, excludedFiles);

	return {
		props: {
			downloadLinks,
		},
	};
};
