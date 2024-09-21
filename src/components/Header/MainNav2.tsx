import { FC } from 'react'
import AvatarDropdown from './AvatarDropdown'
import SwitchDarkMode from '../SwitchDarkMode/SwitchDarkMode'
import Navigation from '../Navigation/Navigation'
import { MainNav1Props } from './MainNav1'
import Brand from './Brand'
import CreateBtn from './CreateBtn'
import dynamic from 'next/dynamic'
import { HeaderSearchForm, SearchIconBtn } from './HeaderSearch'

const DynamicMenuBar = dynamic(() => import('@/components/MenuBar/MenuBar'), {
	ssr: false,
})

export interface MainNav2Props extends MainNav1Props {}

const MainNav2: FC<MainNav2Props> = ({ menuItems, description, title }) => {
	return (
		<></>
	)
}

export default MainNav2
