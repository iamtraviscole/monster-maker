import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions/index'

import * as MonsterEyes from '../MonsterFeatures/MonsterEyes'
import NewMonsterTemplate from './NewMonsterTemplate'

class NewMonsterEyes extends Component {
  render() {
    let eyesProps = {
      featureTypeDispatch: this.props.setEyesType,
      featureTypeHoverDispatch: this.props.setEyesTypeHover,
      featureFillDispatch: this.props.setEyesFill,
      features: MonsterEyes,
      monsterFeature: 'eyes',
      panelHeaderText: 'Eyes',
      bodyOutline: true,
      allowNoSelection: true
    }

    return (
      <NewMonsterTemplate {...eyesProps} />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEyesType: (eyesType) => dispatch(actions.setEyesType(eyesType)),
    setEyesTypeHover: (eyesTypeHover) => dispatch(actions.setEyesTypeHover(eyesTypeHover)),
    setEyesFill: (eyesFill) => dispatch(actions.setEyesFill(eyesFill))
  }
}

export default connect(null, mapDispatchToProps)(NewMonsterEyes)
