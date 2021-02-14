import { useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const PAYPAL_BUTTON_ID = 'paypal-button-container';

const PaypalButton = ({ amount, orderId }) => {
  const { doRequest } = useRequest({
    url: '/api/payments/capture',
    method: 'post',
    onSuccess: () => Router.push('/orders'),
  });

  useEffect(() => {
    const createOrder = (data, actions) =>
      actions.order.create({
        purchase_units: [{ amount: { value: amount } }],
      });

    const onApprove = async (data, actions) => {
      const details = await actions.order.capture();
      doRequest({ token: { id: details.id }, orderId });
    };

    paypal
      .Buttons({
        createOrder,
        onApprove,
      })
      .render(`#${PAYPAL_BUTTON_ID}`);
  }, []);

  return <div id={PAYPAL_BUTTON_ID} />;
};

export default PaypalButton;
