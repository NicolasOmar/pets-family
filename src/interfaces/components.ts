export type ChildrenType = string | React.ReactElement | React.ReactElement[]

export interface ElementProps {
  /** `Attribute` ID used to locate the element in unit test suites (like Jest) */
  testId?: string
  /** `Attribute` Custom CSS classes, applicable for specific scenarios */
  cssClasses?: string
  /** `Styling` Custom styling applicable for specific scenarios */
  style?: object
}

export interface ContainerProps {
  /** `Attribute` *For container case*. ID used to locate the element in unit test suites (like Jest) */
  containerTestId: string
  /** `Attribute` *For container case*. Custom CSS classes, applicable for specific scenarios */
  containerCssClasses: string
  /** `Styling` *For container case*. Custom styling applicable for specific scenarios */
  containerStyle: object
}

export interface ComplexElementProps extends ElementProps, ContainerProps {}

export interface ClickeableProps {
  /** `Function` Sends a click signal to its parent component when user clicks on the select */
  onClick: () => void
}

export interface CustomFormInputProps<Props> {
  [name: string]: Props
}
