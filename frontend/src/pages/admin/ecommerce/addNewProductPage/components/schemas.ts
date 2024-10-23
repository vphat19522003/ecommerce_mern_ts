import * as zod from 'zod';

import { errorMessages } from '@app/constants/errorMessages';

const imageSchema = zod.string().url().optional();

export const AddNewProductFormSchema = zod
  .object({
    productName: zod.string().min(1, errorMessages.require).min(3, errorMessages.productNameMinLength),
    productPrice: zod
      .number({ invalid_type_error: 'Price must be a number' })
      .positive('Price must be greater than 0')
      .max(999999999, 'Price cannot exceed 999,999,999')
      .refine((value) => Number(value.toFixed(2)) === value, {
        message: 'Price can only have up to 2 decimal places'
      }),
    description: zod.string().min(1, errorMessages.require).min(5, errorMessages.descriptionMinLength),
    stockQuantity: zod.number().positive('Stock quantity must be greater than 0'),
    productThumbImg: imageSchema.refine((value) => value && value.length > 0, {
      message: 'Thumbnail image is required'
    }),
    //productDescImg: zod.array(imageSchema).length(4, 'You must upload exactly 4 description images'),
    category: zod.string().trim().min(1, { message: errorMessages.require }),
    //Book product
    author: zod.string().optional(),
    page_number: zod.number().optional(),
    publisher: zod.string().optional()
  })
  .superRefine((data, ctx) => {
    if (data.category === '6715f3fbd23d0f401f16f020') {
      // Kiểm tra trường `author`
      if (!data.author || data.author.trim() === '') {
        ctx.addIssue({
          code: 'custom',
          path: ['author'],
          message: errorMessages.require
        });
      }

      // Kiểm tra trường `page_number`
      if (data.page_number === undefined) {
        ctx.addIssue({ code: 'custom', path: ['page_number'], message: errorMessages.require });
      } else {
        // Kiểm tra nếu `page_number` phải lớn hơn 5 và là số dương
        if (data.page_number <= 0) {
          ctx.addIssue({ code: 'custom', path: ['page_number'], message: 'Price must be greater than 0' });
        } else if (data.page_number <= 5) {
          ctx.addIssue({ code: 'custom', path: ['page_number'], message: 'Page number must be greater than 5' });
        }
      }

      // Kiểm tra trường `publisher`
      if (!data.publisher || data.publisher.trim() === '') {
        ctx.addIssue({ code: 'custom', path: ['publisher'], message: errorMessages.require });
      }
    }
  });

export type AddNewProductFormType = zod.infer<typeof AddNewProductFormSchema>;
