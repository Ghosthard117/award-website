'use client'
import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'

type VideoPreviewProps = {
  children?: React.ReactNode
}

const VideoPreview = ({ children }: VideoPreviewProps) => {
  const [isHovering, setIsHovering] = useState(false)

  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event
    const rect = event.currentTarget.getBoundingClientRect()
    const xOffset = clientX - (rect.left + rect.width / 2)
    const yOffset = clientY - (rect.top + rect.height / 2)

    if (isHovering) {
      // Move the container slightly in the direction of the cursor
      gsap.to(sectionRef.current, {
        x: xOffset,
        y: yOffset,
        rotationY: xOffset / 2,
        rotationX: -yOffset / 2,
        transformPerspective: 500,
        duration: 1,
        ease: 'power2.out',
      })

      // Move the inner content in the opposite direction for a parallax effect
      gsap.to(contentRef.current, {
        x: -xOffset,
        y: -yOffset,
        duration: 1,
        ease: 'power2.out'
      })
    }
  }

  // Reset the position of the content when hover ends
  useEffect(() => {
    if (!isHovering) {
      gsap.to(sectionRef.current, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 1,
        ease: 'power2.out',
      })

      gsap.to(contentRef.current, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      })
    }
  }, [isHovering])

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        perspective: '500px'
      }}
      className='absolute z-50 size-full overflow-hidden rounded-lg'
    >
      <div
        ref={contentRef}
        style={{
          transformStyle: 'preserve-3d'
        }}
        className='origin-center rounded-lg'
      >
        {children}
      </div>
    </section>
  )
}

export default VideoPreview