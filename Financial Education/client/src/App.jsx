import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import BlogHome from "./pages/BlogHome";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";
import Party from "./pages/Party";
import TaskPages from "./pages/TaskPages";
import Monetary from "./pages/Monetary";
import FriendsPage from "./pages/FriendsPage";
import Redirect from "./Redirect";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StaggeredDropDown from "./components/ChatBot";
import {
  Budgeting,
  BudgetingQAndA,
  Investing,
  InvestingQAndA,
  Financing,
  FinancingQAndA,
} from "./pages/Learning";
import "./App.css";
import Stock from "./pages/Stock";
import Savings from "./pages/Savings";
import Learning from "./pages/Learning";
import LeaderBoard from "./pages/FriendsPage";
import StockGame from "./pages/stockgame";
import Banking from "./components/lesson3";
import BankingQAndA from "./components/QandA/Banking";
import Introduction from "./pages/banking/Introduction";
import Accounts from "./pages/banking/Accounts";
import Usage from "./pages/banking/Usage";
import Digital from "./pages/banking/Digital";
import Loans from "./pages/banking/Loans";
import Interest from "./pages/banking/Interest";
import Safety from "./pages/banking/Safety";
import Economy from "./pages/banking/Economy";
import Practice from "./pages/banking/Practice";
import BudgetGame from "./pages/BudgetGame";
import Games from "./pages/Games";

function App() {
  const token = localStorage.getItem("token");

  const isNavBarOpen = useSelector((state) => state.ui.isNavBarOpen);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <ToastContainer
            position="top-center"
            autoClose={1500}
            limit={2}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="dark"
          />
          {token && <NavBar />}
          {!isNavBarOpen && (
            <>
              <Outlet />
              {token && (
                <div className="fixed bottom-12 right-36">
                  <StaggeredDropDown />
                </div>
              )}
              {token && <Footer />}
            </>
          )}
        </>
      ),
      children: [
        {
          path: "/",
          element: <Redirect />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/learning",
          element: <Learning />,
        },
        {
          path: "/blog",
          element: <BlogHome />,
        },
        {
          path: "/blog/:id",
          element: <Blog />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/party",
          element: <Party />,
        },
        {
          path: "/stock",
          element: <StockGame/>,
        },
        {
          path: "/savings",
          element: <Savings />,
        },
        {
          path: "/tasks",
          element: <TaskPages />,
        },
        {
          path: "/leaderboard",
          element: <LeaderBoard />,
        },
        {
          path: "/monetary",
          element: <Monetary />,
        },
        {
          path: "/budgeting",
          element: <Budgeting />,
        },
        {
          path: "/budgeting/qanda",
          element: <BudgetingQAndA />,
        },
        {
          path: "/investing",
          element: <Investing />,
        },
        {
          path: "/investing/qanda",
          element: <InvestingQAndA />,
        },
        {
          path: "/financing",
          element: <Financing />,
        },
        {
          path: "financing/qanda",
          element: <FinancingQAndA />,
        },
        {
          path: "/banking",
          element: <Banking />,
        },
        {
          path: "/banking/qanda",
          element: <BankingQAndA />,
        },
        {
          path: "/banking/introduction",
          element: <Introduction />,
        },
        {
          path: "/banking/accounts",
          element: <Accounts />,
        },
        {
          path: "/banking/usage",
          element: <Usage />,
        },
        {
          path: "/banking/digital",
          element: <Digital />,
        },
        {
          path: "/banking/loans",
          element: <Loans />,
        },
        {
          path: "/banking/interest",
          element: <Interest />,
        },
        {
          path: "/banking/safety",
          element: <Safety />,
        },
        {
          path: "/banking/economy",
          element: <Economy />,
        },
        {
          path: "/banking/practice",
          element: <Practice />,
        },
        {
          path: "/budget-game",
          element: <BudgetGame />,
        },
        {
          path: "/games",
          element: <Games />,
        },
      ],
    },
  ]);

  return (
    <AnimatePresence>
      <div className="h-full w-full bg-[#E6E6FA]">
        <RouterProvider router={router} />
      </div>
    </AnimatePresence>
  );
}

export default App;
