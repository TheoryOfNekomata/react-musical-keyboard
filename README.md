# Musical Keyboard

Musical keyboard component written in React.

## Installation

```shell script
yarn add @theoryofnekomata/react-musical-keyboard
```

## Usage

```jsx harmony
import * as React from 'react'
import ReactDOM from 'react-dom'
import Keyboard from '@theoryofnekomata/react-musical-keyboard'

const App = () => {
  return (
    <div>
      <Keyboard startKey={21} endKey={108}/>
    </div>
  )
}

const container = window.document.createElement('div')

ReactDOM.render(<App />, container)

window.document.body.appendChild(container)
```

## License

MIT. See [License file](./LICENSE) for details.
