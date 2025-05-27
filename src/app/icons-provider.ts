import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};

export const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

export function provideNzIcons() {
  return {
    provide: 'NZ_ICONS',
    useValue: icons
  };
} 