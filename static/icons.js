import React from 'react'

export const ICONS = {
PERSON: "M256 213c57 0 171 -28 171 -85v-43h-342v43c0 57 114 85 171 85zM256 256c-47 0 -85 38 -85 85s38 86 85 86s85 -39 85 -86s-38 -85 -85 -85z"
}

const SVG = props => (
  <svg {...props} viewBox="0 0 1024 1024">
    <path d={props.path}></path>
  </svg>
)

const FlipSVGIcon = props => (
  <i className="icon" style={{"transform": "rotate(180deg)" }}>
    <svg {...props} viewBox="0 0 1024 1024">
      <path d={props.path}></path>
    </svg>
  </i>
)

const SVGIcon = props => (
  <i className="icon">
    <svg {...props} viewBox="0 0 1024 1024">
      <path d={props.path}></path>
    </svg>
  </i>
)

export { FlipSVGIcon, SVGIcon, SVG }