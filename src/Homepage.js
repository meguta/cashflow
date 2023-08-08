import {
  Box, Flex, Text, Heading, Button,
  CircularProgress, CircularProgressLabel,
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  FormControl,
  Input, InputGroup,
  RadioGroup, Stack, HStack, Radio,
  useToast,
  useDisclosure,
  Icon,
  useColorMode,
  InputLeftAddon,
  Divider, Link
} from "@chakra-ui/react"

import { MdAttachMoney, MdOutlineAccessTime, MdCategory, MdOutlineStickyNote2 } from 'react-icons/md'

import moment from 'moment'
import { useState } from 'react'

function Homepage({
  cashIn, setCashIn, cashOut, setCashOut,
  cashFlowInAmount, setCashFlowInAmount, cashFlowOutAmount, setCashFlowOutAmount,
  cashFlowDate, setCashFlowDate, cashFlowBudget, setCashFlowBudget,
  cashFlowNote, setCashFlowNote,
  transactionList, setTransactionList,
  getTotalBudget, getBudgetUsage,
  budgetDivisons, setBudgetDivisions, currentPage, setCurrentPage
}) {
  const { toggleColorMode } = useColorMode()

  
  function displayBudgetBreakdown() {
    return (
      <Flex colorScheme="gray" direction="column" alignItems="center">
        <Tabs colorScheme="gray" boxShadow="md" variant="enclosed" margin="1" isFitted padding="5" rounded="lg">
        <Heading fontSize="2xl" textAlign="center ">Budget Breakdown</Heading>
          <TabList colorScheme="gray" p="1rem">
            <Tab>Wants</Tab>
            <Tab>Needs</Tab>
            <Tab>Savings</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Stack>
                <Flex rounded="lg" padding="5" alignItems="center">
                  <CircularProgress size="100" value={getBudgetUsage("Wants")} mr="5">
                    <CircularProgressLabel>{getBudgetUsage("Wants")}%</CircularProgressLabel>
                  </CircularProgress>
                  <Box>
                    <Heading fontSize="3xl">Wants</Heading>
                    <Text as="span">Total Budget</Text> <Text as="span" fontWeight="bold">${getTotalBudget("Wants")}</Text>
                    <br />
                    <Text as="span">CashFlow Percentage</Text> <Text as="span" fontSize="md" fontWeight="bold">{budgetDivisons["Wants"]}%</Text>
                  </Box>
                </Flex>
              </Stack>

            </TabPanel>
            <TabPanel>
              <Stack>
                <Flex rounded="lg" padding="5" alignItems="center">
                  <CircularProgress size="100" value={getBudgetUsage("Needs")} mr="5">
                    <CircularProgressLabel>{getBudgetUsage("Needs")}%</CircularProgressLabel>
                  </CircularProgress>
                  <Box>
                    <Heading fontSize="3xl">Needs</Heading>
                    <Text as="span" color="gray.500">Total Budget</Text> <Text as="span" fontWeight="bold">${getTotalBudget("Needs")}</Text>
                    <br />
                    <Text as="span" color="gray.500">CashFlow Percentage</Text> <Text as="span" fontSize="md" fontWeight="bold">{budgetDivisons["Needs"]}%</Text>
                  </Box>
                </Flex>
              </Stack>

            </TabPanel>
            <TabPanel>
              <Stack>
                <Flex rounded="lg" padding="5" alignItems="center">
                  <CircularProgress size="100" value={getBudgetUsage("Savings")} mr="5">
                    <CircularProgressLabel>{getBudgetUsage("Savings")}%</CircularProgressLabel>
                  </CircularProgress>
                  <Box>
                    <Heading fontSize="3xl">Savings</Heading>
                    <Text as="span" color="gray.500">Total Budget</Text> <Text as="span" fontWeight="bold">${getTotalBudget("Savings")}</Text>
                    <br />
                    <Text as="span" color="gray.500">CashFlow Percentage</Text> <Text as="span" fontSize="md" fontWeight="bold">{budgetDivisons["Savings"]}%</Text>
                  </Box>
                </Flex>
              </Stack>

            </TabPanel>
          </TabPanels>
        </Tabs>

      </Flex>
    )
  }


  function displayRecentTransactions() {
    const sliceTransaction = transactionList.slice(-3).reverse()
    const transactionRender = sliceTransaction.map(trans =>
      <Flex width="100%" background="gray.300" rounded="md" boxShadow="inner" padding="4" margin="2" justifyContent="space-between">
        <Box>

          <Text as="span" color="gray.500" margin="2">{trans.budget}</Text>
          <Text as="span" fontSize="xl" textAlign="start" margin="2">{trans.note}</Text>

        </Box>
        <Box>
          <Text>{trans.value > 0 ? "+ $" + trans.value : "- $" + (-trans.value)}</Text>
          <Text color="gray.400">{moment(trans.time, "YYYY-MM-DD").calendar()}</Text>
        </Box>

      </Flex>


    )
    return transactionRender
  }

  return (
    <Stack p="3rem" spacing="10" bg="gray.200" alignItems="center" direction="column">
      <HStack>
        <Flex color="gray.500" boxShadow="md" rounded="lg" padding="10" paddingTop="5" background="gray.300" justifyContent="center" direction="column">
          <Text textAlign="center" fontSize="2xl" fontWeight="bold">Total CashFlow</Text>
          <Box>
            <Text as="span" color="gray.600" fontSize="8xl" fontWeight="semibold">{(cashIn >= cashOut ? "+ $" + (cashIn - cashOut).toFixed(2) : "- $" + (cashOut - cashIn).toFixed(2))}</Text>
            <Text as="span"> of CashFlow</Text>
          </Box>
          <Flex justifyContent="space-between">
            <Text fontSize="xl" color="gray.600">${cashIn.toFixed(2)} in</Text>
            <Text fontSize="xl" color="gray.600">${cashOut.toFixed(2)} out</Text>
          </Flex>
        </Flex>
        {displayBudgetBreakdown()}

      </HStack>
      <Stack width="100%" alignItems="center" justifyContent="center">

        <Flex width="80vw" justifyContent="center" direction="column">
          <Flex justifyContent="space-between" alignItems="center">
            <Heading as="span" textAlign="start" color="gray.500">Recent Transactions</Heading>
            <Link onClick={() => setCurrentPage("TransactionPage") } color="gray.400" as="span">View All</Link>
          </Flex>
          <Flex direction="column" justifyContent="center">
            {displayRecentTransactions()}
          </Flex>
        </Flex>

      </Stack>
      
      <Button onClick={toggleColorMode}>Toggle Darkmode</Button>
    </Stack>
  );
}

export default Homepage