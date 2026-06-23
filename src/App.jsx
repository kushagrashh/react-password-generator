import { useCallback, useState, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(18)
  const [numberAllowed, setNumberAllowed] = useState(true)
  const [charAllowed, setCharAllowed] = useState(true)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+-=[]{}|;:,.<>?/~`"

    for(let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed])


  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  const copyToClipboard = () => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }

  return (
    <div className='w-full min-h-screen bg-gray-900 flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-gray-800 shadow-2xl rounded-lg px-6 py-8 text-white'>
        <h1 className='text-2xl font-semibold text-center mb-6'>Password generator</h1>
        
        {/* Password Input and Copy Button */}
        <div className='flex shadow-lg rounded-lg overflow-hidden mb-6'>
          <input 
            type="text"
            value={password}
            className='outline-none w-full py-3 px-4 bg-gray-100 text-gray-900 font-medium'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyToClipboard}
            className='outline-none bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 shrink-0 font-medium transition'
          >
            Copy
          </button>
        </div>

        {/* Slider and Checkboxes */}
        <div className='bg-gray-700 rounded-lg p-4'>
          <div className='flex items-center gap-4 mb-4'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer flex-1 accent-blue-500'
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          
          <div className='text-sm text-orange-400 font-medium mb-3'>
            Length: {length}
          </div>

          <div className='flex items-center gap-6 text-sm'>
            <div className='flex items-center gap-2'>
              <input
                type="checkbox"
                checked={numberAllowed}
                id="numberInput"
                className='cursor-pointer w-4 h-4'
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
              <label htmlFor="numberInput" className='text-orange-400 cursor-pointer'>Numbers</label>
            </div>

            <div className='flex items-center gap-2'>
              <input
                type="checkbox"
                checked={charAllowed}
                id="charInput"
                className='cursor-pointer w-4 h-4'
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <label htmlFor="charInput" className='text-orange-400 cursor-pointer'>Characters</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App