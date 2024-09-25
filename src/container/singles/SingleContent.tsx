'use client'

import { FC, forwardRef, useEffect, useRef, useState } from 'react'
import SingleAuthor from './SingleAuthor'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { GetPostSiglePageQuery } from '@/__generated__/graphql'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import Alert from '@/components/Alert'
import { clsx } from 'clsx'
import Link from 'next/link'


const SingleContent: any = ({ post }: any) => {
	const endedAnchorRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const progressRef = useRef<HTMLButtonElement>(null)
	const [isShowScrollToTop, setIsShowScrollToTop] = useState<boolean>(false)
	//

	//
	const {
		author,
		status,
		categories,
		date,
	} = getPostDataFromPostFragment(post || {})

	//
	let categoryParent = categories?.nodes?.[0] as any
	let categoryChild = categories?.nodes?.[1] as any

	let relatedPost = [];

	if (categoryChild && categoryChild?.count >= 5) {
		relatedPost = categoryChild?.posts.nodes.slice(0, 6);
	} else {
		relatedPost = categoryParent?.posts.nodes.slice(0, 6);
	}

	useEffect(() => {
		const handleProgressIndicator = () => {
			const entryContent = contentRef.current
			const progressBarContent = progressRef.current

			if (!entryContent || !progressBarContent) {
				return
			}

			const totalEntryH = entryContent.offsetTop + entryContent.offsetHeight
			let winScroll =
				document.body.scrollTop || document.documentElement.scrollTop

			let scrolled = totalEntryH ? (winScroll / totalEntryH) * 100 : 0

			progressBarContent.innerText = scrolled.toFixed(0) + '%'

			if (scrolled >= 100) {
				setIsShowScrollToTop(true)
			} else {
				setIsShowScrollToTop(false)
			}
		}

		const handleProgressIndicatorHeadeEvent = () => {
			window?.requestAnimationFrame(handleProgressIndicator)
		}
		handleProgressIndicator()
		window?.addEventListener('scroll', handleProgressIndicatorHeadeEvent)
		return () => {
			window?.removeEventListener('scroll', handleProgressIndicatorHeadeEvent)
		}
	}, [])

	const renderAlert = () => {
		if (status === 'publish') {
			return null
		}
		if (status === 'future') {
			return (
				<Alert type="warning">
					This post is scheduled. It will be published on {date}.
				</Alert>
			)
		}
		return (
			<>
				<Alert type="warning">
					This post is {status}. It will not be visible on the website until it
					is published.
				</Alert>
			</>
		)
	}

	return (
		<div className="relative flex flex-col">
			<div className="nc-SingleContent flex-1 space-y-10">
				{/*    */}
				{renderAlert()}

				{/* AUTHOR */}
				<div className="mx-auto mt-10">
					<SingleAuthor author={author} />
					<h2 className='mt-16 mb-7'>Related articles</h2>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{relatedPost?.length && relatedPost?.map((item: any, index: any) => (
							<Link href={item?.uri ?? "/"} key={index}>
								<div className="col-span-1 flex items-center gap-4 post-item">
									<img className="rounded w-[100px] min-w-[100px] h-[66px] object-cover object-center" src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
									<p className='text-base font-medium'>{item?.title}</p>
								</div>
							</Link>
						))}
					</div>
				</div>

				<div className="!my-0" ref={endedAnchorRef}></div>
			</div>
		</div>
	)
}

export default SingleContent
