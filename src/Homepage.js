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
  Divider
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
  budgetDivisons, setBudgetDivisions 
}) {
  const { toggleColorMode } = useColorMode()
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
    <Stack pt="12" spacing="10" bg="gray.200" alignItems="center" direction="column">
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
      <HStack alignItems="flex-start" justifyContent="center">
        <Flex direction="column" alignItems="center">
          <Heading textAlign="start " color="gray.500">Budget Breakdown</Heading>
          <Tabs boxShadow="md" variant="enclosed" margin="1" isFitted background="gray.300" padding="5" rounded="lg">
            <TabList>
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
                      <Text as="span" color="gray.500">Total Budget</Text> <Text as="span" fontWeight="bold">${getTotalBudget("Wants")}</Text>
                      <br />
                      <Text as="span" color="gray.500">CashFlow Percentage</Text> <Text as="span" fontSize="md" fontWeight="bold">{budgetDivisons["Wants"]}%</Text>
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
        <Flex width="40vw" justifyContent="center" direction="column">
          <Flex justifyContent="space-between" alignItems="center">
            <Heading as="span" textAlign="start" color="gray.500">Recent Transactions</Heading>
            <Text color="gray.400" as="span">View All</Text>
          </Flex>
          <Flex direction="column" justifyContent="center">
            {displayRecentTransactions()}
          </Flex>
        </Flex>

      </HStack>
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
    </Stack>
  );
}

export default Homepage