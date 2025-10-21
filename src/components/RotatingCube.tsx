'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface Point3D {
  x: number
  y: number
  z: number
}

interface Face {
  points: number[]
  color: string
}

export default function RotatingCube() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rotationRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 400
    canvas.height = 400

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const size = 80

    // 立方体顶点
    const vertices: Point3D[] = [
      { x: -size, y: -size, z: -size },
      { x: size, y: -size, z: -size },
      { x: size, y: size, z: -size },
      { x: -size, y: size, z: -size },
      { x: -size, y: -size, z: size },
      { x: size, y: -size, z: size },
      { x: size, y: size, z: size },
      { x: -size, y: size, z: size },
    ]

    // 立方体面
    const faces: Face[] = [
      { points: [0, 1, 2, 3], color: 'rgba(0, 212, 255, 0.7)' },
      { points: [4, 5, 6, 7], color: 'rgba(34, 211, 238, 0.7)' },
      { points: [0, 1, 5, 4], color: 'rgba(56, 189, 248, 0.7)' },
      { points: [2, 3, 7, 6], color: 'rgba(251, 146, 60, 0.7)' },
      { points: [0, 3, 7, 4], color: 'rgba(251, 191, 36, 0.7)' },
      { points: [1, 2, 6, 5], color: 'rgba(16, 185, 129, 0.7)' },
    ]

    // 3D 投影函数
    const project = (point: Point3D): { x: number; y: number } => {
      const cosX = Math.cos(rotationRef.current.x)
      const sinX = Math.sin(rotationRef.current.x)
      const cosY = Math.cos(rotationRef.current.y)
      const sinY = Math.sin(rotationRef.current.y)

      // 绕 X 轴旋转
      let y = point.y * cosX - point.z * sinX
      let z = point.y * sinX + point.z * cosX
      const x1 = point.x

      // 绕 Y 轴旋转
      const x = x1 * cosY + z * sinY
      z = -x1 * sinY + z * cosY

      // 透视投影
      const scale = 300 / (300 + z)
      return {
        x: centerX + x * scale,
        y: centerY + y * scale,
      }
    }

    const drawCube = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 计算每个面的平均 Z 值用于排序
      const sortedFaces = faces.map(face => {
        const avgZ = face.points.reduce((sum, idx) => {
          const projected = vertices[idx]
          const cosX = Math.cos(rotationRef.current.x)
          const sinX = Math.sin(rotationRef.current.x)
          const cosY = Math.cos(rotationRef.current.y)
          const sinY = Math.sin(rotationRef.current.y)
          
          const y = projected.y * cosX - projected.z * sinX
          const z = projected.y * sinX + projected.z * cosX
          const x = projected.x * cosY + z * sinY
          const finalZ = -projected.x * sinY + z * cosY
          
          return sum + finalZ
        }, 0) / face.points.length

        return { face, avgZ }
      }).sort((a, b) => a.avgZ - b.avgZ)

      // 绘制面
      sortedFaces.forEach(({ face }) => {
        ctx.beginPath()
        
        face.points.forEach((pointIdx, i) => {
          const projected = project(vertices[pointIdx])
          if (i === 0) {
            ctx.moveTo(projected.x, projected.y)
          } else {
            ctx.lineTo(projected.x, projected.y)
          }
        })
        
        ctx.closePath()
        ctx.fillStyle = face.color
        ctx.fill()
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 2
        ctx.stroke()
      })

      // 绘制顶点
      vertices.forEach(vertex => {
        const projected = project(vertex)
        ctx.beginPath()
        ctx.arc(projected.x, projected.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.fill()
      })
    }

    // GSAP 动画
    gsap.to(rotationRef.current, {
      x: Math.PI * 2,
      y: Math.PI * 2,
      duration: 10,
      repeat: -1,
      ease: 'none',
      onUpdate: drawCube
    })

    drawCube()
  }, [])

  return (
    <div className="fixed top-20 right-10 pointer-events-none z-10 hidden lg:block opacity-60">
      <canvas ref={canvasRef} className="drop-shadow-2xl" />
    </div>
  )
}

