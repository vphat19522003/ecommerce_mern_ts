import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Stack } from '@mui/material';

import { useGetProductByFilter } from '@app/api/hooks/product.hook';
import BannerCategory from '@app/assets/banner_category.png';
import BreadCrumb from '@app/components/organisms/breadcrumb';
import { useDevice } from '@app/hooks/useDevice';
import { initialFilterStateType, setFilter, setFilterPrice } from '@app/redux/filterSlice';
import { paths } from '@app/routes/paths';
import { RootState } from '@app/store';
import { CustomCategoryResponseType } from '@app/types/category';

import { getProductTypeCustom } from '../admin/ecommerce/addNewProductPage/components/schemas';
import CategoryFilterNavigator from './components/CategoryFilterNavigator';
import ProductCategoryBanner from './components/ProductCategoryBanner';
import ProductCategoryList from './components/ProductCategoryList';
import ProductCategoryTitle from './components/ProductCategoryTitle';
import ProductFilterSection from './components/ProductFilterSection';

const ProductCategoryPage = (): JSX.Element => {
  const [listProduct, setListProduct] = useState<getProductTypeCustom[]>([]);
  const [listSubCategory, setListSubCategory] = useState<CustomCategoryResponseType[]>([]);

  const { isMobile } = useDevice();
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filter);

  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split('/').filter((x) => x && x !== 'category');

  const { mutate: getProductByFilter } = useGetProductByFilter();
  const categoryList = useSelector((state: RootState) => state.category.mainCategory);

  const parseQueryParams = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return {
      minPrice: parseInt(searchParams.get('minPrice') || '0', 10),
      maxPrice: parseInt(searchParams.get('maxPrice') || '0', 10),
      sort: parseInt(searchParams.get('sort') || '5', 10),
      rating: parseInt(searchParams.get('rating') || '0', 10)
    };
  }, [location.search]);

  const { mainCategoryId, subCategoryId, subCategoryList } = useMemo(() => {
    const mainCategory = categoryList.find((category) => category.name.toLowerCase().replace(/\s+/g, '') === path[0]);

    const subCategoryList = mainCategory?.child || [];
    const mainCategoryId = mainCategory?._id || null;
    const subCategoryId =
      subCategoryList.find((category) => category.name.toLowerCase().replace(/\s+/g, '') === path[1])?._id || null;

    return { mainCategoryId, subCategoryId, subCategoryList };
  }, [path, categoryList]);

  useEffect(() => {
    const mainCategory = categoryList.find((category) => category.name.toLowerCase().replace(/\s+/g, '') === path[0]);

    if (!mainCategory && path[0] !== 'all') {
      navigate('/category/all', { replace: true });
      return;
    }

    if (path[1] && mainCategory) {
      const subCategory = mainCategory.child?.find((sub) => sub.name.toLowerCase().replace(/\s+/g, '') === path[1]);

      if (!subCategory) {
        navigate(paths.pageNotFound, { replace: true });
        return;
      }
    }

    if (path[0] !== 'all' && mainCategoryId) {
      setListSubCategory(subCategoryList);
    } else if (path[0] === 'all' && !path[1]) {
      setListSubCategory(categoryList);
    } else if (path[0] === 'all' && path[1]) {
      navigate(paths.pageNotFound, { replace: true });
    }
  }, [path[0], path[1], categoryList]);

  useEffect(() => {
    dispatch(
      setFilter({
        mainCategory: mainCategoryId || '',
        subCategory: subCategoryId || '',
        ...parseQueryParams
      })
    );

    getProductByFilter(
      {
        mainCategory: mainCategoryId || '',
        subCategory: subCategoryId || '',
        page: 1,
        pageSize: 8,
        ...parseQueryParams
      },
      {
        onSuccess: (data) => {
          setListProduct(data.result);
        }
      }
    );
  }, [parseQueryParams, location.pathname]);

  const handleChangeFilterPrice = (minPrice: number, maxPrice: number) => {
    const isChecked = filter.minPrice === minPrice && filter.maxPrice === maxPrice;

    if (isChecked) {
      dispatch(setFilterPrice({ minPrice: 0, maxPrice: 0 }));

      const searchParams = new URLSearchParams(location.search);
      searchParams.delete('minPrice');
      searchParams.delete('maxPrice');
      navigate(`${location.pathname}?${searchParams.toString()}`);
    } else {
      dispatch(setFilterPrice({ minPrice, maxPrice }));

      const searchParams = new URLSearchParams(location.search);
      searchParams.set('minPrice', minPrice.toString());
      searchParams.set('maxPrice', maxPrice.toString());
      navigate(`${location.pathname}?${searchParams.toString()}`);
    }
  };

  const handleFilterChange = (filterData: initialFilterStateType) => {
    const { sort, maxPrice, minPrice, rating } = filterData;

    dispatch(setFilter(filterData));

    const searchParams = new URLSearchParams(location.search);

    if (sort) searchParams.set('sort', sort.toString());

    if (minPrice) searchParams.set('minPrice', minPrice.toString());

    if (maxPrice) searchParams.set('maxPrice', maxPrice.toString());

    if (rating) searchParams.set('rating', rating.toString());

    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <Stack>
      <BreadCrumb mainCategory={path[0]} subCategories={path.slice(1)} isCategory />
      <Stack direction={isMobile ? 'column' : 'row'} className='mb-4' spacing={4}>
        {/* Category Navigator */}
        {!isMobile && (
          <CategoryFilterNavigator
            subCategoryList={listSubCategory}
            mainPath={path[0]}
            handleChangeFilterPrice={handleChangeFilterPrice}
          />
        )}

        {/* Banner Category - Product List */}
        <Stack direction={'column'} className={`${isMobile ? 'w-full' : 'w-9/12'} max-h-max`} spacing={4}>
          {/* Category Title */}
          <ProductCategoryTitle title={path[path.length - 1]} />

          {/* Banner */}
          <ProductCategoryBanner banner_category={BannerCategory} />

          {/* Filter */}
          <ProductFilterSection listSubCategory={listSubCategory} handleFilterChange={handleFilterChange} />

          {/* Product List */}
          <ProductCategoryList listProduct={listProduct} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProductCategoryPage;
