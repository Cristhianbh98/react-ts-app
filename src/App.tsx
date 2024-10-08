import { useState } from "react"
import { random } from "lodash"
import type { MouseEventHandler } from "react"
import LazyImage from "./components/RandomFox"

const getRandomNumber = (): number => {
  return random(1, 123)
}

const generateUniqueId = (): string => {
  return Math.random().toString(36).slice(2, 9);
}

function App() {
  const link = 'https://randomfox.ca/images/'
  const [images, setImages] = useState<IFoxItem[]>([])

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    const newItem: IFoxItem = {
      url: `${link}${getRandomNumber()}.jpg`,
      id: generateUniqueId()
    }

    setImages([...images, newItem])
    window.plausible('add_fox')
  }

  return (
    <main className="flex justify-center pt-4">
      <div>
        <h1 className="text-3xl font-bold underline">
          Hello Platzi!
        </h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>
          Agregar Zorro
        </button>
        {
          images.map(item => (
            <div key={item.id} className="p-4">
              <LazyImage 
                src={item.url} 
                width={300} 
                height='auto'
                onLazyLoad={(imgHTML) => console.log('Imagen', imgHTML)}
                />
            </div>
          ))
        }
      </div>
    </main>
  )
}

export default App
