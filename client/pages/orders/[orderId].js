import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';

import PaypalButton from '../../components/paypalButton/paypalButton';
import useRequest from '../../hooks/use-request';

// currentUser comes from the app component
// but, seems mystical
const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push('/orders'),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => clearInterval(timerId);
  }, []);

  if (timeLeft < 0) {
    return <div>Order expired</div>;
  }

  return (
    <div>
      <h1>Order show</h1>
      <div>Time left to pay: {timeLeft} seconds</div>
      <StripeCheckout
        // A bit strange how doRequest mereges body props
        token={({ id }) => doRequest({ token: id })}
        // TODO: create env variable.
        stripeKey="pk_test_xxK8JDWxlJOTc67f2vKD9ZQ2"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      <PaypalButton amount={order.ticket.price} orderId={order.id} />
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
