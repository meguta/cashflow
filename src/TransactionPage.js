import {
    Text, Heading, Flex,
    Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer,
    Stack
} from "@chakra-ui/react"

import moment from "moment"

function TransactionPage({ transactionList, setTransactionList, sortByDate }) {
    function displayAllTransactions() {
        const reverseTransactions = sortByDate(transactionList).reverse()
        const allTransactions = reverseTransactions.map(trans =>
        <Tr color="mainText" borderTop="2px" borderBottom="2px" borderColor="secondary_container_bg">
                <Td>{trans.time}</Td>
                <Td>${Math.abs(trans.value).toFixed(2)}</Td>
                <Td>{trans.budget}</Td>
                <Td>{trans.note}</Td>
                <Td>{trans.value > 0 ? "CashFlow In" : "CashFlow Out"}</Td>
            </Tr>
        )
        return allTransactions
    }
    return (
    <Flex pr={["1rem", "2rem", "2rem", "10rem"]} pl={["1rem", "2rem", "2rem", "10rem"]}  width="100vw" height="100vh" bg="primary_bg">
            <Stack width="100%">
                <Heading pt="4rem" pb="2rem" textAlign="center" variant="alt">Your Transactions</Heading>
                <TableContainer bg="container_bg" p="5" rounded="md" boxShadow="md" width="100">
                    <Table variant='simple'>
                        <TableCaption>All of your CashFlow transactions.</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Date</Th>
                                <Th>Amount</Th>
                                <Th>Budget Group</Th>
                                <Th>Note</Th>
                                <Th>Type</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {displayAllTransactions()}
                        </Tbody>
                    </Table>
                </TableContainer>

            </Stack>

        </Flex>
    )
}

export default TransactionPage