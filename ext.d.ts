import FragmentRegistry from 'ember-data-model-fragments/types/registries/fragment';	
import FragmentAttributesRegistry from 'ember-data-model-fragments/types/registries/fragment-attributes';
import EmberStore from '@ember-data/store';

export class Store extends EmberStore {
  createFragment<T extends keyof FragmentRegistry>(	
    type: T,	
    attributes: FragmentAttributesRegistry[T],	
  ): FragmentRegistry[T];
}
