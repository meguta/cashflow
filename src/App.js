import {
  Box, Flex, Text, Heading, Button,
  CircularProgress, CircularProgressLabel,
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  FormControl, FormLabel, FormErrorMessage, FormHelperText,
  Input, InputGroup,
  RadioGroup, Stack, Radio,
  useToast,
  Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup,
  useDisclosure,
  Icon,
  useColorMode,
  InputLeftAddon,
  Divider
} from "@chakra-ui/react"

import { MdAttachMoney, MdOutlineAccessTime, MdCategory, MdOutlineStickyNote2 } from 'react-icons/md'

import moment from 'moment'
import { useState } from 'react'


function App() {
  const { toggleColorMode } = useColorMode()
  const [cashIn, setCashIn] = useState(32.22)
  const [cashOut, setCashOut] = useState(16.33)

  const [cashFlowInAmount, setCashFlowInAmount] = useState(0)
  const [cashFlowOutAmount, setCashFlowOutAmount] = useState(0)
  const [cashFlowDate, setCashFlowDate] = useState(moment().format("YYYY-MM-DD"))
  const [cashFlowBudget, setCashFlowBudget] = useState("Wants")
  const [cashFlowNote, setCashFlowNote] = useState("")
  const [budgetDivisons, setBudgetDivisions] = useState([30, 50, 20]) 

  const [transactionList, setTransactionList] = useState([])

  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  function handleUpdateCashflow(e) {
    if (e.currentTarget.id === "in") {
      console.log(cashFlowInAmount)
      setCashIn(curr => (Number(curr) + Number(cashFlowInAmount)))
    } else if (e.currentTarget.id === "out") {
      setCashOut(curr => (Number(curr) + Number(cashFlowOutAmount)))
    }
    const transaction = {
      value: (e.currentTarget.id === "in" ? Number(cashFlowInAmount) : Number(-cashFlowOutAmount)),
      time: cashFlowDate,
      budget: cashFlowBudget,
      note: cashFlowNote
    }
    setTransactionList(prev => [...prev, transaction])
    console.log(transactionList)
    let toastDescription = (e.currentTarget.id === "in" ? `Your CashFlow has increased by $${Number(cashFlowInAmount).toFixed(2)}.` : `Your CashFlow has decreased by $${Number(cashFlowOutAmount).toFixed(2)}.`)
    toast({
      title: 'CashFlow updated.',
      description: toastDescription,
      status: 'success',
      duration: 9000,
      isClosable: true
    })
    onClose(e)
  }


  function displayRecentTransactions() {
    const transactionRender = transactionList.map(trans =>
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
    <Flex height="100vh" bg="gray.200" alignItems="center" direction="column">
      <Text backgroundColor="gray.300" mb="2" textAlign="center" width="100%" fontSize="2xl" color="gray.600" fontWeight="extrabold">Cashflow</Text>
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
      <Flex>
        <Flex width="40vw" margin="10" direction="column">
          <Heading as="span" textAlign="start " color="gray.500">Budget Breakdown</Heading>
          <Stack>
          <Flex backgroundColor="gray.300" rounded="lg" padding="5" alignItems="center">
              <CircularProgress value={60} mr="5">
                <CircularProgressLabel>60%</CircularProgressLabel>
              </CircularProgress>
              <Box>
                <Heading fontSize="3xl">Wants</Heading>
                <Text as="span" color="gray.500">Total Budget</Text> <Text as="span" fontWeight="bold">${(cashIn*(budgetDivisons[0]/100)).toFixed(2)}</Text>
                <br/>
                <Text as="span" color="gray.500">CashFlow Percentage</Text> <Text as="span" fontSize="md" fontWeight="bold">{budgetDivisons[0]}%</Text>
              </Box>
            </Flex>
          </Stack>

        </Flex>
        <Flex width="40vw" margin="10" justifyContent="center" direction="column">
          <Flex justifyContent="space-between" alignItems="center">
            <Heading as="span" textAlign="start " color="gray.500">Recent Transactions</Heading>
            <Text color="gray.400" as="span">View All</Text>
          </Flex>
          <Flex direction="column" justifyContent="center">
            {displayRecentTransactions()}
          </Flex>
        </Flex>

      </Flex>
      <Flex>
        <Button onClick={onOpen}>Change CashFlow</Button>
        <Modal isOpen={isOpen} onClose={onClose} >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">Add CashFlow</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Tabs isFitted variant='enclosed'>
                <TabList>
                  <Tab>CashFlow In</Tab>
                  <Tab>CashFlow Out</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Flex>
                      <FormControl>
                        <InputGroup size="lg" >
                          <InputLeftAddon height={20} children={<Icon as={MdAttachMoney} />} />
                          <Input fontSize="4xl" height="20" type="text" value={cashFlowInAmount} onChange={(e) => { setCashFlowInAmount(e.target.value) }} />
                        </InputGroup>

                        <Divider marginTop="3" marginBottom="3" />

                        <Stack>

                          <InputGroup size="sm">
                            <InputLeftAddon children={<Icon as={MdOutlineAccessTime} />} />
                            <Input
                              type="text"
                              onFocus={(e) => e.target.type = "date"}
                              onBlur={(e) => e.target.type = "text"}
                              value={cashFlowDate}
                              onChange={(e) => { setCashFlowDate(e.target.value) }}
                            />
                          </InputGroup>
                          <RadioGroup value={cashFlowBudget} onChange={setCashFlowBudget}>
                            <Stack as={InputGroup} size="sm" direction="row" variant="outline" rounded="sm" borderWidth="1px">
                              <InputLeftAddon borderWidth="0px" children={<Icon as={MdCategory} />} />
                              <Radio value="All">All</Radio>
                              <Radio value="Wants">Wants</Radio>
                              <Radio value="Needs">Needs</Radio>
                              <Radio value="Savings">Savings</Radio>
                            </Stack>
                          </RadioGroup>

                          <InputGroup size="sm">
                            <InputLeftAddon children={<Icon as={MdOutlineStickyNote2} />} />
                            <Input onChange={(e) => setCashFlowNote(e.target.value)} value={cashFlowNote} type="text" placeholder="Note" />
                          </InputGroup>
                          <Button id="in" colorScheme="green" onClick={handleUpdateCashflow}>Update CashFlow</Button>
                        </Stack>
                      </FormControl>
                    </Flex>

                  </TabPanel>
                  <TabPanel>

                    <Flex>
                      <FormControl>
                        <InputGroup size="lg" >
                          <InputLeftAddon height={20} children={<Icon as={MdAttachMoney} />} />
                          <Input fontSize="4xl" height="20" type="text" value={cashFlowOutAmount} onChange={(e) => { setCashFlowOutAmount(e.target.value) }} />
                        </InputGroup>

                        <Divider marginTop="3" marginBottom="3" />

                        <Stack>

                          <InputGroup size="sm">
                            <InputLeftAddon children={<Icon as={MdOutlineAccessTime} />} />
                            <Input
                              placeholder="Select Date and Time"
                              type="text"
                              onFocus={(e) => e.target.type = "date"}
                              onBlur={(e) => e.target.type = "text"}
                              value={cashFlowDate}
                              onChange={(e) => { setCashFlowDate(e.target.value) }}
                            />
                          </InputGroup>
                          <RadioGroup value={cashFlowBudget} onChange={setCashFlowBudget}>
                            <Stack as={InputGroup} size="sm" direction="row" variant="outline" rounded="sm" borderWidth="1px">
                              <InputLeftAddon borderWidth="0px" children={<Icon as={MdCategory} />} />
                              <Radio value="Wants">Wants</Radio>
                              <Radio value="Needs">Needs</Radio>
                              <Radio value="Savings">Savings</Radio>
                            </Stack>
                          </RadioGroup>

                          <InputGroup size="sm">
                            <InputLeftAddon children={<Icon as={MdOutlineStickyNote2} />} />
                            <Input onChange={(e) => setCashFlowNote(e.target.value)} value={cashFlowNote} type="text" placeholder="Note" />
                          </InputGroup>
                          <Button id="out" colorScheme="green" onClick={handleUpdateCashflow}>Update CashFlow</Button>
                        </Stack>
                      </FormControl>
                    </Flex>
                  </TabPanel>
                </TabPanels>
              </Tabs>


            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onClose}>Close</Button>
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
