import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Checkbox, Divider, FormControlLabel, Rating, Stack, Typography } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';
import AmountRange from '@app/components/organisms/amountRange';
import { listFilter } from '@app/components/organisms/filterCombobox';
import { CustomCategoryResponseType } from '@app/types/category';

type ProductFilterFormProps = {
  listSubCategory: CustomCategoryResponseType[];
};

const ProductFilterForm = ({ listSubCategory }: ProductFilterFormProps): JSX.Element => {
  const [filters, setFilters] = useState(listFilter);
  const path = location.pathname.split('/').filter((x) => x && x !== 'category');
  return (
    <form
      style={{
        position: 'relative'
      }}>
      {/* Danh mục sản phẩm*/}
      <Stack
        style={{
          paddingBottom: '12px'
        }}>
        <Typography
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '8px'
          }}>
          Danh mục sản phẩm
        </Typography>
        {listSubCategory.map((category, index) => (
          <Link
            to={
              path[0] === 'all'
                ? `/category/${category.name.toLowerCase().replace(/\s+/g, '')}`
                : `/category/${path[0]}/${category.name.toLowerCase().replace(/\s+/g, '')}`
            }
            key={index}
            style={{
              color: 'black',
              textDecoration: 'none',
              cursor: 'pointer',
              paddingTop: '6px',
              paddingBottom: '6px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#2563EB';
              e.currentTarget.style.textDecoration = 'underline';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'black';
              e.currentTarget.style.textDecoration = 'none';
            }}>
            <Typography fontSize={'14px'}>{category.name}</Typography>
          </Link>
        ))}
      </Stack>
      <Divider />
      {/* Sắp xếp */}
      <Stack
        style={{
          paddingTop: '12px',
          paddingBottom: '12px'
        }}>
        <Typography
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '8px'
          }}>
          Sắp xếp
        </Typography>
        {filters.map((filter, index) => (
          <Stack
            key={index}
            style={{
              color: 'black',

              cursor: 'pointer',
              paddingTop: '4px',
              paddingBottom: '4px'
            }}>
            <FormControlLabel
              control={<Checkbox checked={false} />}
              label={
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Typography fontSize={'14px'}>{filter.name}</Typography>
                </Stack>
              }
            />
          </Stack>
        ))}
      </Stack>
      <Divider />
      {/* Lọc theo đánh giá */}
      <Stack
        style={{
          paddingTop: '12px',
          paddingBottom: '12px'
        }}>
        <Typography
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '8px'
          }}>
          Lọc theo đánh giá
        </Typography>
        <Stack direction='row'>
          <FormControlLabel
            control={<Checkbox checked={false} />}
            label={
              <Stack direction={'row'} alignItems={'center'} spacing={2}>
                <Rating name='rating' defaultValue={5} precision={0.5} size='small' readOnly />
                <Typography fontSize={'13px'}>5 sao</Typography>
              </Stack>
            }
          />
          <FormControlLabel
            control={<Checkbox checked={false} />}
            label={
              <Stack direction={'row'} alignItems={'center'} spacing={2}>
                <Rating name='rating' defaultValue={4} precision={0.5} size='small' readOnly />
                <Typography fontSize={'13px'}>4 sao</Typography>
              </Stack>
            }
          />
        </Stack>
        <FormControlLabel
          control={<Checkbox checked={false} />}
          label={
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
              <Rating name='rating' defaultValue={3} precision={0.5} size='small' readOnly />
              <Typography fontSize={'13px'}>từ 3 sao</Typography>
            </Stack>
          }
        />
      </Stack>
      <Divider />
      {/* Lọc theo giá */}
      <Stack
        style={{
          paddingTop: '12px',
          paddingBottom: '12px'
        }}>
        <Typography
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '8px'
          }}>
          Lọc theo giá
        </Typography>
        <FormControlLabel
          control={<Checkbox checked={false} />}
          label={
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
              <Typography fontSize={'13px'}>Dưới 100.000 VND</Typography>
            </Stack>
          }
        />
        <FormControlLabel
          control={<Checkbox checked={false} />}
          label={
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
              <Typography fontSize={'13px'}>Dưới 500.000 VND</Typography>
            </Stack>
          }
        />
        <FormControlLabel
          control={<Checkbox checked={false} />}
          label={
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
              <Typography fontSize={'13px'}>1.000.000 VND - 2.000.000 VND</Typography>
            </Stack>
          }
        />
        <FormControlLabel
          control={<Checkbox checked={false} />}
          label={
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
              <Typography fontSize={'13px'}>2.000.000 VND - 5.000.000 VND</Typography>
            </Stack>
          }
        />
        <FormControlLabel
          control={<Checkbox checked={false} />}
          label={
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
              <Typography fontSize={'13px'}>Trên 5.000.000 VND</Typography>
            </Stack>
          }
        />
        <AmountRange />
      </Stack>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        style={{
          position: 'sticky',
          bottom: '-20px',
          background: 'white',
          paddingBottom: '6px'
        }}>
        <ButtonForm variant='outlined'>Reset</ButtonForm>
        <ButtonForm variant='contained'>Apply</ButtonForm>
      </Stack>
    </form>
  );
};

export default ProductFilterForm;
