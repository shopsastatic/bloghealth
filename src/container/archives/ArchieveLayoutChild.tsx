import ArchiveFilterListBox from '@/components/ArchiveFilterListBox/ArchiveFilterListBox'
import { TPostCard } from '@/components/Card2/Card2'
import { TCategoryCardFull } from '@/components/CardCategory1/CardCategory1'
import GridPostsArchive from '@/components/GridPostsArchive'
import Pagination from '@/components/Pagination/Pagination'
import { FILTERS_OPTIONS } from '@/contains/contants'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import { PostDataFragmentType } from '@/data/types'
import useGetPostsNcmazMetaByIds from '@/hooks/useGetPostsNcmazMetaByIds'
import useHandleGetPostsArchivePage from '@/hooks/useHandleGetPostsArchivePage'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FC } from 'react'

interface IArchiveLayoutChildProps {
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
	parent: any
}

const ArchiveLayoutChild: FC<IArchiveLayoutChildProps> = ({
	children,
	name,
	initPosts: posts,
	initPostsPageInfo,
	tagDatabaseId,
	categoryDatabaseId,
	taxonomyType,
	top10Categories,
	parent
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

	console.log(currentPosts)

	return (
		<div className="page-category-child container mt-5">
			<div className='text-sm flex gap-2 mt-3 mb-12'>
				<Link href={"/"} className='hover:underline'>Home</Link>
				<span>&gt;</span>
				<Link href={parent?.uri ?? "/"} className='hover:underline'>{parent?.name}</Link>
			</div>
			<h1>{name}</h1>

			<div className='head-posts grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
				{currentPosts?.length && currentPosts?.slice(0, 2)?.map((item: any, index: any) => (
					<div className='col-span-1' key={index}>
						<Link href={item?.uri ?? "/"}>
							<img className='w-full h-auto md:w-[550px] md:h-[366px] object-cover object-fit rounded' src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
						</Link>
						<Link href={item?.uri ?? "/"}>
							<h2 className='my-3 text-2xl md:text-3xl'>{item?.title}</h2>
						</Link>
						<div className='line-clamp-2 mb-2 md:mb-5' dangerouslySetInnerHTML={{ __html: item?.excerpt }}></div>

						<div className='flex gap-2 text-sm'>
							<Link href="#" onClick={(e) => e.preventDefault()} className="text-link-color font-semibold">
								{name}
							</Link>
							<span>•</span>
							<span>9 mins read</span>
						</div>
					</div>
				))}
			</div>

			<div className='body-posts grid grid-cols-1 md:grid-cols-2 gap-10 mt-20 md:mt-10'>
				{currentPosts?.length > 2 && currentPosts?.slice(2, 10)?.map((item: any, index: any) => (
					<div className='col-span-1 flex gap-5 items-center md:items-start' key={index}>
						<div className='w-[200px]'>
							<Link href={item?.uri ?? "/"}>
								<img className='min-w-[140px] md:min-w-[160px] lg:min-w-[200px] h-[100px] md:h-[133px] object-cover object-fit rounded' src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
							</Link>
						</div>
						<div className='w-full'>
							<Link href={item?.uri ?? "/"}><h2 className='my-3 leading-6 md:leading-7 text-lg md:text-xl line-clamp-3'>{item?.title}</h2></Link>

							<div className='flex gap-2 text-sm'>
								<Link href="#" onClick={(e) => e.preventDefault()} className="text-link-color font-semibold">
									{name}
								</Link>
								<span>•</span>
								<span className='line-clamp-1'>9 mins read</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default ArchiveLayoutChild
