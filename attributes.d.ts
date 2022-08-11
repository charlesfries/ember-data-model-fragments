import Model from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';
import EmberArray from '@ember/array';
import ComputedProperty from '@ember/object/computed';
import FragmentRegistry from 'ember-data-model-fragments/types/registries/fragment';
import FragmentAttributesRegistry from 'ember-data-model-fragments/types/registries/fragment-attributes';
// eslint-disable-next-line ember/use-ember-data-rfc-395-imports
import TransformRegistry from 'ember-data/types/registries/transform';

interface FragmentArray<T extends Fragment> extends EmberArray<T> {
  addFragment(fragment: T): T;
  removeFragment(fragment: T): T;
  createFragment(attributes?: Record<string, unknown>): T;
}

interface FragmentOptions<T extends string | number> {
  polymorphic?: boolean;
  typeKey?: string | ((data: FragmentAttributesRegistry[T], owner: Model) => string);
  defaultValue?: () => FragmentAttributesRegistry[T] | FragmentAttributesRegistry[T];
}

type TransformType<FragmentType extends keyof TransformRegistry> = ReturnType<
  TransformRegistry[FragmentType]['deserialize']
>;

export function fragment<K extends keyof FragmentRegistry>(
  type: K,
  options?: FragmentOptions<string | number>,
): ComputedProperty<FragmentRegistry[K]>;
export function fragmentArray<K extends keyof FragmentRegistry>(
  type: K,
  options?: FragmentOptions<string | number>,
): ComputedProperty<FragmentArray<FragmentRegistry[K]>>;
export function array<K extends keyof TransformRegistry>(): ComputedProperty<TransformRegistry[K]>;

export function fragmentOwner(): ComputedProperty<Model>;
