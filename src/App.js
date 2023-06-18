import {
  Box, Flex, Text, Progress, Button,
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  FormControl, FormLabel, FormErrorMessage, FormHelperText,
  NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
  RadioGroup, HStack, Radio,
  Input,
  useDisclosure
} from "@chakra-ui/react"

import { useState } from 'react'


function App() {
  const [cashIn, setCashIn] = useState(32.22)
  const [cashOut, setCashOut] = useState(16.33)

  const { isOpen, onOpen, onClose } = useDisclosure()

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
                  <FormLabel>What type of CashFlow is this?</FormLabel>
                  <RadioGroup>
                    <HStack>
                      <Radio>Positive</Radio>
                      <Radio>Negative</Radio>
                    </HStack>
                  </RadioGroup>
                  <FormLabel>What was the amount of CashFlow</FormLabel>
                  <NumberInput defaultValue={15} min={10} max={20}>
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
                  />
                </FormControl>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onClose}>Close</Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>

        </Modal>

        <Button>Edit Current Budget</Button>
      </Flex>
    </Flex>
  );
}

export default App;
