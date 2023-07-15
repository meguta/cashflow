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
            <Tr>
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
    <Flex p="5rem" pl="" width="100vw" height="100vh" backgroundColor="gray.200">
            <Stack width="100%">
                <Heading>Your Transactions</Heading>
                <TableContainer backgroundColor="gray.300" p="5" rounded="md" boxShadow="md" width="100">
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