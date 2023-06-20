import {
  Box, Flex, Text, Progress, Button,
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  FormControl, FormLabel, FormErrorMessage, FormHelperText,
  NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
  RadioGroup, Stack, Radio,
  Select,
  Input,
  useDisclosure
} from "@chakra-ui/react"

import { useState } from 'react'


function App() {
  const [cashIn, setCashIn] = useState(32.22)
  const [cashOut, setCashOut] = useState(16.33)

  const [cashFlowAmount, setCashFlowAmount] = useState(0)
  const [cashFlowDate, setCashFlowDate] = useState("")
  const [cashFlowBudget, setCashFlowBudget] = useState("budget1")

  const { isOpen, onOpen, onClose } = useDisclosure()
  
  function handleUpdateCashflow() {
    if (cashFlowAmount > 0) {
      console.log(cashFlowAmount)
      setCashIn(curr => (Number(curr)+Number(cashFlowAmount)))
    } else if (cashFlowAmount < 0) {
      setCashOut(curr => (Number(curr)-Number(cashFlowAmount)))
    }
    console.log(cashFlowDate)
  }

  return (
    <Flex height="100vh" bg="gray.200" alignItems="center" direction="column">
      <Text fontSize="2xl" fontWeight="extrabold">Cashflow</Text>
      <Flex justifyContent="center" direction="column" alignItems="">
        <Text color="gray.600" fontSize="6xl">{(cashIn >= cashOut ? "+ $" + (cashIn - cashOut).toFixed(2) : "- $" + (cashOut - cashIn).toFixed(2))} cashflow</Text>
        <Text fontSize="xl" color="gray.600">${cashIn.toFixed(2)} in</Text>
        <Text fontSize="xl" color="gray.600">${cashOut.toFixed(2)} out</Text>
        <Progress colorScheme="gray" value={60} />
      </Flex>
      <Flex justifyContent="space-between">
        <Tabs>
          <TabList>
            <Tab>Budget 1</Tab>
            <Tab>Budget 2</Tab>
            <Tab>Budget 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text fontWeight="medium">Recent Transactions</Text>
            </TabPanel>
            <TabPanel>
              <Text fontWeight="medium">Recent Transactions</Text>
            </TabPanel>
            <TabPanel>
              <Text>Recent Transactions</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
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
                    type="datetime-local"
                    value={cashFlowDate}
                    onChange={setCashFlowDate}
                  />
                  <FormLabel>What budget group is this CashFlow for?</FormLabel>
                  <RadioGroup>
                    <Stack direction="row" value={cashFlowBudget} onChange={setCashFlowBudget}>
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
    </Flex>
  );
}

export default App;
