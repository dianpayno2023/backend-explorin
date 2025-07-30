import { LocalAddressesEntity, ShippingAddressesEntity } from './addresses';
import {
  CountriesEntity,
  ProvincesEntity,
  RegenciesEntity,
  RegionsEntity,
} from './locations';
import { MenusEntity } from './menus';
import { RoleAccessEntity, RolesEntity } from './roles';
import { UserProfilesEntity, UsersEntity } from './users';

export const ENTITIES = [
  UsersEntity,
  RolesEntity,
  RoleAccessEntity,
  MenusEntity,
  LocalAddressesEntity,
  CountriesEntity,
  ProvincesEntity,
  ShippingAddressesEntity,
  RegenciesEntity,
  UserProfilesEntity,
  RegionsEntity,
];
