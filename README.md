# Musical Keyboard

Musical keyboard component written in React.

## Installation

This component is currently available in:

* [Modal.sh JavaScript Package Registry](https://js.pack.modal.sh)
* [npm](https://npmjs.com)
* [GitHub Package Registry](https://github.com/Temoto-kun/react-musical-keyboard/packages) for the [Github mirror](https://github.com/Temoto-kun/react-musical-keyboard)

Once set up, install the package from the registry:

```shell script
yarn add @theoryofnekomata/react-musical-keyboard
```

## Usage

Basic usage is as follows, rendering the keyboard range of a modern grand piano (88 keys, from A0 to C8):

```jsx harmony
import * as React from 'react'
import ReactDOM from 'react-dom'
import Keyboard from '@theoryofnekomata/react-musical-keyboard'

const App = () => {
  return (
    <div>
      <Keyboard
        startKey={21}
        endKey={108}
      />
    </div>
  )
}

const container = window.document.createElement('div')

window.document.body.appendChild(container)

ReactDOM.render(<App />, container)
```

The library also supports keyboard maps for handling mouse, touch, and keyboard events:

```jsx harmony
import * as React from 'react'
import ReactDOM from 'react-dom'
import Keyboard, { KeyboardMap } from '@theoryofnekomata/react-musical-keyboard'

const App = () => {
  const handleKeysChange = keys => {
    // TODO handle key change: send MIDI events, play audio samples, etc.
  }

  return (
    <div>
      <Keyboard
        startKey={21}
        endKey={108}
      >
        <KeyboardMap
          channel={0}
          onChange={handleKeysChange}
        />
      </Keyboard>
    </div>
  )
}

const container = window.document.createElement('div')

window.document.body.appendChild(container)

ReactDOM.render(<App />, container)
```

The component is stylable, just supply custom components for the keys:

```jsx harmony
import * as React from 'react'
import ReactDOM from 'react-dom'
import Keyboard from '@theoryofnekomata/react-musical-keyboard'
import NaturalKey from './my-styled-keys/NaturalKey'
import AccidentalKey from './my-styled-keys/AccidentalKey'

const App = () => {
  return (
    <div>
      <Keyboard
        startKey={21}
        endKey={108}
        keyComponents={{
          natural: NaturalKey,
          accidental: AccidentalKey
        }}
      />
    </div>
  )
}

const container = window.document.createElement('div')

window.document.body.appendChild(container)

ReactDOM.render(<App />, container)
```

Custom keys should accept a `keyChannels` prop for active keys. For instance, in the custom key components imported above:

```jsx harmony
// ./my-styled-keys/NaturalKey.js

import * as React from 'react'
import NOT_PRESSED_KEY from './not-pressed.png'
import PRESSED_KEY_OVERLAY from './pressed-overlay.png'

const NaturalKey = ({
  keyChannels = []
}) => {
  return (
    <div>
      <img src={NOT_PRESSED_KEY} alt="" />
      {keyChannels.map(k => (
        <img key={k.channel} src={PRESSED_KEY_OVERLAY} alt="" />
      ))}
    </div>
  )
}

export default NaturalKey
```

Take note that pressed keys from multiple channels might overlap, therefore it is advisable to support multiple channels
pressing a single key at once.

## License

MIT. See [License file](./LICENSE) for details.
