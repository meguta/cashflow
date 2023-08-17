import Homepage from "./Homepage";
import Navbar from "./Navbar"
import Footer from "./Footer"
import TransactionPage from "./TransactionPage";
import BudgetPage from "./BudgetPage";

import { useState } from "react"
import moment from 'moment'
import { useColorModeValue } from "@chakra-ui/react";


function App() {
  const [currentPage, setCurrentPage] = useState("Homepage")

  const [cashIn, setCashIn] = useState(0)
  const [cashOut, setCashOut] = useState(0)

  const [cashFlowInAmount, setCashFlowInAmount] = useState(0)
  const [cashFlowOutAmount, setCashFlowOutAmount] = useState(0)
  const [cashFlowDate, setCashFlowDate] = useState(moment().format("YYYY-MM-DD"))
  const [cashFlowBudget, setCashFlowBudget] = useState("Wants")
  const [cashFlowNote, setCashFlowNote] = useState("")

  const [transactionList, setTransactionList] = useState([])
  const [budgetDivisions, setBudgetDivisions] = useState([
    {
      name: "Wants",
      value: 30
    },
    {
      name: "Needs",
      value: 50
    },
    {
      name: "Savings",
      value: 20
    }
  ])

  const containerBg = useColorModeValue("primary.light", "primary.dark")
  const bgColor = useColorModeValue("bg.light", "bg.dark")

  function getTotalBudget(index) {
    let budgetCashIn = 0
    for (let i = 0; i < transactionList.length; i++) {
      if ((transactionList[i].budget == "All") && transactionList[i].value > 0) {
        budgetCashIn += transactionList[i].value
      }
    }

    let budgetShare = budgetDivisions.find(budget => budget.name == index)

    budgetCashIn = (budgetCashIn * (budgetShare.value / 100))
    for (let i = 0; i < transactionList.length; i++) {
      if ((transactionList[i].budget == index) && transactionList[i].value > 0) {
        budgetCashIn += transactionList[i].value
      }
    }

    return budgetCashIn.toFixed(2)
  }

  function getBudgetSpent(index) {
    let totalSpent = 0
    for (let i = 0; i < transactionList.length; i++) {
      if (transactionList[i].budget == index && transactionList[i].value < 0) {
        totalSpent += -transactionList[i].value
      }
    }
    return totalSpent.toFixed(2)
  }

  function getBudgetUsage(index) {

    return getBudgetSpent(index) == 0 ? 0 : Math.round(getBudgetSpent(index) / getTotalBudget(index) * 100);
  }


  function sortByDate(array) {
    return array.sort((a, b) =>
      new moment(a.time, "YYYY-MM-DD").unix() -
      new moment(b.time, "YYYY-MM-DD").unix())
  }

  function displayPage() {
    if (currentPage == "Homepage") {
      return <Homepage
        cashIn={cashIn} setCashIn={setCashIn}
        cashOut={cashOut} setCashOut={setCashOut}

        cashFlowInAmount={cashFlowInAmount} setCashFlowInAmount={setCashFlowInAmount}
        cashFlowOutAmount={cashFlowOutAmount} setCashFlowOutAmount={setCashFlowOutAmount}
        cashFlowDate={cashFlowDate} setCashFlowDate={setCashFlowDate}
        cashFlowBudget={cashFlowBudget} setCashFlowBudget={setCashFlowBudget}
        cashFlowNote={cashFlowNote} setCashFlowNote={setCashFlowNote}

        transactionList={transactionList} setTransactionList={setTransactionList}
        sortByDate={sortByDate}

        getTotalBudget={getTotalBudget}
        getBudgetSpent={getBudgetSpent}
        getBudgetUsage={getBudgetUsage}
        budgetDivisons={budgetDivisions} setBudgetDivisions={setBudgetDivisions}

        currentPage={currentPage} setCurrentPage={setCurrentPage}

        containerBg={containerBg} bgColor={bgColor}
      />
    } else if (currentPage == "TransactionPage") {
      return <TransactionPage transactionList={transactionList} setTransactionList={setTransactionList}
        sortByDate={sortByDate}
      />
    } else if (currentPage == "BudgetPage") {
      return <BudgetPage getTotalBudget={getTotalBudget} getBudgetUsage={getBudgetUsage}
        budgetDivisions={budgetDivisions} setBudgetDivisions={setBudgetDivisions}
        transactionList={transactionList} sortByDate={sortByDate}/>
    }
  }
  return <>
    <Navbar page={currentPage} setPage={setCurrentPage} containerBg={containerBg}/>
    {displayPage()}
    <Footer
      cashIn={cashIn} setCashIn={setCashIn}
      cashOut={cashOut} setCashOut={setCashOut}

      cashFlowInAmount={cashFlowInAmount} setCashFlowInAmount={setCashFlowInAmount}
      cashFlowOutAmount={cashFlowOutAmount} setCashFlowOutAmount={setCashFlowOutAmount}
      cashFlowDate={cashFlowDate} setCashFlowDate={setCashFlowDate}
      cashFlowBudget={cashFlowBudget} setCashFlowBudget={setCashFlowBudget}
      cashFlowNote={cashFlowNote} setCashFlowNote={setCashFlowNote}

      transactionList={transactionList} setTransactionList={setTransactionList}
      sortByDate={sortByDate}

    />
  </>
}

export default App;
