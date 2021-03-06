import React, { useState, useEffect } from "react";
import { Form, FormControl, Button, Breadcrumb, Badge } from "react-bootstrap";
import api from "../../../../services/Api";

interface TableData {
  id: number;
  id_customers: number;
  id_payment_methods: number;
  status: "Completed" | "On hold" | "Pending payment" | "Processing";
  amount: string;
  created_at: string;
  Products: {
    id: number;
    name: string;
    price: string;
    description: string;
    status: boolean;
    Images: {
      image: string;
      small: string;
      id: number;
      id_product: number;
      aspect_ratio: string;
    }[];
    orders_products: {
      quantity: number;
    };
  }[];
  OrdersAddresse: {
    id: number;
    street_address: string;
    city: string;
    zip: string;
    country: string;
    state: string;
  };
  Customers: {
    id: number;
    User: {
      id: number;
      first_name: string;
      last_name: string;
      email_address: string;
    };
  };
}

type statusType =
  | "Completed"
  | "On hold"
  | "Pending payment"
  | "Processing"
  | "All";

interface alertValues {
  variant:
    | "danger"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "info"
    | "dark"
    | "light"
    | undefined;
  message: string;
}

interface Props {
  orders: TableData[];
  setOrders: React.Dispatch<React.SetStateAction<TableData[]>>;
  setShowFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  setFeedbackData: React.Dispatch<React.SetStateAction<alertValues>>;
}

const ToolsBar: React.FC<Props> = ({
  setOrders,
  setFeedbackData,
  setShowFeedback,
  orders
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const [completedCount, setCompletedCount] = useState<number>(0);
  const [pendingPaymentCount, setPendingPaymentCount] = useState<number>(0);
  const [onHoldCount, setOnHoldCount] = useState<number>(0);
  const [processingCount, setProcessingCount] = useState<number>(0);
  const [allOrdersCount, setAllOrdersCount] = useState<number>(0);

  useEffect(() => {
    async function loadOrders() {
      try {
        const { data } = await api.get(`/api/orders/index`);
        setAllOrdersCount(data.count);

        const completed = await api.get(`/api/orders/status/Completed`);
        setCompletedCount(completed.data.count);

        const Onhold = await api.get(`/api/orders/status/On hold`);
        setOnHoldCount(Onhold.data.count);

        const payment = await api.get(`/api/orders/status/Pending payment`);
        setPendingPaymentCount(payment.data.count);

        const processing = await api.get(`/api/orders/status/Processing`);
        setProcessingCount(processing.data.count);
      } catch (err) {
        console.log(err);
      }
    }
    loadOrders();
  }, [orders]);

  const handleChangeStatus = async (status: statusType) => {
    if (status === "All") {
      try {
        const { data } = await api.get("/api/orders/index");
        if (data) {
          setOrders(data.rows);
        }
      } catch (err) {}
    } else {
      const { data } = await api.get(`/api/orders/status/${status}`);
      setOrders(data.rows);
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!!parseInt(inputValue)) {
      try {
        const { data } = await api.get(`/api/orders/${inputValue}/show`);
        if (data) {
          const orderArr = [data];
          setOrders(orderArr);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <nav className="navbar navbar-light bg-light ">
      <Form inline onSubmit={handleSubmit}>
        <FormControl
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          value={inputValue}
          type="text"
          placeholder="id..."
          className=" mr-sm-2"
        />
        <Button type="submit">Search orders</Button>
      </Form>
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => handleChangeStatus("All")}>
          All <Badge variant="info">{allOrdersCount}</Badge>
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => handleChangeStatus("On hold")}>
          On hold <Badge variant="info">{onHoldCount}</Badge>
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => handleChangeStatus("Pending payment")}>
          Pending payment <Badge variant="info">{pendingPaymentCount}</Badge>
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => handleChangeStatus("Processing")}>
          Processing <Badge variant="info">{processingCount}</Badge>
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => handleChangeStatus("Completed")}>
          Completed <Badge variant="info">{completedCount}</Badge>
        </Breadcrumb.Item>
      </Breadcrumb>
    </nav>
  );
};

export default ToolsBar;
