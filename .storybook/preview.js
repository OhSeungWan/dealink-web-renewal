import { Container, ScreenWrapper } from 'Components/Atoms';

// import theme from 'Styles/Theme';
// import { withThemesProvider } from 'themeprovider-storybook';
import { ThemeProvider } from 'styled-components';
import theme from 'Styles/Theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
};

// // Options:
// const themes = [
//   {
//     name: 'primary', // Required it's used for displaying the button label,
//     colors: '#fff' // Optional, it's used for setting dynamic background color on storybook
//   },
//   {
//     name: 'Theme2', // Required it's used for displaying the button label,
//     primary: '#000' // Optional, it's used for setting dynamic background color on storybook
//   },
//   theme
// ];

export const decorators = [
  Story => (
    <ThemeProvider theme={theme}>
      <ScreenWrapper>
        <Container>
          <Story />
        </Container>
      </ScreenWrapper>
    </ThemeProvider>
  )
];
