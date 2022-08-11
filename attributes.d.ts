import Model from '@ember-data/model';
import EmberArray from '@ember/array';
import ComputedProperty from '@ember/object/computed';
import FragmentRegistry from 'ember-data-model-fragments/types/registries/fragment';
import FragmentAttributesRegistry from 'ember-data-model-fragments/types/registries/fragment-attributes';
// eslint-disable-next-line ember/use-ember-data-rfc-395-imports
import TransformRegistry from 'ember-data/types/registries/transform';

interface FragmentArray<T extends keyof FragmentRegistry> extends EmberArray<T> {
  addFragment(fragment: FragmentRegistry[T]): FragmentRegistry[T];
  removeFragment(fragment: FragmentRegistry[T]): FragmentRegistry[T];
  createFragment(attributes: FragmentAttributesRegistry[T]): FragmentRegistry[T];
}

interface FragmentOptions<T extends keyof FragmentRegistry> {
  polymorphic?: boolean;
  typeKey?: string | ((data: FragmentAttributesRegistry[T], owner: Model) => string);
  defaultValue?: () => FragmentAttributesRegistry[T] | FragmentAttributesRegistry[T];
}

type TransformType<T extends keyof TransformRegistry> = ReturnType<
  TransformRegistry[T]['deserialize']
>;

export function fragment<T extends keyof FragmentRegistry>(
  type: T,
  options?: FragmentOptions<T>,
): ComputedProperty<FragmentRegistry[T]>;
export function fragmentArray<T extends keyof FragmentRegistry>(
  type: T,
  options?: FragmentOptions<T>,
): ComputedProperty<FragmentArray<T>>;
export function array<T extends keyof TransformRegistry>(): ComputedProperty<TransformRegistry[T]>;

export function fragmentOwner(): ComputedProperty<Model>;
