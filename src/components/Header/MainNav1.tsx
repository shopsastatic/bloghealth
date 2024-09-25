import { FC } from 'react'
import Navigation from '@/components/Navigation/Navigation'
import MenuBar from '@/components/MenuBar/MenuBar'
import { NC_PRIMARY_MENU_QUERY_FRAGMENT } from '@/fragments/menu'
import { FragmentType } from '@/__generated__'
import AvatarDropdown from './AvatarDropdown'
import Brand from './Brand'
import CreateBtn from './CreateBtn'
import { SearchIconBtn } from './HeaderSearch'
import Logo from '../Logo/Logo'
import dynamic from 'next/dynamic'

export interface MainNav1Props {
	menuItems: FragmentType<typeof NC_PRIMARY_MENU_QUERY_FRAGMENT>[]
	title?: string | null
	description?: string | null
}

const DynamicMenuBar = dynamic(() => import('@/components/MenuBar/MenuBar'), {
	ssr: false,
})

const MainNav1: FC<MainNav1Props> = ({ menuItems, title, description }) => {
	return (
		<div className='main-header container flex items-center justify-between bg-white min-h-[60px]'>
			<div>
				<div className='logo'>
					<Logo />
				</div>

				<div className='menu'>
					<Navigation
						menuItems={menuItems}
						className="hidden lg:flex"
					/>
				</div>
			</div>

			<div className='flex items-center'>
				<div className='search'>
					<SearchIconBtn />
				</div>
				<div className='block lg:hidden'>
					<DynamicMenuBar menuItems={menuItems} />
				</div>
			</div>
		</div>
	)
}

export default MainNav1
