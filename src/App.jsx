import './App.css'
import CommandPalette from './components/Commandpalette'
import Example from './components/Example'

function App() {
  const options = [
    {"id": "1", "title": "Crear un nuevo elemento"}, {"id": "2", "title": "Editar un elemento"}, {"id": "3", "title": "Borrar un elemento"}]
  return (
    <>
    <CommandPalette options={options}/>
    {/* <Example/> */}
    <h1 className="text-3xl font-bold underline">Command Pallete</h1>
    </>
  )
}

export default App
