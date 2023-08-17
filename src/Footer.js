import {
    HStack, Flex, Text,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    InputGroup, Tabs, TabList, Tab, TabPanels, TabPanel, FormControl, InputLeftAddon, Icon, Input,
    useDisclosure, Divider, Stack, Radio, Button, IconButton, RadioGroup, useToast, useColorMode
} from "@chakra-ui/react"

import {AddIcon} from '@chakra-ui/icons'

import { MdAttachMoney, MdOutlineAccessTime, MdCategory, MdOutlineStickyNote2 } from 'react-icons/md'

function Footer({
    cashIn, setCashIn, cashOut, setCashOut,
    cashFlowInAmount, setCashFlowInAmount, cashFlowOutAmount, setCashFlowOutAmount,
    cashFlowDate, setCashFlowDate, cashFlowBudget, setCashFlowBudget,
    cashFlowNote, setCashFlowNote,
    transactionList, setTransactionList,
}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const {toggleColorMode} = useColorMode()

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
    

    function changeCashFlowModal() {
        return (
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
        )
    }
    return (
        <HStack boxShadow="inner"justifyContent="center" background="container_bg" padding="1rem" width="100%" position="fixed" bottom="0rem">
            <Button icon={<AddIcon/>} onClick={onOpen}>Change CashFlow</Button>
            {changeCashFlowModal()}
            <Button onClick={toggleColorMode}>Toggle Darkmode</Button>
        </HStack>
    )
}

export default Footer