import { RadioButtonCheckedTwoTone } from '@mui/icons-material';
import { outlinedInputClasses } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTheme } from 'data/hooks';
import { colors } from 'presentation/style/palette';
import type { FC, ReactNode } from 'react';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
  }
}
declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    isSelect: true;
    hide: true;
  }
}

interface Children {
  children: ReactNode;
}

export const MaterialUIProvider: FC<Children> = ({ children }: Children) => {
  const LightTheme = createTheme({
    components: {
      MuiButton: {
        defaultProps: {
          variant: 'contained'
        },
        styleOverrides: {
          root: {
            borderRadius: '4px',
            boxShadow: 'inset 0.1px 0.2px 0px 1px rgba(0,0,0,0.02) !important',
            color: 'white',
            fontSize: '16px',
            fontWeight: '500 !important',
            padding: '7.5px 16px',
            textTransform: 'capitalize'
          }
        },
        variants: [
          {
            props: { color: 'info' },
            style: {
              ':hover': { backgroundColor: colors.gray[200] },
              backgroundColor: colors.gray[150],
              // border: `1px solid ${colors.gray[150]}`,
              color: `${colors.gray[900]} !important`,
              svg: { color: colors.gray[900] }
            }
          },
          {
            props: { color: 'warning' },
            style: {
              ':hover': { backgroundColor: '#f9b11658' },
              backgroundColor: '#f9b11636',
              color: colors.primary
            }
          },
          {
            props: { color: 'success' },
            style: {}
          },
          {
            props: { variant: 'outlined' },
            style: {
              color: colors.primary,
              svg: {
                color: `${colors.primary} !important`
              }
            }
          },
          {
            props: { variant: 'contained' },
            style: {
              fontWeight: '700'
            }
          },
          {
            props: { color: 'error' },
            style: {
              ':hover': {
                backgroundColor: '#dfc7c7'
              },
              backgroundColor: '#FFE5E5',
              color: '#FF0000'
            }
          },
          {
            props: { size: 'large' },
            style: {
              minHeight: '48px'
            }
          },
          {
            props: { color: 'primary' },
            style: {
              svg: { color: colors.white }
            }
          }
        ]
      },
      MuiChip: {
        defaultProps: {
          variant: 'filled'
        },
        variants: [
          {
            props: { variant: 'filled' },
            style: {
              color: 'white'
            }
          }
        ]
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            justifyContent: 'start',
            margin: 0
          }
        }
      },
      MuiLinearProgress: {
        styleOverrides: {
          bar: {
            backgroundColor: colors.primary,
            borderRadius: '4px'
          },
          colorPrimary: {
            backgroundColor: colors.gray[150]
          },
          root: {
            borderRadius: '4px',
            height: '8px'
          }
        }
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            textTransform: 'capitalize'
          }
        }
      },
      MuiRadio: {
        defaultProps: {
          checkedIcon: <RadioButtonCheckedTwoTone />,
          color: 'default'
        },
        variants: [
          {
            props: { color: 'primary' },
            style: {
              svg: {
                circle: {
                  r: 6.5
                }
              }
            }
          },
          {
            props: { color: 'default' },
            style: {
              color: '#2B2B2B'
            }
          }
        ]
      },
      MuiSwitch: {
        defaultProps: {
          color: 'primary',
          style: {
            color: colors.white
          }
        },
        styleOverrides: {
          root: {
            '& .MuiSwitch-thumb': {
              boxShadow: 'none',
              height: 16,
              margin: 2,
              width: 16
            },
            '& .MuiSwitch-track': {
              background: '#dfdfdf',
              borderRadius: '999px',
              opacity: '1 !important'
            },
            '&.Mui-checked': {
              '& + .MuiSwitch-track': {
                backgroundColor: '#177ddc',
                opacity: 1
              },
              color: '#fff',
              transform: 'translateX(12px)'
            },
            padding: 8
          }
        }
      },
      MuiTableBody: {
        styleOverrides: {
          root: {
            backgroundColor: 'white'
          }
        }
      },
      MuiTextField: {
        defaultProps: {
          size: 'small'
        },
        styleOverrides: {
          root: {
            '& input:-webkit-autofill': {
              '-webkit-box-shadow': `0 0 0 1000px ${colors.white} inset !important`,
              '-webkit-text-fill-color': `${colors.gray[900]} !important`,
              WebkitBoxShadow: `0 0 0 1000px ${colors.white} inset`,
              WebkitTextFillColor: '#fff'
            },
            '.MuiInputAdornment-root': {
              marginRight: 0
            },
            '.MuiInputBase-input': {
              paddingLeft: '8px !important'
            },
            '.MuiInputBase-root': {
              backgroundColor: 'white',
              borderRadius: '4px',
              paddingLeft: '8px',
              paddingRight: '4px'
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#D1D5Dc '
            }
          }
        },
        variants: [
          {
            props: { variant: 'filled' },
            style: {
              '.MuiFilledInput-root': {
                backgroundColor: 'transparent !important'
              },
              '.MuiInputBase-root': {
                maxHeight: '40px !important'
              },
              ':hover': {
                backgroundColor: 'transparent'
              },
              input: {
                ':hover': {
                  backgroundColor: 'transparent'
                },
                active: {
                  backgroundColor: 'transparent'
                },
                padding: '8.5px 8px !important'
              },
              maxHeight: '40px'
            }
          }
        ]
      }
    },
    palette: {
      error: { main: colors.red },
      grey: colors.gray,
      info: { main: colors.info },
      primary: { main: colors.primary },
      secondary: { main: colors.secondary },
      success: { main: colors.success },
      warning: { main: colors.warning }
    },
    typography: { fontFamily: 'Montserrat' }
  });

  const DarkTheme = createTheme({
    components: {
      MuiAutocomplete: {
        styleOverrides: {
          noOptions: {
            backgroundColor: colors.gray[700],
            color: 'white !important'
          }
        }
      },
      MuiButton: {
        defaultProps: {
          variant: 'contained'
        },
        styleOverrides: {
          root: {
            borderRadius: '4px',
            color: 'white',
            fontSize: '16px',
            padding: '6px 16px',
            textTransform: 'capitalize'
          }
        },
        variants: [
          {
            props: { color: 'info' },
            style: {
              ':hover': { backgroundColor: colors.gray[200] },
              backgroundColor: colors.gray[125],
              boxShadow: '0',
              color: `${colors.gray[900]} !important`,
              svg: { color: colors.gray[900] }
            }
          },
          {
            props: { color: 'warning' },
            style: {
              ':hover': { backgroundColor: colors.gray[200] },
              backgroundColor: colors.gray[125],
              color: colors.primary
            }
          },
          {
            props: { color: 'success' },
            style: {
              ':hover': {
                backgroundColor: '#dbdada'
              },
              backgroundColor: colors.gray[300],
              color: colors.gray[900],
              svg: {
                color: colors.black
              }
            }
          },
          {
            props: { variant: 'outlined' },
            style: {
              color: colors.primary,
              svg: {
                color: colors.primary
              }
            }
          },
          {
            props: { variant: 'contained' },
            style: {
              ':hover': {
                backgroundColor: colors.gray[600]
              },
              backgroundColor: colors.gray[700],
              fontWeight: '700'
            }
          },
          {
            props: { color: 'error' },
            style: {
              ':hover': {
                backgroundColor: '#dfc7c7'
              },
              backgroundColor: '#FFE5E5',
              color: '#FF0000'
            }
          },
          {
            props: { size: 'large' },
            style: {
              minHeight: '48px'
            }
          },
          {
            props: { color: 'secondary' },
            style: {
              ':hover': {
                backgroundColor: colors.gray[200],
                borderColor: colors.gray[900]
              },
              backgroundColor: colors.white,
              borderColor: colors.gray[900],
              color: colors.primary,
              svg: { color: colors.primary }
            }
          },
          {
            props: { color: 'primary' },
            style: {
              svg: { color: colors.white }
            }
          }
        ]
      },
      MuiChip: {
        defaultProps: {
          variant: 'filled'
        },
        variants: [
          {
            props: { variant: 'filled' },
            style: {
              color: 'white'
            }
          }
        ]
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            textTransform: 'capitalize'
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: 'var(--TextField-brandBorderColor)'
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderHoverColor)'
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderFocusedColor)'
            },
            color: 'white'
          }
        }
      },
      MuiRadio: {
        defaultProps: {
          checkedIcon: <RadioButtonCheckedTwoTone />,
          color: 'default'
        },
        variants: [
          {
            props: { color: 'primary' },
            style: {
              svg: {
                circle: {
                  r: 6.5
                }
              }
            }
          },
          {
            props: { color: 'default' },
            style: {
              color: '#2B2B2B'
            }
          }
        ]
      },
      MuiSwitch: {
        defaultProps: {
          color: 'primary',
          style: {
            color: colors.white
          }
        },
        styleOverrides: {
          root: {
            '& .MuiSwitch-thumb': {
              boxShadow: 'none',
              height: 16,
              margin: 2,
              width: 16
            },
            '& .MuiSwitch-track': {
              background: '#767676',
              borderRadius: '999px',
              opacity: '1 !important'
            },
            '&.Mui-checked': {
              '& + .MuiSwitch-track': {
                backgroundColor: '#177ddc',
                opacity: 1
              },
              color: '#fff',
              transform: 'translateX(12px)'
            },
            padding: 8
          }
        }
      },
      MuiTableBody: {
        styleOverrides: {
          root: {
            backgroundColor: colors.gray[700]
          }
        }
      },
      MuiTextField: {
        defaultProps: {
          size: 'small'
        },
        styleOverrides: {
          root: {
            '& input:-webkit-autofill': {
              '-webkit-box-shadow': `0 0 0 1000px ${colors.gray[700]} inset !important`,
              '-webkit-text-fill-color': `${colors.white} !important`,
              WebkitBoxShadow: `0 0 0 1000px ${colors.gray[700]} inset`,
              WebkitTextFillColor: '#fff'
            },
            '& label': {
              color: 'var(--TextField-brandBorderFocusedColor)',
              zIndex: '100'
            },
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)',
              zIndex: '100'
            },
            '--TextField-brandBorderColor': '#E0E3E7',
            '--TextField-brandBorderFocusedColor': '#eeeeee',
            '--TextField-brandBorderHoverColor': '#B2BAC2',
            '.MuiAutocomplete-endAdornment': {
              '.MuiButtonBase-root': {
                color: 'white !important'
              }
            },
            '.MuiInputAdornment-root': {
              marginRight: 0
            },
            '.MuiInputBase-input': {
              paddingLeft: '8px !important'
            },
            '.MuiInputBase-root': {
              backgroundColor: colors.gray[700],
              borderRadius: '4px',
              paddingLeft: '8px',
              paddingRight: '4px'
            },
            'input:-internal-autofill-selected': {
              backgroundColor: 'red !important'
            },
            svg: {
              color: 'white'
            }
          }
        }
      }
    },
    palette: {
      error: { main: colors.red },
      grey: colors.gray,
      info: { main: colors.info },
      primary: { main: colors.primary },
      secondary: { main: colors.secondary },
      success: { main: colors.success },
      warning: { main: colors.warning }
    },
    typography: {
      fontFamily: 'Montserrat'
    }
  });

  return (
    <ThemeProvider theme={useTheme() === 'light' ? LightTheme : DarkTheme}>
      {children}
    </ThemeProvider>
  );
};
