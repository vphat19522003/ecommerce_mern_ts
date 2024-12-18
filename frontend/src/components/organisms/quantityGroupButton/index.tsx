import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Add, Remove } from '@mui/icons-material';
import { ButtonGroup } from '@mui/material';

import { useUpdateCartQuantity } from '@app/api/hooks/cart.hook';
import ButtonForm from '@app/components/atoms/button';
import NumberField from '@app/components/atoms/numberFormatCustom';
import { setCart } from '@app/redux/cartSlice';
import { IErrorResponse } from '@app/types/common';

type QuantityGroupButtonProps = {
  productId: string;
  quantity: number;
};
const QuantityGroupButton = ({ productId, quantity }: QuantityGroupButtonProps): JSX.Element => {
  const { mutate: updateCartQuantity, isPending } = useUpdateCartQuantity();
  const dispatch = useDispatch();

  const handleDecreaseQuantity = () => {
    if (!productId) return;

    if (quantity <= 1) return;

    const toastID = toast.loading('Please wait...');
    updateCartQuantity(
      { productId, quantity: -1 },
      {
        onSuccess: (data) => {
          dispatch(setCart({ cart: data.result.cartInfo, totalQuantity: data.result.totalQuantity }));
          toast.update(toastID, {
            render: 'Update quantity successfully',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
            closeButton: true
          });
        },
        onError: (err: IErrorResponse) => {
          toast.update(toastID, {
            render: err.response.data.message as string,
            type: 'error',
            isLoading: false,
            autoClose: 3000,
            closeButton: true
          });
        }
      }
    );
  };
  const handleIncreaseQuantity = () => {
    if (!productId) return;

    const toastID = toast.loading('Please wait...');
    updateCartQuantity(
      { productId, quantity: 1 },
      {
        onSuccess: (data) => {
          dispatch(setCart({ cart: data.result.cartInfo, totalQuantity: data.result.totalQuantity }));
          toast.update(toastID, {
            render: 'Update quantity successfully',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
            closeButton: true
          });
        },
        onError: (err: IErrorResponse) => {
          toast.update(toastID, {
            render: err.response.data.message as string,
            type: 'error',
            isLoading: false,
            autoClose: 3000,
            closeButton: true
          });
        }
      }
    );
  };

  const handleChangeCartQuantity = (value: string) => {
    const parseValue = Number(value.split(',').join(''));

    if (quantity === parseValue) return;

    const calcValue = quantity > parseValue ? -(quantity - parseValue) : parseValue - quantity;

    if (parseValue <= 0) return;

    const toastID = toast.loading('Please wait...');
    updateCartQuantity(
      { productId, quantity: calcValue },
      {
        onSuccess: (data) => {
          dispatch(setCart({ cart: data.result.cartInfo, totalQuantity: data.result.totalQuantity }));
          toast.update(toastID, {
            render: 'Update quantity successfully',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
            closeButton: true
          });
        },
        onError: (err: IErrorResponse) => {
          toast.update(toastID, {
            render: err.response.data.message as string,
            type: 'error',
            isLoading: false,
            autoClose: 3000,
            closeButton: true
          });
        }
      }
    );
  };
  return (
    <ButtonGroup variant='outlined' sx={{ height: '40px' }}>
      <ButtonForm
        className='border-[1px] border-solid border-slate-200'
        sx={{ width: '40px', minWidth: '40px', height: '42px', padding: '0' }}
        onClick={handleDecreaseQuantity}
        disabled={isPending}>
        <Remove className='text-lg' />
      </ButtonForm>
      <NumberField
        decimalScale={0}
        variant='outlined'
        value={quantity || 1}
        className='w-[58px] mr-1 ml-[2px]'
        backgroundColor='white'
        onBlur={(e) => handleChangeCartQuantity(e.target.value)}
        readOnly={isPending}
      />
      <ButtonForm
        className='border-[1px] border-solid border-slate-200'
        sx={{ width: '40px', minWidth: '40px', height: '42px', padding: '0' }}
        onClick={handleIncreaseQuantity}
        disabled={isPending}>
        <Add className='text-lg' />
      </ButtonForm>
    </ButtonGroup>
  );
};

export default QuantityGroupButton;
