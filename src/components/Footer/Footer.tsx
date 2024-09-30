import { FragmentType } from '@/__generated__'
import { NC_FOOTER_MENU_QUERY_FRAGMENT } from '@/fragments/menu'
import WidgetAddSubscriberForm from '../WidgetAddSubscriberForm/WidgetAddSubscriberForm'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import MyImage from '../MyImage'
import { flatListToHierarchical } from '@faustwp/core'
import { NcFooterMenuFieldsFragmentFragment } from '@/__generated__/graphql'
import Link from 'next/link'

interface Props {
	menuItems: any
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
								<Link href={"/experts"} className='text-link-color'>View all</Link>
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
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" height="18" viewBox="0 0 20 20" width="18"><path d="m20 10c0-5.523-4.477-10-10-10s-10 4.477-10 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.891h2.54v-2.203c0-2.506 1.492-3.89 3.777-3.89 1.093 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.563v1.875h2.773l-.443 2.89h-2.33v6.988c4.78-.749 8.437-4.887 8.437-9.878" fill="#8a94a4" /></svg>
					</Link>
					<Link href={"/"} className='block hover:bg-slate-200 p-3 rounded-full'>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" height="18" viewBox="0 0 20 20" width="18"><path clip-rule="evenodd" d="m13.288 19.167-4.625-6.591-5.789 6.591h-2.45l7.153-8.14-7.152-10.193h6.288l4.359 6.213 5.46-6.213h2.45l-6.82 7.764 7.414 10.57zm2.727-1.858h-1.649l-10.433-14.617h1.647l4.18 5.853.722 1.016z" fill="#8a94a4" fill-rule="evenodd" /></svg>
					</Link>
					<Link href={"/"} className='block hover:bg-slate-200 p-3 rounded-full'>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" height="24" viewBox="0 0 24 24"><path clip-rule="evenodd" d="m21 12c0 4.9706-4.0294 9-9 9-4.97056 0-9-4.0294-9-9 0-4.97056 4.02944-9 9-9 4.9706 0 9 4.02944 9 9zm-4.3157-1.3158c.7263 0 1.3158.5895 1.3158 1.3158 0 .5368-.3263 1-.7579 1.2105.021.1263.0316.2526.0316.3895 0 2.021-2.3474 3.6526-5.2527 3.6526-2.90524 0-5.25261-1.6316-5.25261-3.6526 0-.1369.01053-.2737.03158-.4-.46316-.2105-.77895-.6632-.77895-1.2 0-.7263.58948-1.3158 1.31579-1.3158.34737 0 .67369.1474.90527.3684.90526-.6631 2.15792-1.07367 3.55792-1.11578l.6631-3.13684c.0211-.06316.0527-.11579.1053-.14737s.1158-.0421.1789-.03158l2.179.46316c.1474-.31579.4631-.52631.8316-.52631.5158 0 .9368.42105.9368.93684s-.421.93684-.9368.93684c-.5053 0-.9158-.4-.9369-.89474l-1.9473-.41052-.6 2.81052c1.3684.05263 2.6105.47368 3.5052 1.11578.2316-.2316.5474-.3684.9053-.3684zm-6.74739 1.3158c-.51578 0-.93684.421-.93684.9368s.42106.9369.93684.9369c.51579 0 .93689-.4211.93689-.9369s-.4211-.9368-.93689-.9368zm2.07369 4.0947c.3579 0 1.5789-.0421 2.2211-.6842.0947-.0947.0947-.2421.021-.3474-.0947-.0947-.2526-.0947-.3474 0-.4105.4-1.2631.5474-1.8842.5474-.621 0-1.4842-.1474-1.8842-.5474-.0947-.0947-.25262-.0947-.34735 0-.09474.0948-.09474.2527 0 .3474.63155.6316 1.86315.6842 2.22105.6842zm1.1158-3.1579c0 .5158.421.9369.9368.9369s.9369-.4211.9369-.9369-.4211-.9368-.9369-.9368-.9368.421-.9368.9368z" fill="#8a94a4" fill-rule="evenodd" /></svg>
					</Link>
					<Link href={"/"} className='block hover:bg-slate-200 p-3 rounded-full'>
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 20 20"><path fill="#8a94a4" d="M18.52 0H1.477C.66 0 0 .645 0 1.441v17.114C0 19.352.66 20 1.477 20H18.52c.816 0 1.48-.648 1.48-1.441V1.44C20 .645 19.336 0 18.52 0M5.934 17.043h-2.97V7.496h2.97zM4.449 6.195a1.72 1.72 0 1 1-.006-3.439 1.72 1.72 0 0 1 .006 3.44m12.594 10.848h-2.965v-4.64c0-1.106-.02-2.532-1.543-2.532-1.543 0-1.777 1.207-1.777 2.453v4.719H7.797V7.496h2.844v1.305h.039c.394-.75 1.363-1.543 2.804-1.543 3.004 0 3.559 1.976 3.559 4.547z" /></svg>
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
