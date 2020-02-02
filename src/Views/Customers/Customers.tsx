import React, { useEffect, useState } from "react";
import api from "../../services/Api";
import { Table, Pagination, Searchinput } from "./components";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [customersPerPage] = useState<number>(10);

  useEffect(() => {
    async function loadCustomers() {
      const { data } = await api.get("/api/customer");

      setCustomers(data);
    }
    loadCustomers();
  }, []);

  // Get current posts
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currenCustomers = customers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  //Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    data: any
  ) {
    event.preventDefault();
    const response = await api.get(`/api/customer/search?name=${data}`);

    setCustomers(response.data);
  }

  return (
    <>
      <Searchinput onSubmit={handleSubmit} />
      <Table values={currenCustomers} />
      <Pagination
        customersPerPage={customersPerPage}
        totalCustomers={customers.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
}
