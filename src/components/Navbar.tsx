'use client'
import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import { useWindowScroll } from 'react-use'
import { Logo } from '../../public/img'
import Button from './Button'
import { TiLocationArrow } from 'react-icons/ti'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

const navItems: string[] = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact']

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false)
  const [isIndicatorActive, setIsIndicatorActive] = useState<boolean>(false)

  const audioElementRef = useRef<HTMLAudioElement | null>(null)
  const navContainerRef = useRef<HTMLDivElement | null>(null)

  const { y: currentScrollY } = useWindowScroll()
  const [isNavVisible, setIsNavVisible] = useState<boolean>(false)
  const [lastScrollY, setLastScrollY] = useState<number>(0)

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev)
    setIsIndicatorActive((prev) => !prev)
  }

  // Manage audio playback
  useEffect(() => {
    if (isAudioPlaying && audioElementRef.current) {
      audioElementRef.current.play()
    } else if (audioElementRef.current) {
      audioElementRef.current.pause()
    }
  }, [isAudioPlaying])

  // Manage navbar floating status
  useEffect(() => {
    // Topmost position: show navbar without floating-nav
    if (currentScrollY === 0) {
      setIsNavVisible(true)
      navContainerRef.current?.classList.remove('floating-nav')
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false)
      navContainerRef.current?.classList.add('floating-nav')
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true)
      navContainerRef.current?.classList.add('floating-nav')
    }
  }, [currentScrollY, lastScrollY])

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2
    })
  }, [isNavVisible])

  return (
    <div
      ref={navContainerRef}
      className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'
    >
      <header
        className='absolute top-1/2 w-full -translate-y-1/2'
      >
        <nav className='flex size-full items-center justify-between p-4'>
          {/* Logo and Product button */}
          <div className='flex items-center gap-7'>
            <Image
              src={Logo}
              alt='Logo'
              className='w-10'
            />

            <Button
              id='product-button'
              title='Products'
              rightIcon={<TiLocationArrow />}
              containerClass='bg-blue-500 md:flex hidden items-center justify-center gap-1'
            />
          </div>

          {/* Navigation Links and Audio Button */}
          <div className='flex h-full items-center'>
            <div className='hidden md:block'>
              {navItems.map((link, idx) => (
                <Link
                  key={idx}
                  href={`#${link.toLowerCase()}`}
                  className='nav-hover-btn'
                >
                  {link}
                </Link>
              ))}
            </div>

            <button
              onClick={toggleAudioIndicator}
              className='ml-10 flex items-center space-x-0.5'
            >
              <audio
                ref={audioElementRef}
                className='hidden'
                src='/audio/loop.mp3'
                loop
              />

              {[1, 2, 3, 4,].map((bar) => (
                <div
                  key={bar}
                  className={clsx('indicator-line', {
                    active: isIndicatorActive
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`
                  }}
                ></div>
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar