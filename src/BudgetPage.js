import {
    Text, Flex, Heading, Lorem,
    Card, CardHeader, CardBody, CardFooter,
    HStack, Stack, StackDivider, Box,
    CircularProgress, CircularProgressLabel, Button,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure,
    FormControl,
    FormLabel,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
    FormHelperText
} from "@chakra-ui/react"

import moment from "moment"
import { useState } from "react"



function BudgetPage({ getTotalBudget, getBudgetUsage, budgetDivisions, setBudgetDivisions, transactionList, sortByDate }) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [validBudget, setValidBudget] = useState(true)

    const [tempBudget, setTempBudget] = useState([budgetDivisions[0].value, budgetDivisions[1].value, budgetDivisions[2].value])

    function handleInputChange(e) {

        if (e.currentTarget.id == "Wants") {
            setTempBudget(prev => (
                [e.target.value,
                prev[1],
                prev[2]]
            ))
        } else if (e.currentTarget.id == "Needs") {
            setTempBudget(prev => (
                [prev[0],
                e.target.value,
                prev[2]]
            ))

        } else if (e.currentTarget.id == "Savings") {

            setTempBudget(prev => (
                [prev[0],
                prev[1],
                e.target.value]
            ))
        }
    }

    function handleSubmitEditBudget() {
        let totalBudget = 0
        for (const budget of tempBudget) {
            totalBudget += parseInt(budget)
            if (budget > 100) {
                setValidBudget(false)
                return
            }
        }
        if (totalBudget != 100) {
            setValidBudget(false)
            console.log(totalBudget)
            return
        } else {
            setBudgetDivisions([
                {name: "Wants", value: tempBudget[0]},
                {name: "Needs", value: tempBudget[1]},
                {name: "Savings", value: tempBudget[2]},
        ])
            setValidBudget(true)
        }
    }
    function editBudgetModal() {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Budget</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <Stack divider={<StackDivider />}>
                                <InputGroup>
                                    <InputLeftAddon children="Wants" />
                                    <Input isInvalid={!validBudget} id="Wants" placeholder={budgetDivisions[0].value} value={tempBudget[0]} onChange={handleInputChange}></Input>
                                    <InputRightElement pointerEvents="none" color="gray.300" fontSize="lg">
                                        %
                                    </InputRightElement>
                                </InputGroup>

                                <InputGroup>
                                    <InputLeftAddon children="Needs" />
                                    <Input id="Needs" placeholder={budgetDivisions[1].value} value={tempBudget[1]} onChange={handleInputChange}></Input>
                                    <InputRightElement pointerEvents="none" color="gray.300" fontSize="lg">
                                        %
                                    </InputRightElement >

                                </InputGroup>

                                <InputGroup>
                                    <InputLeftAddon children="Savings" />
                                    <Input id="Savings" placeholder={budgetDivisions[2].value} value={tempBudget[2]} onChange={handleInputChange}></Input>
                                    <InputRightElement pointerEvents="none" color="gray.300" fontSize="lg">
                                        %
                                    </InputRightElement>
                                </InputGroup>

                            </Stack>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button width="100%" colorScheme="green" onClick={handleSubmitEditBudget}>Submit Changes</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }

    function handleEditBudget(e) {
        console.log(e.currentTarget.id)
        onOpen(e)
    }
    function displayRecentBudgetTransactions(budgetName) {
        const filteredBudget = sortByDate(transactionList).filter(trans => trans.budget == budgetName)
        return filteredBudget.map(trans =>
            <Flex boxShadow="md" backgroundColor="gray.200" rounded="md" p="1" justifyContent="space-between">
                <Text fontWeight="bold">{trans.value > 0 ? "$ " + trans.value.toFixed(2) : "- $ " + (-trans.value).toFixed(2)}</Text>
                <Text color="gray.400">{trans.note != "" ? trans.note + ", " : ""}{moment(trans.time, "YYYY-MM-DD").calendar()}</Text>
            </Flex>
        )
    }
    function displayCardBudget() {
        const budgetCards = budgetDivisions.map(budget =>
            <Card>
                <CardHeader>
                    <Heading size="md">{budget.name}</Heading>
                </CardHeader>
                <CardBody>
                    <Stack divider={<StackDivider />}>
                        <Box>
                            <Heading size="xs" textTransform="uppercase">Overview</Heading>
                            <HStack>
                                <CircularProgress value={getBudgetUsage(budget.name)} >
                                    <CircularProgressLabel>{getBudgetUsage(budget.name)}%</CircularProgressLabel>
                                </CircularProgress>
                                <Text>Your current usage for this budget is ${getBudgetUsage(budget.name)} out of ${getTotalBudget(budget.name)}.</Text>
                            </HStack>
                            <Text as="span" color="gray.500">Currently, your </Text>
                            <Text as="span" fontWeight="bold">{budget.name}</Text>
                            <Text as="span" color="gray.500"> budget is set to </Text>
                            <Text as="span" fontWeight="bold">{budget.value}%</Text>
                        </Box>
                        <Box>
                            <Heading size="xs" textTransform="uppercase">Transactions</Heading>
                            <Stack>
                                {displayRecentBudgetTransactions(budget.name)}
                            </Stack>
                        </Box>
                        <Button id={budget.name} onClick={handleEditBudget}>Edit Budget</Button>
                        {editBudgetModal()}
                    </Stack>
                </CardBody>
            </Card>
        )
        return budgetCards
    }

    return (
        <Stack divider={<StackDivider />} p="5rem" width="100vw" height="100vh" backgroundColor="gray.200" direction="column" alignItems="center">
            <Heading>Budget Page</Heading>
            <HStack>
                {displayCardBudget()}
            </HStack>
        </Stack>
    )
}

export default BudgetPage