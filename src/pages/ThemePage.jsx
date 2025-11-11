import React from 'react'
import { useTheme } from '../context/ThemeContext'

export const ThemePage = () => {
  const { theme, setTheme } = useTheme();
  setTheme('Vikram Bajwa');
  return (
    <div>
      ThemePage
      <h2>{theme}</h2>
    </div>
    
  )
}
