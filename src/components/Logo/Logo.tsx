import React from 'react'
import Link from 'next/link'
import MyImage from '../MyImage'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'

export interface LogoProps {
	className?: string
	imageClassName?: string
}

const Logo: React.FC<LogoProps> = ({ className = '', imageClassName }) => {
	let logoSrc = NC_SITE_SETTINGS.site_info?.site_logo || ''
	let logoLightSrc =
		NC_SITE_SETTINGS.site_info?.site_logo_light || logoSrc || ''

	if (!logoLightSrc && !logoSrc) {
		return null
	}

	return (
		<Link
			href="/"
		>
			<MyImage
				className={'block dark:hidden mt-0 lg:mt-6 ' + imageClassName}
				src={logoSrc || ''}
				alt={'Logo'}
				width={200}
				height={200}
			/>
		</Link>
	)
}

export default Logo
