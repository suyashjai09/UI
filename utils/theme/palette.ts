import { type PaletteMode } from '@mui/material'
import { type PaletteOptions } from '@mui/material/styles'
import { color } from '@mui/system'
export const colors = {
    primaryBackground: '#163A90',
    backgroundWhite: '#FFFFFF',
    primaryWhite: '#FFFFFF',
    primaryBlack: '#000000',
    primaryBlue: '#306FBC',
    primaryText: '#212121',
    primaryError: '#E13A3A',
    primarySuccess: '#42AE40',
    primaryInactive: '#828282',
    secondaryError: '#F3C6C6',
    secondarySuccess: '#C6F3D2',
    secondaryInactive: '#E3E3E3',
    secondaryBackground: '#F9F9F9',
    shadow: 'rgba(48, 111, 188, 0.2)'
}
export const createPalette = (mode: PaletteMode): PaletteOptions => ({
    background: {
      default: colors.primaryBackground,
    },
    primary: {
      main: colors.primaryBlue,
      contrastText: colors.primaryWhite,
    },
    common: {
      white: colors.primaryWhite,
      black: colors.primaryBlack
    },
    secondary: {
      main: colors.shadow,
      light: colors.secondaryBackground,
    },
    error: {
      main: colors.primaryError,
      light: colors.secondaryError,
    },
    success: {
      main: colors.primarySuccess,
      light: colors.secondarySuccess,
    },
})