import { TPostCard } from '@/components/Card2/Card2'
import { TCategoryCardFull } from '@/components/CardCategory1/CardCategory1'
import { PostDataFragmentType } from '@/data/types'
import useGetPostsNcmazMetaByIds from '@/hooks/useGetPostsNcmazMetaByIds'
import useHandleGetPostsArchivePage from '@/hooks/useHandleGetPostsArchivePage'
import Link from 'next/link'
import { FC } from 'react'

interface IArchiveLayoutProps {
	children: React.ReactNode
	name?: string | null
	initPosts?: PostDataFragmentType[] | null
	initPostsPageInfo?: {
		endCursor?: string | null | undefined
		hasNextPage: boolean
	} | null
	tagDatabaseId?: number | null
	categoryDatabaseId?: number | null
	taxonomyType: 'tag' | 'category' | 'postFormat'
	top10Categories: TCategoryCardFull[] | null
	categoryChild: any
}

const ArchiveLayout: FC<any> = ({
	children,
	name,
	initPosts: posts,
	initPostsPageInfo,
	tagDatabaseId,
	categoryDatabaseId,
	taxonomyType,
	top10Categories,
	categoryChild
}) => {
	// START ----------
	//
	const { } = useGetPostsNcmazMetaByIds({
		posts: (posts || []) as TPostCard[],
	})
	//

	const {
		currentPosts,
		handleChangeFilterPosts,
		handleClickShowMore,
		hasNextPage,
		loading,
	} = useHandleGetPostsArchivePage({
		initPosts: posts,
		initPostsPageInfo,
		tagDatabaseId,
		categoryDatabaseId,
	})

	return (
		<div className="page-category container mt-10">
			<h1 className='first-letter:capitalize'>{name}</h1>

			<div className='list-category-child my-10 flex flex-wrap gap-5'>
				{categoryChild?.length && categoryChild?.map((item: any, index: any) => (
					<Link key={index} href={item?.uri ?? "/"} className='border border-[#0d48b3] py-3 px-5 rounded-lg text-[#0d48b3] transition-all hover:bg-[#0d48b3] hover:text-white font-semibold'>{item?.name}</Link>
				))}
			</div>
			<hr />

			<div className='my-10'>
				{categoryChild?.length > 0 && categoryChild.map((cate: any, cateIndex: any) => (
					<div key={cateIndex} className='mt-10'>
						{cateIndex != 0 && (
							<hr className='mt-20' />
						)}
						<div className='flex justify-between items-center mt-10'>
							<h2>{cate?.name}</h2>
							<Link href={cate?.uri} className='text-link-color'>View all</Link>
						</div>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-10'>
							{cate?.posts?.nodes?.length > 0 && cate.posts.nodes.slice(0, 6).map((item: any, index: any) => (
								<div className='col-span-1 grid grid-cols-3 md:grid-cols-5 gap-5 items-center md:items-start' key={index}>
									<div className='col-span-1 md:col-span-2'>
										<Link href={item?.uri ?? "/"}>
											<img className='w-full rounded h-[120px] object-cover object-top' src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
										</Link>
									</div>
									<div className='col-span-2 md:col-span-3'>
										<Link href={item?.uri ?? "/"}>
											<h2 className='text-lg lg:text-2xl leading-6 lg:leading-8 line-clamp-3'>
												{item?.title}
											</h2>
										</Link>
										<div className='flex gap-2 items-center mt-3 text-sm'>
											<Link href={cate?.uri} className='text-link-color line-clamp-1 xs:max-w-fit md:max-w-full'>
												{cate?.name}
											</Link>
											<span>•</span>
											<span className='line-clamp-1'>8 min read</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default ArchiveLayout
