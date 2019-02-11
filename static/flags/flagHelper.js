import React from 'react'
const flags = require.context('./4x3', false, /.*\.svg$/)

export function getFlag(name, width, height){
  const flag = flags(`./${name}.svg`)
  return (
  <img src={flag} width={width} height={height} />
  )
}

