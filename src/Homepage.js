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
  Divider, Link,
  Fade, ScaleFade, Slide, SlideFade, Collapse, Container,
  SimpleGrid
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
  budgetDivisons, setBudgetDivisions, currentPage, setCurrentPage, containerBg, bgColor
}) {
  const { toggleColorMode } = useColorMode()

  function displayBudgetBreakdown() {
    return (
      <Flex width="100%" height="100%" background={containerBg} direction="column" alignItems="center" rounded="lg" boxShadow="md" justifyContent="center">
        <Tabs width="100%" variant="enclosed" margin="1" isFitted padding="5">
          <Heading variant="primary" fontSize="2xl" textAlign="center ">Budget Breakdown</Heading>
          <TabList p="1rem" pb="0" outline={containerBg}>
            <Tab>Wants</Tab>
            <Tab>Needs</Tab>
            <Tab>Savings</Tab>
          </TabList>
          <TabPanels>
            {
              budgetDivisons.map(budget =>
                <TabPanel>
                  <Stack justifyContent="space-between" spacing="3rem" width="100%" direction={["column", "column", "row", "row"]}>
                    <Box>
                      <Heading variant="primary" fontSize="3xl">{budget.name}</Heading>
                      <Text variant="alt" as="span">With a total budget of </Text> <Text variant="primary" as="span" fontWeight="bold">${getTotalBudget(budget.name)}</Text>
                      <br />
                      <Text variant="alt" as="span">And, a CashFlow Percentage of </Text> <Text variant="primary" as="span" fontSize="md" fontWeight="bold">{budget.value}%</Text>
                    </Box>
                    <Flex rounded="lg" alignItems="center" direction={["column", "column", "row"]}>
                      <CircularProgress size="100" value={getBudgetUsage(budget.name)} mr="5">
                        <CircularProgressLabel>{getBudgetUsage(budget.name)}%</CircularProgressLabel>
                      </CircularProgress>

                    </Flex>
                  </Stack>
                </TabPanel>)
            }
          </TabPanels>
        </Tabs>

      </Flex>
    )
  }


  function displayRecentTransactions() {
    const sliceTransaction = transactionList.slice(-3).reverse()
    const transactionRender = sliceTransaction.map(trans =>
      <Flex width="95%" border="2px" borderColor={bgColor} boxShadow="lg" rounded="md" padding="4" margin="2" justifyContent="space-between">
        <Box>

          <Text variant="alt" as="span" margin="2">{trans.budget}</Text>
          <Text variant="alt" as="span" fontSize="xl" textAlign="start" margin="2">{trans.note}</Text>

        </Box>
        <Box>
          <Text variant="primary">{trans.value > 0 ? "+ $" + trans.value : "- $" + (-trans.value)}</Text>
          <Text variant="alt">{moment(trans.time, "YYYY-MM-DD").calendar()}</Text>
        </Box>

      </Flex>


    )
    return transactionRender
  }

  return (
    <Stack justify="center" width="100%" pt="4rem" pb="8rem" pr={["1rem", "2rem", "2rem", "10rem"]} pl={["1rem", "2rem", "2rem", "10rem"]} spacing="2rem" bg="primary_bg" >
      <Heading variant="alt" textAlign="center">Your Overview</Heading>
      <SimpleGrid minChildWidth="300px" background="primary_bg" spacing="2rem" justify="center" direction={["column", "column", "row", "row"]}>
        <Flex width="100%" height="100%" boxShadow="md" rounded="lg" padding="10" paddingTop="5" background="container_bg" justifyContent="center" direction="column" alignContent="center">
          <Heading variant="primary" textAlign="center" fontSize={["2xl", "2xl", "4xl", "4xl"]} fontWeight="bold">Total CashFlow</Heading>
          <Stack justifyContent="center" alignItems="center" spacing="2" direction="column">
            <Text textAlign="center" variant="primary" fontSize={["4xl", "6xl", "6xl", "8xl"]} fontWeight="semibold">{(cashIn >= cashOut ? "+ $" + (cashIn - cashOut).toFixed(2) : "- $" + (cashOut - cashIn).toFixed(2))}</Text>
            <Text textAlign="center" variant="alt"> of CashFlow</Text>

          </Stack>
          <Flex justifyContent="space-between">
            <Text fontSize="xl" variant="alt">${cashIn.toFixed(2)} in</Text>
            <Text fontSize="xl" variant="alt">${cashOut.toFixed(2)} out</Text>
          </Flex>
        </Flex>
        {displayBudgetBreakdown()}

      </SimpleGrid>
      <Stack width="100%" alignItems="center" justifyContent="center">

        <Flex pb="10" bg={containerBg} width="100%" rounded="lg" justifyContent="center" direction="column">
          <Flex p="10" justifyContent="space-between" alignItems="center">
            <Heading as="span" textAlign="start" variant="primary" fontSize={["2xl", "2xl", "4xl", "4xl"]}>Recent Transactions</Heading>
            <Link onClick={() => setCurrentPage("TransactionPage")} color="gray.400" as="span">View All</Link>
          </Flex>
          <Flex width="100%" direction="column" justifyContent="center" alignItems="center">
            {displayRecentTransactions()}
          </Flex>
        </Flex>

      </Stack>

    </Stack>
  );
}

export default Homepage