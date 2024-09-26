import { DropdownDataType } from '@app/types/common';
import { locationResponseType } from '@app/types/user';

export const mapLocationData = (arrLocation: locationResponseType[]): Omit<DropdownDataType, 'name'>[] => {
  return arrLocation.map((item) => ({
    label: item.name,
    value: item.code
  }));
};
