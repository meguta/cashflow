import {mode} from "@chakra-ui/theme-tools"

export const TextStyle = {
    baseStyle: {},
    sizes: {},
    variants: {
        primary: {
            color: "mainText"
        },
        alt: (props) => ({
            color: mode("altText.light", "altText.dark")(props),
        }),
    },
    defaultProps: {},
}