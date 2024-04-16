import { themeBg, themeC, themeTransparent } from '@/utilty/const'
import { handleClientScriptLoad } from 'next/script'
import React, { useEffect, useState } from 'react'

const colors = [
  { name: 'Black', code: '#000000' },
  { name: 'White', code: '#FFFFFF' },
  { name: 'Gray', code: '#808080' },
  { name: 'Red', code: '#FF0000' },
  { name: 'Blue', code: '#0000FF' },
  { name: 'Green', code: '#008000' },
  { name: 'Yellow', code: '#FFFF00' },
  { name: 'Orange', code: '#FFA500' },
  { name: 'Purple', code: '#800080' },
  { name: 'Pink', code: '#FFC0CB' },
  { name: 'Brown', code: '#A52A2A' },
  { name: 'Beige', code: '#F5F5DC' },
  { name: 'Navy', code: '#000080' },
  { name: 'Teal', code: '#008080' },
  { name: 'Maroon', code: '#800000' },
  { name: 'Olive', code: '#808000' },
  { name: 'Cyan', code: '#00FFFF' },
  { name: 'Magenta', code: '#FF00FF' },
  { name: 'Turquoise', code: '#40E0D0' },
  { name: 'Lime', code: '#00FF00' },
  { name: 'Indigo', code: '#4B0082' },
  { name: 'Violet', code: '#8A2BE2' },
  { name: 'Aqua', code: '#00FFFF' },
  { name: 'Silver', code: '#C0C0C0' },
  { name: 'Gold', code: '#FFD700' }
]

const Colors = ({ selectedColors, handleClick }) => {
  const [loaded, setLoaded] = useState(false)
  const [productColors, setProductColors] = useState(
    colors.slice(0, colors.length / 2)
  )

  useEffect(() => {
    loaded
      ? setProductColors(colors)
      : setProductColors(colors.slice(0, colors.length / 2))
  }, [loaded])

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
      {productColors.map((c, index) => (
        <div
          style={{
            display: 'flex',
            gap: '5px',
            border: '1px solid lightgrey',
            borderRadius: '5px',
            padding: '3px',
            cursor: 'pointer',
            background: `${
              selectedColors?.split(',').find(i => i == c.name)
                ? `${themeTransparent}`
                : ''
            }`,
            border: `${
              selectedColors?.split(',').find(i => i == c.name)
                ? `1.5px solid ${themeC}`
                : '1px solid lightgrey'
            }`
          }}
          key={index}
          onClick={() => handleClick(c.name)}
        >
          <div
            style={{
              background: `${c.code}`,
              minWidth: '18px',
              minHeight: '10px',
              borderRadius: '5px'
            }}
          ></div>
          <span>{c.name}</span>
        </div>
      ))}
      <div
        style={{
          display: 'flex',
          gap: '5px',
          border: '1px solid lightgrey',
          borderRadius: '5px',
          padding: '3px 7px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '100%',
          background: `${themeBg}`,
          color: 'white'
        }}
        onClick={() => setLoaded(prev => !prev)}
      >
        {loaded ? '-' : '+'}
      </div>
    </div>
  )
}

export default Colors
