import { FragmentType } from '@/__generated__'
import { NC_FOOTER_MENU_QUERY_FRAGMENT } from '@/fragments/menu'
import WidgetAddSubscriberForm from '../WidgetAddSubscriberForm/WidgetAddSubscriberForm'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import MyImage from '../MyImage'
import { flatListToHierarchical } from '@faustwp/core'
import { NcFooterMenuFieldsFragmentFragment } from '@/__generated__/graphql'
import Link from 'next/link'

interface Props {
	menuItems: FragmentType<typeof NC_FOOTER_MENU_QUERY_FRAGMENT>[] | null
}

export type FooterNavItemType = NcFooterMenuFieldsFragmentFragment & {
	children?: FooterNavItemType[]
}

export default function Footer({ menuItems }: Props) {
	const homeCategory1 = menuItems?.homeCategory1?.nodes?.[0]
	const homeCategory2 = menuItems?.homeCategory2?.nodes?.[0]
	const homeCategory3 = menuItems?.homeCategory3?.nodes?.[0]
	const homeCategory4 = menuItems?.homeCategory4?.nodes?.[0]

	return (
		<footer className='mt-20 bg-[#f9f9f9]'>
			<div className='footer-heading border-b-2 border-b-white'>
				<p className='text-xs text-center p-3'>Our content does not constitute a medical consultation in any form and is for informational purposes only. See a certified medical professional for medical advice/ diagnosis.</p>
			</div>
			<div className='container py-10'>
				<div className='footer-main grid grid-cols-2 lg:grid-cols-5 gap-y-14'>
					<div className='col-span-1'>
						<Link href={"/experts"} className='block mb-4 hover:underline'>
							<strong className='text-base capitalize'>Board of Experts</strong>
						</Link>
						<ul>
							<li className='mb-4 hover:underline text-sm md:text-base'>
								<Link href={"/author/emma-grace"}>Emma Grace</Link>
							</li>
							<li className='mb-4 hover:underline text-sm md:text-base'>
								<Link href={"/author/olivia-willams"}>Olivia Williams</Link>
							</li>
							<li className='mb-4 hover:underline text-sm md:text-base'>
								<Link href={"/author/isabella-faith"}>Isabella Faith</Link>
							</li>
							<li className='mb-4 hover:underline text-sm md:text-base'>
								<Link href={"/author/michael-davis"}>Michael Davis</Link>
							</li>
							<li className='mb-4 hover:underline text-sm md:text-base'>
								<Link href={"/our-experts"} className='text-link-color'>View all</Link>
							</li>
						</ul>
					</div>

					<div className='col-span-1'>
						<Link href={homeCategory1?.name ?? "/"} className='block mb-4 hover:underline'>
							<strong className='text-base capitalize'>{homeCategory1?.name}</strong>
						</Link>
						<ul>
							{homeCategory1?.children?.nodes?.length && homeCategory1?.children?.nodes?.slice(0, 4)?.map((item: any, index: any) => (
								<li className='mb-4 hover:underline text-sm md:text-base' key={index}>
									<Link href={item?.uri ?? "/"}>{item?.name}</Link>
								</li>
							))}
						</ul>
					</div>

					<div className='col-span-1'>
						<Link href={homeCategory2?.name ?? "/"} className='block mb-4 hover:underline'>
							<strong className='text-base capitalize'>{homeCategory2?.name}</strong>
						</Link>
						<ul>
							{homeCategory2?.children?.nodes?.length && homeCategory2?.children?.nodes?.slice(0, 4)?.map((item: any, index: any) => (
								<li className='mb-4 hover:underline text-sm md:text-base' key={index}>
									<Link href={item?.uri ?? "/"}>{item?.name}</Link>
								</li>
							))}
						</ul>
					</div>

					<div className='col-span-1'>
						<Link href={homeCategory3?.name ?? "/"} className='block mb-4 hover:underline'>
							<strong className='text-base capitalize'>{homeCategory3?.name}</strong>
						</Link>
						<ul>
							{homeCategory3?.children?.nodes?.length && homeCategory3?.children?.nodes?.slice(0, 4)?.map((item: any, index: any) => (
								<li className='mb-4 hover:underline text-sm md:text-base' key={index}>
									<Link href={item?.uri ?? "/"}>{item?.name}</Link>
								</li>
							))}
						</ul>
					</div>

					<div className='col-span-1'>
						<Link href={homeCategory4?.uri ?? "/"} className='block mb-4 hover:underline'>
							<strong className='text-base capitalize'>{homeCategory4?.name}</strong>
						</Link>
						<ul>
							{homeCategory4?.children?.nodes?.length && homeCategory4?.children?.nodes?.slice(0, 4)?.map((item: any, index: any) => (
								<li className='mb-4 hover:underline text-sm md:text-base' key={index}>
									<Link href={item?.uri ?? "/"}>{item?.name}</Link>
								</li>
							))}
						</ul>
					</div>

					<div className='col-span-1'>
						<Link href={"/"} className='block mb-4 hover:underline'>
							<strong className='text-base capitalize'>Reports</strong>
						</Link>
					</div>
				</div>

				<div className='footer-socials flex items-center gap-5 mt-5'>
					<Link href={"/"} className='block hover:bg-slate-200 p-3 rounded-full'>
						<img width={20} src="/images/socials/facebook.svg" alt="" />
					</Link>
					<Link href={"/"} className='block hover:bg-slate-200 p-3 rounded-full'>
						<img width={20} src="/images/socials/x-icon.svg" alt="" />
					</Link>
					<Link href={"/"} className='block hover:bg-slate-200 p-3 rounded-full'>
						<img width={20} src="/images/socials/reddit-icon.svg" alt="" />
					</Link>
					<Link href={"/"} className='block hover:bg-slate-200 p-3 rounded-full'>
						<img width={20} src="/images/socials/youtube.svg" alt="" />
					</Link>
					<Link href={"/"} className='block hover:bg-slate-200 p-3 rounded-full'>
						<img width={20} src="/images/socials/linkedin-in.svg" alt="" />
					</Link>
				</div>
			</div>

			<div className='footer-bottom bg-black text-white'>
				<div className='container flex flex-col md:flex-row items-start gap-3 md:items-center justify-between py-5 md:py-2'>
					<div>
						<ul className='flex flex-wrap items-center gap-3 text-xs'>
							<li>
								<Link href={"/about-us"}>About Us</Link>
							</li>
							<li>
								<Link href={"/contact-us"}>Contact</Link>
							</li>
							<li>
								<Link href={"/privacy-policy"}>Privacy Policy</Link>
							</li>
							<li>
								<Link href={"/term-of-use"}>Term of Use</Link>
							</li>
						</ul>
					</div>
					<div>
						<span className='text-xs'>© 2024 Healthnews</span>
					</div>
				</div>
			</div>
		</footer>
	)
}
