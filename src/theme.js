import { extendTheme, useColorModeValue } from "@chakra-ui/react";
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
    }
})



export default theme