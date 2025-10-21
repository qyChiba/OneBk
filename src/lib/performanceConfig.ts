// 性能配置工具

export interface PerformanceConfig {
  enableParticles: boolean
  enableStarField: boolean
  enableGeometricShapes: boolean
  enableFloatingElements: boolean
  enableWaveBackground: boolean
  enableRotatingCube: boolean
  particleCount: 'low' | 'medium' | 'high'
  animationQuality: 'low' | 'medium' | 'high'
}

export function detectPerformance(): PerformanceConfig {
  if (typeof window === 'undefined') {
    return getDefaultConfig()
  }

  const isMobile = window.innerWidth < 768
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
  const cores = navigator.hardwareConcurrency || 4
  const isLowEnd = cores < 4
  
  // 检测设备内存（如果支持）
  const memory = (navigator as any).deviceMemory || 4
  const isLowMemory = memory < 4

  // 移动端配置
  if (isMobile) {
    return {
      enableParticles: true,
      enableStarField: false,
      enableGeometricShapes: true,
      enableFloatingElements: true,
      enableWaveBackground: true,
      enableRotatingCube: false,
      particleCount: 'low',
      animationQuality: 'low'
    }
  }

  // 平板配置
  if (isTablet) {
    return {
      enableParticles: true,
      enableStarField: true,
      enableGeometricShapes: true,
      enableFloatingElements: true,
      enableWaveBackground: true,
      enableRotatingCube: false,
      particleCount: 'medium',
      animationQuality: 'medium'
    }
  }

  // 低端设备配置
  if (isLowEnd || isLowMemory) {
    return {
      enableParticles: true,
      enableStarField: true,
      enableGeometricShapes: true,
      enableFloatingElements: false,
      enableWaveBackground: true,
      enableRotatingCube: false,
      particleCount: 'medium',
      animationQuality: 'medium'
    }
  }

  // 高端桌面配置
  return {
    enableParticles: true,
    enableStarField: true,
    enableGeometricShapes: true,
    enableFloatingElements: true,
    enableWaveBackground: true,
    enableRotatingCube: true,
    particleCount: 'high',
    animationQuality: 'high'
  }
}

function getDefaultConfig(): PerformanceConfig {
  return {
    enableParticles: true,
    enableStarField: true,
    enableGeometricShapes: true,
    enableFloatingElements: true,
    enableWaveBackground: true,
    enableRotatingCube: false,
    particleCount: 'medium',
    animationQuality: 'medium'
  }
}

// 获取粒子数量配置
export function getParticleCount(quality: 'low' | 'medium' | 'high', area: number): number {
  const densityMap = {
    low: 40000,
    medium: 25000,
    high: 18000
  }
  
  const maxMap = {
    low: 20,
    medium: 35,
    high: 50
  }
  
  return Math.min(Math.floor(area / densityMap[quality]), maxMap[quality])
}

// FPS 监控（开发用）
export function startFPSMonitor(callback: (fps: number) => void) {
  let lastTime = performance.now()
  let frames = 0

  function tick() {
    frames++
    const currentTime = performance.now()
    
    if (currentTime >= lastTime + 1000) {
      const fps = Math.round((frames * 1000) / (currentTime - lastTime))
      callback(fps)
      frames = 0
      lastTime = currentTime
    }
    
    requestAnimationFrame(tick)
  }
  
  requestAnimationFrame(tick)
}

