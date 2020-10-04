# Musical Keyboard

Musical keyboard component written in React.

## Installation

This component is currently available in:

* [Modal.sh JavaScript Package Registry](https://js.pack.modal.sh)
* [npm](https://npmjs.com)
* [GitHub Package Registry](https://npm.pkg.github.com)

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

### Interactivity

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
        onChange={handleKeysChange}
      />
    </div>
  )
}

const container = window.document.createElement('div')

window.document.body.appendChild(container)

ReactDOM.render(<App />, container)
```

It is capable of server-side rendering support, falling back to making the keys behave like links, checkboxes or radio buttons. Simply supply the `behavior` prop.

### Customization

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

Components get their styles from CSS. The custom property `--opacity-highlight` is responsible for toggling the active, or "pressed" state of the key, simply assign it to the `opacity` style of the component you want to show for active keys.

The library also exposes other custom properties: `--color-natural-key`, `--color-accidental-key`, and `--color-active-key` for basic coloring of the keys. You may expose your own properties for your custom key components.

```jsx harmony
// ./my-styled-keys/NaturalKey.js

import * as React from 'react'
import NOT_PRESSED_KEY from './not-pressed.png'
import PRESSED_KEY_OVERLAY from './pressed-overlay.png'

const NaturalKey = ({
  keyChannels = []
}) => {
  return (
    <div style={{ position: 'relative' }}>
      <img src={NOT_PRESSED_KEY} alt="" style={{ position: 'absolute', top: 0, left: 0, }} />
      <img src={PRESSED_KEY_OVERLAY} style={{ position: 'absolute', top: 0, left: 0, opacity: 'var(--opacity-highlight)', }} alt="" />
    </div>
  )
}

export default NaturalKey
```

Take note that pressed keys from multiple channels might overlap, therefore it is advisable to support multiple channels pressing a single key at once.

## License

MIT. See [License file](./LICENSE) for details.
