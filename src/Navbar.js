import {Flex, HStack, Link} from "@chakra-ui/react"

function Navbar ({page, setPage}) {
    
    return (
        <Flex pl="5" pr="5" boxShadow="md"backgroundColor="gray.300"  justifyContent="flex-start" alignItem="center" backdropBlur="5px" width="100%" position="fixed" >
        
            <HStack spacing="5">
                <Link _hover={{textDecoration: "none"}} onClick={() => setPage("Homepage")} width="100%" fontSize="2xl" color="gray.600" fontWeight="extrabold">Cashflow.</Link>
                <Link color={page === "TransactionPage" ? "gray.600" : "gray.400"} onClick={() => setPage("TransactionPage")}>Transactions</Link>
                <Link color={page === "BudgetPage" ? "gray.600" : "gray.400"} onClick={() => setPage("BudgetPage")}>Budgets</Link>
            </HStack>
        </Flex>
    )
} 

export default Navbar