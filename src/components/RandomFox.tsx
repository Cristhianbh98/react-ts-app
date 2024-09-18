import { useRef, useEffect, useState } from "react"
import type { ImgHTMLAttributes } from "react"

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  onLazyLoad?: (img: HTMLImageElement) => void
}

const LazyImage = ({src, onLazyLoad, ...props}: Props): JSX.Element => {
  const [isLazyLoaded, setIsLazyLoaded] = useState<boolean>(false)
  const [image, setImage] = useState<string>('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=')
  const node = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (isLazyLoaded) return

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || !node.current) return

        setImage(src)
        observer.disconnect()
        if (typeof onLazyLoad === 'function') onLazyLoad(node.current)
        setIsLazyLoaded(true)
      })
    })
    
    if (node.current) observer.observe(node.current)

    return () => observer.disconnect()
  }, [src, onLazyLoad, isLazyLoaded])

  return (
    <div>
      <img {...props} ref={node} src={image}/>
    </div>
  )
}

export default LazyImage
