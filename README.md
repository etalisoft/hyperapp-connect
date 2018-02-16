# Hyperapp Connect

=====

Create connected components for [<img height=15 src=https://cdn.rawgit.com/JorgeBucaran/f53d2c00bafcf36e84ffd862f0dc2950/raw/882f20c970ff7d61aa04d44b92fc3530fa758bc0/Hyperapp.svg> Hyperapp](https://github.com/hyperapp/hyperapp).

## Installation

Install with npm or Yarn.

```
npm i -S hyperapp-connect
```

## Overview

Below is a contrived Hyperapp application.

```js
import { h, app } from 'hyperapp';

const state = {
  message: 'Hello!',
};

const actions = {
  setMessage: message => state => ({ message }),
};

// NOTE: We want to display state.message in the footer.
const Footer = (props, children) => <footer />;
const Section = (props, children) => <section><Footer /></section>;
const Content = (props, children) => <div><Section /></div>;
const Main = (props, children) => <main><Content /></main>;

const view = (state, actions) => <Main />;
app(state, actions, view, document.body);
```

The `Footer` component would like to display the `state.message`, but it did not receive the value from it's parent. We _could_ update the `view` to pass the state down to `Main`, and then update `Main` to pass down the state to `Content`, and then update `Content` to pass down the state to `Footer`.  This prop chainging can be avoided with hyperapp-connect.

## Usage
**Step 1:** Import connect
```js
import { connect } from 'hyperapp-connect';
```

**Step 2:** Create a connected app
```js
const { hoa } = connect('example');
hoa(app)(state, actions, view, document.body);
```

**Step 3:** Change Footer to be a connected component
```js
// Notice the component now receives the state and actions as additional parameters
const ConnectedFooter = (props, children, state, actions) => <footer>{state.message}</footer>;
const Footer = connect('example')(ConnectedFooter);
```
