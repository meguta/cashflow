import { Text, Flex, Heading,
         Card, CardHeader, CardBody, CardFooter,
         HStack } from "@chakra-ui/react"


function BudgetPage ({getTotalBudget, getBudgetUsage, budgetDivisions, setBudgetDivisions}) {

    // function displayCardBudget () {
    //     budgetCards = budgetDivisions.map (budget => 
    //     <Card>
    //         <Heading>budget.</Heading>
    //     </Card>    
    //     )
    // }

    return (
        <Flex p="5rem" width="100%" height="100vh" backgroundColor="gray.200">
            <Heading>Budget Page</Heading>
            <HStack>
                <Card>
                    <CardBody>
                        <Text>Testomg</Text>

                    </CardBody>
                </Card>
            </HStack>
        </Flex>
    )
}

export default BudgetPage