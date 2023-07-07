import {
  Box, Flex, Text, Heading, Progress, Button,
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  FormControl, FormLabel, FormErrorMessage, FormHelperText,
  NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
  RadioGroup, Stack, Radio,
  useToast,
  Input,
  Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup,
  useDisclosure,
  useColorMode
} from "@chakra-ui/react"

import { useState } from 'react'


function App() { 
  const {toggleColorMode} = useColorMode()
  const [cashIn, setCashIn] = useState(32.22)
  const [cashOut, setCashOut] = useState(16.33)

  const [cashFlowAmount, setCashFlowAmount] = useState(0)
  const [cashFlowDate, setCashFlowDate] = useState("")
  const [cashFlowBudget, setCashFlowBudget] = useState("budget1")

  const [transactionList, setTransactionList] = useState([])

  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  
  function handleUpdateCashflow(e) {
    if (cashFlowAmount > 0) {
      console.log(cashFlowAmount)
      setCashIn(curr => (Number(curr)+Number(cashFlowAmount)))
    } else if (cashFlowAmount < 0) {
      setCashOut(curr => (Number(curr)-Number(cashFlowAmount)))
    }
    const transaction = {
      value: Number(cashFlowAmount),
      time: cashFlowDate,
      budget: cashFlowBudget}
    setTransactionList(prev => [...prev, transaction])
    console.log(transactionList)

    toast({title: 'CashFlow updated.',
           description: "You've added a CashFlow of $" + Number(cashFlowAmount).toFixed(2) + ".",
           status: 'success',
           duration: 9000,
           isClosable: true})
    onClose(e)
  }


  function displayBudget(budgetName) {
    const budgetTransactions = transactionList.filter(trans => trans.budget === budgetName)
    const budgetRender = budgetTransactions.map(trans =>
      <Flex width="100%" background="gray.300" rounded="md" boxShadow="inner" padding="4" margin="2"justifyContent="space-between">
        <Text>Category</Text>
        <Box>
          <Text>{ trans.value > 0 ? "+ $"+trans.value : "- $"+trans.value}</Text>
          <Text>{Date(trans.time)}</Text>
        </Box>

      </Flex>
      

      )
    return budgetRender
  }

  return (
    <Flex height="100vh" bg="gray.200" alignItems="center" direction="column">
    <Text fontSize="2xl" color="gray.400" fontWeight="extrabold">Cashflow</Text>
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
      <Flex width="40vw" margin="10"  justifyContent="center" direction="column">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="span" textAlign="start " color="gray.500">Recent Transactions</Heading>
          <Text color="gray.400" as="span">View All</Text>
        </Flex>
      <Flex direction="column" justifyContent="center">
        {displayBudget("budget1")}
        {displayBudget("budget2")}
        {displayBudget("budget3")}
      </Flex>
      </Flex>
      <Flex>
        <Button onClick={onOpen}>Change CashFlow</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update your CashFlow</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex>
                <FormControl>
                  <FormLabel>What was the amount of CashFlow</FormLabel>
                  <NumberInput value={cashFlowAmount} onChange={setCashFlowAmount}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <FormLabel>When was this CashFlow completed?</FormLabel>
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="date"
                    value={cashFlowDate}
                    onChange={(e) => {setCashFlowDate(e.target.value)}}
                  />
                  <FormLabel>What budget group is this CashFlow for?</FormLabel>
                  <RadioGroup value={cashFlowBudget} onChange={setCashFlowBudget}>
                    <Stack direction="row">
                      <Radio value="budget1">Budget 1</Radio>
                      <Radio value="budget2">Budget 2</Radio>
                      <Radio value="budget3">Budget 3</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onClose}>Close</Button>
              <Button colorScheme="green" variant="ghost" onClick={handleUpdateCashflow}>Update CashFlow</Button>
            </ModalFooter>
          </ModalContent>

        </Modal>

        <Button>Edit Current Budget</Button>
      </Flex>
      <Button onClick={toggleColorMode}>Toggle Darkmode</Button>
    </Flex>
  );
}

export default App;
