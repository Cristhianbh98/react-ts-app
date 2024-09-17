type Props = {
  img: string
  alt?: string
}

const RandomFox = ({img, alt = ''}: Props): JSX.Element => {
  return (
    <div>
      <img src={img} width={320} height='auto' className="rounded" alt={alt}/>
    </div>
  )
}

export default RandomFox
