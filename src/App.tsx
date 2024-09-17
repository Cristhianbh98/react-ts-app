import RandomFox from "./components/RandomFox"

const getRandomNumber = (): number => {
  return Math.floor(Math.random() * 123) + 1;
}


function App() {
  return (
    <main>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <RandomFox img={`https://randomfox.ca/images/${getRandomNumber()}.jpg`} alt='Random'/>
    </main>
  )
}

export default App
