import * as React from 'react'
import { hot } from 'react-hot-loader/root'

export interface Props {}

export interface State {}

class App extends React.Component<Props, State> {
  public render () {
    return <div>Hello world</div>
  }
}

export default hot(App)
