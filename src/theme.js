import { extendTheme } from "@chakra-ui/react";
import '@fontsource-variable/sora'


const theme = extendTheme({
    fonts: {
        heading: `'Sora Variable', sans-serif`,
        body: `'Sora Variable', sans-serif`
    }
})

export default theme