import React from 'react';
import { GetSingleOrderQueryHookResult, useGetSingleOrderQuery } from '../graphql/generated';

function Dashboard() {
  const {
    loading,
    error,
    data,
  }: GetSingleOrderQueryHookResult = useGetSingleOrderQuery({ variables: { id: 'CeAmCcbx0JJ5QNWgFTDW' } });

  return (
    <>
      {error && <p>Error loading order</p>}
      {loading && <p>...Loading</p>}
      {data && data.getOrder && (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Customer</th>
            <th>Address</th>
            <th>Booking Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{data.getOrder.title}</th>
            <th>{data.getOrder.customer.name}</th>
            <th>{data.getOrder.address.country}</th>
            <th>{data.getOrder.bookingDate}</th>
          </tr>
        </tbody>
      </table>
      )}
    </>
  );
}

export default Dashboard;