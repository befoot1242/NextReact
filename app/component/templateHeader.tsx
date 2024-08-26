'use client'
import Link from 'next/link'
// import { Darker_Grotesque, Grey_Qo } from 'next/font/google'
// import Image from 'next/image'
import { useEffect, useState } from 'react'

import { GiHamburgerMenu, GiKiwiBird } from 'react-icons/gi'

export type Props = {
  title: string
}
const menuData = [
  {
    id: 1,
    link: 'https://qiita.com/takubii/items/aa1f07f8ed2831dec21d',
    str: '参考リンク',
  },
  {
    id: 2,
    link: 'https://qiita.com/takubii/items/aa1f07f8ed2831dec21d',
    str: '参考リンク',
  },
  {
    id: 3,
    link: 'https://qiita.com/takubii/items/aa1f07f8ed2831dec21d',
    str: '参考リンク',
  },
]
const menuList = menuData.map((data, index) => (
  <li key={data.id}>
    <Link href={data.link}>{data.str}</Link>
  </li>
))

export const TemplateHeader = (props: Props) => {
  // スライドするメニュー S
  // https://qiita.com/takubii/items/aa1f07f8ed2831dec21d
  // 参考
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => {
    const sidebar = document.querySelector('.sidebar')
    if (!menuOpen) {
      sidebar.style.display = 'block'
      // setMenuOpen(true)
      setTimeout(() => {
        setMenuOpen(true)
      }, 10)
    } else {
      setMenuOpen(false)
    }
  }
  const closeMenu = () => {
    setMenuOpen(false)
  }
  useEffect(() => {
    const sidebar = document.querySelector('.sidebar')
    const handleTransitionEnd = () => {
      if (!menuOpen) {
        sidebar.style.display = 'none'
      }
    }
    sidebar.addEventListener('transitionend', handleTransitionEnd)

    return () => {
      sidebar.removeEventListener('transitionend', handleTransitionEnd)
    }
  }, [menuOpen])
  // スライドするメニュー E
  return (
    <header className="sticky left-0 top-0 w-[100%]">
      <nav>
        <div className="relative bg-header md:h-[50px] h-[70px] items-center flex">
          <GiKiwiBird size="3rem" />
          <h3 className="logo-wrapper">
            <img
              className="logo-img"
              src="http://www.guitar-planet.co.uk/wp-content/uploads/2015/12/logo-Vintage.png"
            />
          </h3>
          <ul className="grid parent w-full">
            {/* <li className="nav-item justify-center items-center"> */}
            <li className="nav-item div1">
              <Link className="h-full w-full flex justify-center items-center" href="new">
                new
              </Link>
            </li>
            <li className="nav-item div2">
              <Link className="h-full w-full flex justify-center items-center" href="new2">
                new2
              </Link>
            </li>
            <li className="nav-item div3">
              <Link className="h-full w-full flex justify-center items-center" href=".">
                Three
              </Link>
            </li>
            <li className="nav-item div4">
              <Link className="h-full w-full flex justify-center items-center" href=".">
                Four
              </Link>
            </li>
            <li className="nav-item div5">
              <Link className="h-full w-full flex justify-center items-center" href=".">
                Five
              </Link>
            </li>
            <li className="nav-item div10">
              <Link className="h-full w-full flex justify-center items-center" href=".">
                Etc.
              </Link>
            </li>
          </ul>
        </div>
        <div className=" md:h-[50px] h-[70px] bg-title items-center flex">
          <GiHamburgerMenu size="2.5rem" onClick={toggleMenu} />
          <div className="md:hidden">タブレット判定です</div>
        </div>
        {/* スライドするメニュー S */}
        {menuOpen && <div className="overlay" onClick={closeMenu}></div>}
        <div className={`sidebar ${menuOpen ? 'open' : ''}`} style={{ display: 'none' }}>
          {/* <div className={`sidebar ${menuOpen ? 'open' : ''}`}> */}
          <div className="hamburger-menu-close" onClick={toggleMenu}>
            <i className="bi bi-x-lg">スライドメニュー</i>
          </div>
          <ul>{menuList}</ul>
        </div>{' '}
        {/* スライドするメニュー E */}
      </nav>
    </header>
  )
}
