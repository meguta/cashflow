import { extendTheme } from "@chakra-ui/react";
import { TextStyle as Text } from "./styles/TextStyles"
import { HeadingStyle as Heading } from "./styles/HeadingStyles"
import '@fontsource-variable/sora'

// background colors
const lightBgColor = "gray.300"
const darkBgColor = "gray.500"

// text color
const lightMainTextColor = "gray.500"
const darkMainTextColor = "gray.400"

const lightAltTextColor = "gray.600"
const darkAltTextColor = "gray.500"


const theme = extendTheme({
    fonts: {
        heading: `'Sora Variable', sans-serif`,
        body: `'Sora Variable', sans-serif`
    },
    initialColorMode: "dark",
    useSystemColorMode: false,
    colors: {
        primary: {
            dark: "#2D3748",
            light: "#CBD5E0"
        },
        bg: {
            dark: "#1A202C",
            light: "#A0AEC0"
        },
    },
    semanticTokens: {
        colors: {
            primary_bg: {
                default: "#A0AEC0",
                _dark: "#1A202C",
            },
            container_bg: {
                default: "#CBD5E0",
                _dark: "#2D3748"
            },
            secondary_container_bg: {
                default: "#E2E8F0",
                _dark: "#1A202C"
            },
            mainText: {
                default: "#718096",
                _dark: "#A0AEC0"
            },
            altText: {
                default: "#4A5568",
                _dark: "#718096"
            },
            heading_alt: {
                default: "#2D3748",
                _dark: "#CBD5E0"
            }
        }
    },
    components: {
        Text, Heading
    },
})


export default theme