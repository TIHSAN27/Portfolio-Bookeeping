'use client'
import { useEffect, useRef, useState } from 'react'

const BASE_PHOTO = '/assets/imgs/profile/taimoor-cutout.png'
// Ordered far-left → center → far-right; when filled, the head turns with the cursor.
const HEAD_FRAMES: string[] = []

export default function CursorPortrait() {
	const cardRef = useRef<HTMLDivElement>(null)
	const target = useRef({ x: 0, y: 0 })
	const current = useRef({ x: 0, y: 0 })
	const [frame, setFrame] = useState(Math.floor(HEAD_FRAMES.length / 2))

	useEffect(() => {
		HEAD_FRAMES.forEach((src) => {
			const img = new Image()
			img.src = src
		})

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

		const onMove = (e: MouseEvent) => {
			const card = cardRef.current
			if (!card) return
			const rect = card.getBoundingClientRect()
			const cx = rect.left + rect.width / 2
			const cy = rect.top + rect.height / 2
			const dx = e.clientX - cx
			const dy = e.clientY - cy
			const spanX = dx > 0 ? window.innerWidth - cx : cx
			const spanY = dy > 0 ? window.innerHeight - cy : cy
			target.current.x = Math.max(-1, Math.min(1, dx / Math.max(spanX, 1)))
			target.current.y = Math.max(-1, Math.min(1, dy / Math.max(spanY, 1)))
		}

		let raf = 0
		const tick = () => {
			const c = current.current
			const t = target.current
			c.x += (t.x - c.x) * 0.08
			c.y += (t.y - c.y) * 0.08

			const card = cardRef.current
			if (card) {
				card.style.setProperty('--rx', `${(-c.y * 8).toFixed(2)}deg`)
				card.style.setProperty('--ry', `${(c.x * 14).toFixed(2)}deg`)
				card.style.setProperty('--gx', `${(50 + c.x * 40).toFixed(1)}%`)
				card.style.setProperty('--gy', `${(50 + c.y * 40).toFixed(1)}%`)
				card.style.setProperty('--px', `${(c.x * 10).toFixed(2)}px`)
			}

			if (HEAD_FRAMES.length > 1) {
				const idx = Math.round(((c.x + 1) / 2) * (HEAD_FRAMES.length - 1))
				setFrame((prev) => (prev === idx ? prev : idx))
			}

			raf = requestAnimationFrame(tick)
		}

		window.addEventListener('mousemove', onMove)
		raf = requestAnimationFrame(tick)
		return () => {
			window.removeEventListener('mousemove', onMove)
			cancelAnimationFrame(raf)
		}
	}, [])

	const src = HEAD_FRAMES.length ? HEAD_FRAMES[frame] : BASE_PHOTO

	return (
		<div className="cursor-portrait" style={{ perspective: 1000 }}>
			<div ref={cardRef} className="cursor-portrait__card">
				<img src={src} alt="Muhammad Taimoor Ihsan" className="cursor-portrait__photo" draggable={false} />
				<div className="cursor-portrait__glare" />
				<div className="cursor-portrait__badge cursor-portrait__badge--top">
					<i className="ri-vip-crown-fill" /> 100% Job Success
				</div>
				<div className="cursor-portrait__badge cursor-portrait__badge--bottom">
					<i className="ri-shield-check-fill" /> QuickBooks ProAdvisor
				</div>
			</div>
		</div>
	)
}
