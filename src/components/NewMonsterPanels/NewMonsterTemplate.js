import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../../styles/NewMonsterPanels.css'

import ColorPicker from '../ColorPicker'
import * as MonsterBodies from '../MonsterFeatures/MonsterBodies'

class NewMonsterTemplate extends Component {

  handleClick = (event) => {
    // touch triggers onMouseEnter event and sets feature's hoverType but it
    //  doesn't get cleared because onMouseLeave doesn't fire. This clears it.
    if (this.props.monsterFeatures[this.props.monsterFeature].hoverType) {
      this.props.featureTypeHoverDispatch(null)
    }

    const featureSelection = event.currentTarget.dataset.featureSelection
    this.props.featureTypeDispatch(featureSelection)
  }

  handleNullClick = () => {
    this.props.featureTypeDispatch(null)
  }

  handleMouseEnter = (event) => {
    const featureSelectionHover = event.currentTarget.dataset.featureSelection
    this.props.featureTypeHoverDispatch(featureSelectionHover)
  }

  handleMouseLeave = () => {
    this.props.featureTypeHoverDispatch(null)
  }

  render () {
    const { monsterFeatures } = this.props

    const bodySvgStroke = {
      fillColor: '#ffffff',
      strokeColor: '#999999',
      strokeDasharray: '5',
      strokeWidth: '1'
    }

    const featureSvgStroke = {
      strokeColor: '#000000',
      strokeWidth: '1'
    }

    let featuresDivs = []

    if (this.props.allowNoSelection) {
      if (monsterFeatures[this.props.monsterFeature].type === null) {
        featuresDivs.push(
          <div className='NewMonsterPanels__features NewMonsterPanels__features--active'
            onClick={this.handleNullClick}
            key='noSelection'>
              <div className='NewMonsterPanels__features-check'>
                <i className="material-icons">
                  check
                </i>
              </div>
              <div className='NewMonsterPanels__features-null'>
                <i className="material-icons">
                  highlight_off
                </i>
                none
              </div>
          </div>
        )
      } else {
        featuresDivs.push(
          <div className='NewMonsterPanels__features'
            onClick={this.handleNullClick}
            key='noSelection'>
              <div className='NewMonsterPanels__features-null'>
                <i className="material-icons">
                  highlight_off
                </i>
                none
              </div>
          </div>
        )
      }
    }

    let MonsterBodyComponent = MonsterBodies[monsterFeatures.body.type]

    let bodyOutlineDiv = null
    if (monsterFeatures.body.type) {
      bodyOutlineDiv = (
        <div className='NewMonsterPanels__feature NewMonsterPanels__body'>
          <MonsterBodyComponent {...bodySvgStroke} />
        </div>
      )
    }

    for (const feature in this.props.features) {
      let Component = this.props.features[feature]
      if (monsterFeatures[this.props.monsterFeature].type === feature) {
        featuresDivs.push(
          <div className='NewMonsterPanels__features NewMonsterPanels__features--active'
            data-feature-selection={feature}
            onClick={this.handleClick}
            key={feature}>
            <div className={`NewMonsterPanels__feature NewMonsterPanels__${this.props.monsterFeature}`}>
              <div className='NewMonsterPanels__features-check'>
                <i className="material-icons">
                  check
                </i>
              </div>
              {monsterFeatures[this.props.monsterFeature].fillColor === '#ffffff'
                ? <Component fillColor={monsterFeatures[this.props.monsterFeature].fillColor}
                    {...featureSvgStroke} />
                : <Component fillColor={monsterFeatures[this.props.monsterFeature].fillColor} />
              }
            </div>
            {this.props.bodyOutline ? bodyOutlineDiv : null}
          </div>
        )
      } else {
        featuresDivs.push(<div className='NewMonsterPanels__features'
          data-feature-selection={feature}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
          key={feature}>
          <div className={`NewMonsterPanels__feature NewMonsterPanels__${this.props.monsterFeature}`}>
            {monsterFeatures[this.props.monsterFeature].fillColor === '#ffffff'
              ? <Component fillColor={monsterFeatures[this.props.monsterFeature].fillColor}
                  {...featureSvgStroke} />
              : <Component fillColor={monsterFeatures[this.props.monsterFeature].fillColor} />
            }
          </div>
          {this.props.bodyOutline ? bodyOutlineDiv : null}
        </div>)
      }
    }
    return (
      <div className='NewMonsterPanels__features-ctr'>
        <div className='NewMonsterPanels__features-inner-ctr'>
          <div className='NewMonsterPanels__color-picker'>
            <ColorPicker
              color={monsterFeatures[this.props.monsterFeature].fillColor}
              dispatchColor={this.props.featureFillDispatch} />
          </div>
          {featuresDivs}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    monsterFeatures: state.monster.monsterFeatures,
    svgStrokeStyle: state.svgStrokeStyle
  }
}

export default connect(mapStateToProps)(NewMonsterTemplate)
