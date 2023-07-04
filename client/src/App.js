import React, { Suspense } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Protected from "./auth/ProtectedRoute";
import Unprotected from "./auth/UnprotectedRoute";
import Loading from "./components/Loading";

const DashHome = React.lazy(() => import("./admin/pages/DashHome.jsx"));
const DashUser = React.lazy(() => import("./admin/pages/DashUser.jsx"));
const Error = React.lazy(() => import("./pages/Unprotected/Error"));
const Signup = React.lazy(() => import("./pages/Protected/Signup"));
const Login = React.lazy(() => import("./pages/Protected/Login"));
const Home = React.lazy(() => import("./pages/Unprotected/Home"));
const Blocked = React.lazy(() => import("./pages/Protected/Blocked"));
const OrderDetail = React.lazy(() => import("./pages/Protected/OrderDetail"));
const BillingDetail = React.lazy(() =>
  import("./pages/Protected/BillingDetail")
);
const Cart = React.lazy(() => import("./pages/Protected/Cart"));
const Transaction = React.lazy(() => import("./pages/Protected/Transaction"));
const AdminPanal = React.lazy(() => import("./admin/pages/AdminPanal.jsx"));

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/signup"
              element={
                <Unprotected>
                  <Signup />
                </Unprotected>
              }
            />
            <Route
              path="/login"
              element={
                <Unprotected>
                  <Login />
                </Unprotected>
              }
            />
            <Route
              path="/blocked"
              element={
                <Protected>
                  <Blocked />
                </Protected>
              }
            />
            <Route
              path="/order"
              element={
                <Protected>
                  <OrderDetail />
                </Protected>
              }
            />
            <Route
              path="/billing"
              element={
                <Protected>
                  <BillingDetail />
                </Protected>
              }
            />
            <Route
              path="/cart"
              element={
                <Protected>
                  <Cart />
                </Protected>
              }
            />
            <Route
              path="/transaction"
              element={
                <Protected>
                  <Transaction />
                </Protected>
              }
            />

            {/* Admin */}
            <Route
              path="/admin"
              element={
                <Protected>
                  <AdminPanal />
                </Protected>
              }
            >
              <Route
                path=""
                element={
                  <Protected>
                    <DashHome />
                  </Protected>
                }
              />
              <Route
                path="user"
                element={
                  <Protected>
                    <DashUser />
                  </Protected>
                }
              />
            </Route>

            {/* Admin */}

            <Route path="/*" element={<Error />} />
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
