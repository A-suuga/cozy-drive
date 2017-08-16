'use strict'

import React from 'react'
import renderer from 'react-test-renderer'

import Wizard from '../../../../src/targets/mobile/components/Wizard'
import { SelectServer } from '../../../../src/targets/mobile/containers/onboarding/SelectServer'
import { Welcome } from '../../../../src/targets/mobile/containers/onboarding/Welcome'

// used for ref issue in jest tests using react-test-renderer https://facebook.github.io/react/blog/2016/11/16/react-v15.4.0.html#mocking-refs-for-snapshot-testing
function createNodeMock (element) {
  if (element.type === 'input') {
    return {
      focus () {}
    }
  }
  return null
}

describe('Onboarding', () => {
  it('should render different components', () => {
    const options = {createNodeMock}
    const steps = [
      Welcome,
      SelectServer
    ]
    const component = renderer.create(
      <Wizard steps={steps} t={() => {}} />, options
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()

    tree.children[1].children[0].props.onClick()
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render the welcome screen', () => {
    const component = renderer.create(<Welcome t={() => {}} />)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render the SelectServer screen', () => {
    const options = {createNodeMock}
    const component = renderer.create(<SelectServer t={() => {}} />, options)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
