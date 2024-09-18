import { useRef, useEffect, useState } from "react"
import type { ImgHTMLAttributes } from "react"

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  onLazyLoad?: () => void
}

const LazyImage = ({src, onLazyLoad, ...props}: Props): JSX.Element => {
  const [image, setImage] = useState<string>('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=')
  const node = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('Visible')
          if (typeof onLazyLoad === 'function') onLazyLoad()
          setImage(src)
        }
      })
    })
    
    if (node.current) observer.observe(node.current)

    return () => observer.disconnect()
  }, [src])

  return (
    <div>
      <img {...props} ref={node} src={image}/>
    </div>
  )
}

export default LazyImage
